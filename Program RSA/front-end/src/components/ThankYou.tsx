import { Button, Image, Link } from "@nextui-org/react";
import React from "react";

import { FaHome } from "react-icons/fa";

const ThankYou = () => {
  return (
    <section className="h-[100dvh] flex flex-col gap-3 justify-center items-center">
      <Image
        src="/thank-you.png"
        alt="Thank You"
        width={500}
        height={0}
      ></Image>
      <Button
        startContent={<FaHome className="text-white" />}
        size="lg"
        className="bg-[#2E2E2E] text-[#F8F8F8]"
        as={Link}
        href="/"
      >
        Back to Home
      </Button>
    </section>
  );
};

export default ThankYou;
