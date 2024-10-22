"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaWhatsapp } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

const page = () => {
  return (
    <div className="container">
      <div className="grid items-center justify-center gap-12 text-center">
        <h1 className="text-2xl font-bold">Hubungi Kami</h1>
        <Card className="mx-auto flex h-full w-[300px] items-center justify-center text-center md:w-[400px]">
          <CardHeader>
            <CardTitle>
              <FaWhatsapp size={30} color="green" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-full items-center justify-center text-center">
            <p
              className="mt-5 cursor-pointer font-semibold"
              onClick={() =>
                window.open(
                  "/https://api.whatsapp.com/send/?phone=%2B6281353000052&text&type=phone_number&app_absent=0",
                )
              }
            >
              +62 813-5300-0052
            </p>
          </CardContent>
        </Card>

        <Card className="mx-auto flex h-full w-[300px] items-center justify-center text-center md:w-[400px]">
          <CardHeader>
            <CardTitle>
              <BiLogoGmail size={30} color="red" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-full items-center justify-center text-center">
            <p
              className="mt-5 cursor-pointer font-semibold"
              onClick={() =>
                window.open(
                  "https://mail.google.com/mail/u/0/#search/sentralolimpiade%40gmail.com",
                )
              }
            >
              sentralolimpiade@gmail.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
