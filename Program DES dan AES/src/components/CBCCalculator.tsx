"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  plaintext: string;
  key: string;
  vector: string;
};

const CBCCalculator = () => {
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [decryptResult, setDecryptResult] = useState<string>("");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let { plaintext, vector, key }: Inputs = data;

    let toString: string = "";

    let toSection: any = [];

    let j = 0;

    const vectorLength = vector.length;

    const plainTextLength = plaintext.length / 4;

    for (let i = 0; i < plainTextLength; i++) {
      j = i * 4;
      let limit = j + 4;
      for (j; j < limit; j++) {
        toString = toString + plaintext[j];
        toSection[i] = toString;
      }

      toString = "";
    }

    let p: any = [];
    let c: any = [];

    for (let i = 0; i < plainTextLength; i++) {
      if (toSection[i].length < vectorLength)
        toSection[0] = toSection[0].toString(2).padStart(vectorLength, "0");
      toSection[i] = parseInt(toSection[i], 2);
      if (i === 0) {
        p[i] = (toSection[i] ^ parseInt(vector, 2))
          .toString(2)
          .padStart(vectorLength, "0");
      } else {
        p[i] = toSection[i] ^ c[i - 1];
      }
      p[i] = p[i].toString(2).padStart(vectorLength, "0");
      p[i] = (parseInt(p[i], 2) ^ parseInt(key, 2))
        .toString(2)
        .padStart(vectorLength, "0");
      p[i] = p[i].slice(1) + p[i][0];
      p[i] = parseInt(p[i], 2);
      c[i] = p[i];
    }

    let result: any = "";
    for (let i = 0; i < plainTextLength; i++) {
      toSection[i] = c[i].toString(16).toUpperCase();
      // toSection[i] = c[i].toString(2).padStart(vectorLength, '0')
      result += toSection[i];
    }

    setDecryptResult(result);
  };

  const plaintextValidation = () => {
    return (
      getValues("plaintext").length % 4 === 0 ||
      "The length must be a multiple of 4"
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Textarea
            variant="bordered"
            label="Plain text"
            labelPlacement="inside"
            placeholder="Enter plain text"
            className="col-span-12 mb-6 md:col-span-6 md:mb-0"
            {...register("plaintext", {
              required: true,
              validate: plaintextValidation,
            })}
            errorMessage={
              errors.plaintext?.message
                ? errors.plaintext.message
                : "Plain text field is required"
            }
            isInvalid={errors.plaintext ? true : false}
          />
          <Input
            type="text"
            variant="bordered"
            label="IV"
            {...register("vector", {
              required: true,
              minLength: { value: 4, message: "The minimum value is 4 bit" },
            })}
            errorMessage={
              errors.vector?.message
                ? errors.vector.message
                : "IV field is required"
            }
            isInvalid={errors.vector ? true : false}
          />
          <Input
            type="text"
            variant="bordered"
            label="Key"
            {...register("key", {
              required: true,
              minLength: { value: 4, message: "The minimum value is 4 bit" },
              validate: (val: string) => {
                if (watch("vector").length != val.length) {
                  return "IV and Key length didn't match";
                }
              },
            })}
            errorMessage={
              errors.key?.message ? errors.key.message : "Key field is required"
            }
            isInvalid={errors.key ? true : false}
          />
          <Textarea
            variant="flat"
            label="Result"
            labelPlacement="inside"
            readOnly
            className="col-span-12 mb-6 md:col-span-6 md:mb-0"
            value={decryptResult}
          />
        </div>
        <br />
        <Button type="submit" className="w-full" color="primary">
          Encrypt
        </Button>
      </form>
    </>
  );
};

export default CBCCalculator;
