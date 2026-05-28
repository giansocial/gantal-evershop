const STUCK_TIMEOUT_MINUTES = 5;
/**
 * Wraps all PostgreSQL interactions for the event queue.
 * Accepts a pg Pool so it can be replaced with a mock in tests.
 */ export class EventStorage {
    pool;
    constructor(pool){
        this.pool = pool;
    }
    /**
   * Atomically claims up to `batchSize` pending events using a single CTE
   * query — no BEGIN/COMMIT/ROLLBACK needed, eliminating the pg multi-query
   * deprecation warning entirely.
   */ async claimBatch(batchSize) {
        const result = await this.pool.query(`WITH claimed AS (
         SELECT uuid FROM event
         WHERE status = 'pending'
         ORDER BY event_id ASC
         LIMIT $1
         FOR UPDATE SKIP LOCKED
       )
       UPDATE event SET status = 'processing', started_at = NOW()
       WHERE uuid IN (SELECT uuid FROM claimed)
       RETURNING *`, [
            batchSize
        ]);
        return result.rows;
    }
    /**
   * Marks an event as successfully completed and removes it from the table.
   * Updates status first so a failed DELETE doesn't leave the event as pending.
   */ async markDoneAndDelete(uuid) {
        await this.pool.query(`UPDATE event SET status = 'done', completed_at = NOW() WHERE uuid = $1`, [
            uuid
        ]);
        await this.pool.query(`DELETE FROM event WHERE uuid = $1`, [
            uuid
        ]);
    }
    /**
   * At startup: mark any events that were stuck as 'processing' during a
   * prior crash as 'failed'. At-most-once delivery — subscribers are never
   * called twice. Returns the number of events marked failed.
   */ async markStuckAsFailed() {
        const result = await this.pool.query(`UPDATE event SET status = 'failed'
       WHERE status = 'processing'
         AND started_at < NOW() - INTERVAL '${STUCK_TIMEOUT_MINUTES} minutes'`);
        return result.rowCount ?? 0;
    }
}
