import { Button, Image, Link } from "@nextui-org/react";
import React from "react";

import { FiArrowUpRight } from "react-icons/fi";

const Hero = () => {
  return (
    <>
      <section className="h-[100dvh] space-y-8 flex flex-col justify-center items-center font-[family-name:var(--font-geist-mono)]">
        <div className="flex gap-8 justify-center items-center">
          <div className="space-y-6">
            <div className="relative">
              <Button
                endContent={
                  <FiArrowUpRight className="text-white text-2xl bg-black rounded-full" />
                }
                size="lg"
                className="absolute bottom-10 left-8 z-50 bg-white"
                as={Link}
                href="/transfer"
              >
                Transfer now!
              </Button>
              <Image src="/card.png" alt="Card" width={600} height={0}></Image>
            </div>
            <p className="text-lg">
              Securely transfer your money with{" "}
              <span className="font-bold">RSA Bank</span>
            </p>
          </div>
          <Image src="/hacker.png" alt="Card" width={400} height={0}></Image>
        </div>
      </section>
    </>
  );
};

export default Hero;
