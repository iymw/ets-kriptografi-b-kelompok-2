// components/ECBCalculator.tsx
"use client";

import React, { useState } from "react";

const ECBCalculator: React.FC = () => {
  const [plaintext, setPlaintext] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [result, setResult] = useState<string>("");

  // konvert heksadesimal ke biner
  const hexToBinary = (hex: string): string => {
    return parseInt(hex, 16).toString(2).padStart(4, "0");
  };

  // konvert biner ke heksadesimal
  const binaryToHex = (binary: string): string => {
    return parseInt(binary, 2).toString(16).toUpperCase();
  };

  // OPERASI XOR
  const xor = (a: string, b: string): string => {
    const length = Math.max(a.length, b.length);
    const aBin = a.padStart(length, "0");
    const bBin = b.padStart(length, "0");

    let result = "";
    for (let i = 0; i < length; i++) {
      result += aBin[i] === bBin[i] ? "0" : "1";
    }
    return result;
  };

  // ENKRIPSI ECB
  const encryptECB = () => {
    const blocks = plaintext.split("").map((char) => hexToBinary(char));
    const keyBinary = hexToBinary(key);

    const encryptedBlocks = blocks.map((block) => {
      const xorResult = xor(block, keyBinary);
      const shifted = xorResult.slice(1) + xorResult[0];
      return binaryToHex(shifted);
    });

    setResult(encryptedBlocks.join(""));
  };

  return (
    <div className="mx-auto max-w-lg rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Kalkulator ECB - Agas Ananta</h2>
      <div className="mb-4">
        <label className="mb-2 block text-gray-700">Plaintext (Hex):</label>
        <input
          type="text"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value.toUpperCase())}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-gray-700">Kunci (Hex):</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value.toUpperCase())}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      <button
        onClick={encryptECB}
        className="w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
      >
        Encrypt
      </button>
      {result && (
        <div className="mt-4 rounded-md bg-gray-100 p-4">
          <h3 className="text-lg font-semibold">Hasil:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default ECBCalculator;
