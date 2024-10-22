"use client";
import React, { useEffect, useState } from "react";

import { Input } from "@nextui-org/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/react";

import axios from "axios";
import ThankYou from "@/components/ThankYou";

type Inputs = {
  nominal: string;
  asal: string;
  tujuan: string;
  userId: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);
  const [turnPage, setTurnpage] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/history", {
        nominal: data.nominal,
        asal: data.asal,
        tujuan: data.tujuan,
        userId: parseInt(data.userId),
      });

      console.log("Successfully transfering your money. Have a great day!");
      setTurnpage(true);
      return response;
    } catch {
      console.log("Problem transfering your money");
    } finally {
      setIsLoading(false);
    }
  };

  const [dataTransaction, setDataTransaction] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/history");
      setDataTransaction(response.data.history);
    };

    fetchData();
  }, []);

  return (
    <>
      {turnPage === true ? (
        <>
          <ThankYou />
        </>
      ) : (
        <>
          <section className="h-[100dvh] grid grid-cols-2 font-[family-name:var(--font-geist-mono)]">
            <div className="space-y-16 px-16 py-14">
              <div className="space-y-3">
                <p className="text-4xl">
                  Transfer it to <span className="line-through">us</span> your
                  best friend
                </p>
                <p>
                  Double check before you click{" "}
                  <span className="font-bold">Transfer</span>
                </p>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-10">
                  <Input
                    label="User Id"
                    labelPlacement="outside"
                    placeholder="Enter your user ID"
                    {...register("userId", { required: true })}
                    errorMessage={
                      errors.userId?.message
                        ? errors.userId.message
                        : "User Id field is required"
                    }
                    isInvalid={errors.userId ? true : false}
                  />
                  <Input
                    label="Nominal"
                    labelPlacement="outside"
                    placeholder="Please enter your amount"
                    {...register("nominal", { required: true })}
                    errorMessage={
                      errors.nominal?.message
                        ? errors.nominal.message
                        : "Nominal field is required"
                    }
                    isInvalid={errors.nominal ? true : false}
                    type="number"
                  />
                  <Input
                    label="Transfer From"
                    labelPlacement="outside"
                    placeholder="Enter your origin"
                    {...register("asal", { required: true })}
                    errorMessage={
                      errors.asal?.message
                        ? errors.asal.message
                        : "Transfer from field is required"
                    }
                    isInvalid={errors.asal ? true : false}
                  />
                  <Input
                    label="Transfer to"
                    labelPlacement="outside"
                    placeholder="Enter your destination"
                    {...register("tujuan", { required: true })}
                    errorMessage={
                      errors.tujuan?.message
                        ? errors.tujuan.message
                        : "Transfer to field is required"
                    }
                    isInvalid={errors.tujuan ? true : false}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#2E2E2E] w-full text-[#F8F8F8]"
                  isLoading={isLoading ? true : false}
                >
                  Transfer
                </Button>
              </form>
            </div>
            <div>
              <div className="space-y-8 px-16 py-14 h-[100dvh] overflow-auto">
                <div className="space-y-3">
                  <p className="text-4xl">Transaction History</p>
                  <p>Access a list of your past transactions.</p>
                </div>
                <div className="space-y-6">
                  {
                    /* eslint-disable @typescript-eslint/no-explicit-any */
                    dataTransaction.map((dt: any, index) => (
                      <div
                        key={index}
                        className="text-lg flex justify-between p-6 bg-gray-100 rounded-xl"
                      >
                        {[
                          {
                            style1: "space-y-2",
                            title: "Origin",
                            id: dt.asal,
                            nominal: dt.nominal,
                            symbol: "-",
                            style2: "text-red-600 font-bold",
                          },
                          {
                            style1: "space-y-2 text-right",
                            title: "Destination",
                            id: dt.tujuan,
                            nominal: dt.nominal,
                            symbol: "+",
                            style2: "text-blue-600 font-bold",
                          },
                        ].map((card, index) => (
                          <div className={card.style1} key={index}>
                            <p className="font-bold">{card.title}</p>
                            <p>{card.id}</p>
                            <p className={card.style2}>
                              {card.symbol} {card.nominal}
                            </p>
                          </div>
                        ))}
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Page;
