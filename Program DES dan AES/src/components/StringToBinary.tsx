"use client";

import { Button, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  string: string;
};

const StringToBinary = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [convertToBinary, setConvertToBinary] = useState<string>("");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let { string }: Inputs = data;

    let toBinary: any = [],
      toString: any = "";

    for (let i = 0; i < string.length; i++) {
      toBinary[i] = string[i].charCodeAt(0).toString(2).padStart(8, "0");
      toString = toString + toBinary[i];
    }

    setConvertToBinary(toString);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Textarea
            variant="bordered"
            label="String"
            labelPlacement="inside"
            placeholder="Enter string"
            className="col-span-12 mb-6 md:col-span-6 md:mb-0"
            {...register("string", { required: true })}
            errorMessage={
              errors.string?.message
                ? errors.string.message
                : "String field is required"
            }
            isInvalid={errors.string ? true : false}
          />
          <Textarea
            variant="flat"
            label="Result"
            labelPlacement="inside"
            readOnly
            className="col-span-12 mb-6 md:col-span-6 md:mb-0"
            value={convertToBinary}
          />
        </div>
        <br />
        <Button type="submit" className="w-full" color="primary">
          Convert
        </Button>
      </form>
    </>
  );
};

export default StringToBinary;
