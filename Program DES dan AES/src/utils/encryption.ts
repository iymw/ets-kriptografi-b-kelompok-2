import CryptoJS from 'crypto-js';

const DES_KEY = '12345678'; // Kunci 8 karakter untuk DES
const AES_KEY = '1234567890123456'; // Kunci 16 karakter untuk AES

// Fungsi enkripsi DES
export const encryptDES = (pin: string): string => {
  return CryptoJS.DES.encrypt(pin, DES_KEY).toString();
};

// Fungsi dekripsi DES
export const decryptDES = (encryptedPin: string): string => {
  const bytes = CryptoJS.DES.decrypt(encryptedPin, DES_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Fungsi enkripsi AES
export const encryptAES = (pin: string): string => {
  return CryptoJS.AES.encrypt(pin, AES_KEY).toString();
};

// Fungsi dekripsi AES
export const decryptAES = (encryptedPin: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedPin, AES_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
