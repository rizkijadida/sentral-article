"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DialogOnGoingEvent from "./DialogOnGoingEvent";
import DropDownEvent from "./DropDownEvent";

const Navbar = () => {
  const router = useRouter();
  const homeButton = () => router.push("/");
  const contactUsButton = () =>
    window.open(
      "https://api.whatsapp.com/send/?phone=%2B6281353000052&text&type=phone_number&app_absent=0",
    );

  return (
    <nav className="container md:border-spacing-4">
      <div className="m-5 my-5 flex items-center justify-between gap-3 md:mx-14 md:my-10">
        <div className="relative h-[50px] w-[50px]">
          <Image
            src={"/images/Logo.png"}
            alt="logo"
            className="cursor-pointer rounded-xl bg-cover"
            fill
            style={{ objectFit: "cover" }}
            onClick={homeButton}
          />
        </div>

        <div className="my-auto flex items-center justify-center space-x-5 md:w-[200x]">
        <Button
            variant={"link"}
            onClick={() => router.push("/article")}
            className="w-[30px] md:block md:w-[100px] md:text-base"
          >
            Artikel
          </Button>
          <Button
            variant={"link"}
            onClick={contactUsButton}
            className="hidden w-[50px] text-xs md:block md:w-[100px] md:text-sm"
          >
            Contact Us
          </Button>

          <DropDownEvent />

          <DialogOnGoingEvent />

          <Button
            variant={"link"}
            onClick={() => window.open("https://sentralolimpiade.id/")}
            className="bg-green-500 text-white shadow-md"
          >
            Daftar
          </Button>
        </div>
      </div>
      <Separator className="mx-auto w-[95%] bg-violet-500" />
    </nav>
  );
};

export default Navbar;
