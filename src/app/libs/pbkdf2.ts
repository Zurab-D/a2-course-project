import { randomBytes } from 'crypto';
import { CONFIG } from '../config';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export function createSalt() {
  console.log('>>> pbkdf2.ts :: createSalt()');

  const result = randomBytes(CONFIG.crypto.hash.length).toString('base64');

  console.log('>>> salt =', result);

  return result;
};


export function createHashSlow(password,
                               salt,
                               iterations = CONFIG.crypto.hash.iterations,
                               length = CONFIG.crypto.hash.length,
                               hash = 'SHA-1'): Observable<string> {
    console.log('>>> pbkdf2.ts :: createHashSlow()');

    let hashObserver: Observer<string>;

    const observable = new Observable((observer: Observer<string>) => {
      hashObserver = observer;
    });

    try {
      // First, create a PBKDF2 'key' containing the password
      window.crypto.subtle.importKey(
          'raw',
          stringToArrayBuffer(password),
          {'name': 'PBKDF2'},
          false,
          ['deriveKey'])
      .then(function(baseKey) {
          // Derive a key from the password
          return window.crypto.subtle.deriveKey(
              {
                  'name': 'PBKDF2',
                  'salt': stringToArrayBuffer(salt),
                  'iterations': iterations,
                  'hash': hash
              },
              baseKey,
              /* Key we want.Can be any AES algorithm ('AES-CTR', 'AES-CBC', 'AES-CMAC', 'AES-GCM',
              'AES-CFB', 'AES-KW', 'ECDH', 'DH', or 'HMAC') */
              {'name': 'AES-CBC', 'length': length},
              true,                               // Extractable
              ['encrypt', 'decrypt']              // For new key
          );
      })
      .then(function(aesKey) {
          // Export it so we can display it
          return window.crypto.subtle.exportKey('raw', aesKey);
      })
      .then(function(keyBytes) {
          // Display key in Base64 format
          const keyS = arrayBufferToString(keyBytes);
          const keyB64 = btoa (keyS);
          console.log(keyB64);

          hashObserver.next(keyB64);
      })/*.catch(function(err) {
          alert('Key derivation failed: ' + err.message);
      })*/;
    } catch (err) {
      console.log('Key derivation failed:', err.message);

      hashObserver.error('error: Key derivation failed: ' + err.message);
    }

    return observable;
}


// Utility functions
function stringToArrayBuffer(byteString){
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.codePointAt(i);
    }
    return byteArray;
}
function  arrayBufferToString(buffer){
    const byteArray = new Uint8Array(buffer);
    let byteString = '';
    for (let i = 0; i < byteArray.byteLength; i++) {
        byteString += String.fromCodePoint(byteArray[i]);
    }
    return byteString;
}
