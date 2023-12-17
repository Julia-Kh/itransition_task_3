import crypto from 'crypto';


export function generateRandomKey (length) {
    return crypto.randomBytes(length).toString('hex');
}
