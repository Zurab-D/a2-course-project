// import crypto = require('crypto');
import { pbkdf2Sync, randomBytes } from 'crypto';
import { CONFIG } from '../config';

// warning, takes time, about ~70ms for length=128, iterations=12000
export function createHashSlow(password, salt) {
  console.log('>>>', `hash.ts :: createHashSlow(${password}, ${salt})`);

  const result = pbkdf2Sync(
    password,
    salt,
    CONFIG.crypto.hash.iterations,
    CONFIG.crypto.hash.length,
    'SHA1'
  ).toString('base64');

  console.log('>>> hash =', result);

  return result;
};

export function createSalt() {
  console.log('>>> hash.ts :: createSalt()');

  const result = randomBytes(CONFIG.crypto.hash.length).toString('base64');

  console.log('>>> salt =', result);

  return result;
};
