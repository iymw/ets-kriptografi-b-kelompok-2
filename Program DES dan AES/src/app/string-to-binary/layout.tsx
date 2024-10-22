import Typography from "@/Typography";
import { Button, Link } from "@nextui-org/react";
import { Metadata } from "next";
import * as React from "react";

export const metadata: Metadata = {
  title: "String to Binary",
  description: "This is the String to Binary page",
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="flex">
        <div className="h-screen w-[30%] space-y-10 p-8 text-center">
          <div className="space-y-2">
            <Typography variant="h2" weight="bold">
              K-K7
            </Typography>
            <Typography>Your ultimate encryption ally</Typography>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { title: "ECB", href: "/ecb", className: "" },
              {
                title: "string to binary",
                href: "/string-to-binary",
                className: "bg-slate-400 text-[#F8F8F8]",
              },
              { title: "CBC", href: "/cbc", className: "" },
            ].map((b, index) => (
              <Button
                key={index}
                color="default"
                as={Link}
                href={b.href}
                className={b.className}
              >
                {b.title}
              </Button>
            ))}
          </div>
        </div>
        <div className="h-fit w-[450px] pl-8 pt-8">{children}</div>
      </section>
    </>
  );
}
