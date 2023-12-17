import crypto from 'crypto';


export function generateHMAC (key, message) {
    const hmac = crypto.createHmac('sha3-256', key);
    hmac.update(message);
    return hmac.digest('hex');
}
