import { insert } from '../../../lib/postgres/query.js';
export async function addPaymentTransaction(connection, orderId, amount, transactionId, transactionType, paymentAction, additionalInformation, parentTransactionId) {
    const transaction = await insert('payment_transaction').given({
        payment_transaction_order_id: orderId,
        amount,
        transaction_id: transactionId,
        transaction_type: transactionType,
        payment_action: paymentAction,
        additional_information: additionalInformation,
        parent_transaction_id: parentTransactionId
    }).execute(connection);
    return transaction;
}
