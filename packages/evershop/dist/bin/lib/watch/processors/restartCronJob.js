export function restartCronJob() {
    process.emit('RESTART_CRONJOB');
}
