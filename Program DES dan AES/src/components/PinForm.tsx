"use client";

import { useState } from 'react';
import { encryptDES, decryptDES, encryptAES, decryptAES } from '../utils/encryption';

const PinForm = () => {
  const [pin, setPin] = useState('');
  const [algorithm, setAlgorithm] = useState('DES');
  const [encryptedPin, setEncryptedPin] = useState('');
  const [decryptedPin, setDecryptedPin] = useState('');

  const handleEncrypt = () => {
    if (algorithm === 'DES') {
      setEncryptedPin(encryptDES(pin));
    } else {
      setEncryptedPin(encryptAES(pin));
    }
  };

  const handleDecrypt = () => {
    if (algorithm === 'DES') {
      setDecryptedPin(decryptDES(encryptedPin));
    } else {
      setDecryptedPin(decryptAES(encryptedPin));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Bank PIN Encryption</h1>
      <input
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter your PIN"
        className="border p-2 rounded w-full mb-4"
      />
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      >
        <option value="DES">DES</option>
        <option value="AES">AES</option>
      </select>
      <button
        onClick={handleEncrypt}
        className="bg-blue-500 text-white p-2 rounded w-full mb-4"
      >
        Encrypt
      </button>
      {encryptedPin && (
        <div className="mb-4">
          <h2 className="font-bold">Encrypted PIN:</h2>
          <p className="break-words">{encryptedPin}</p>
        </div>
      )}
      <button
        onClick={handleDecrypt}
        className="bg-green-500 text-white p-2 rounded w-full mb-4"
      >
        Decrypt
      </button>
      {decryptedPin && (
        <div>
          <h2 className="font-bold">Decrypted PIN:</h2>
          <p>{decryptedPin}</p>
        </div>
      )}
    </div>
  );
};

export default PinForm;
