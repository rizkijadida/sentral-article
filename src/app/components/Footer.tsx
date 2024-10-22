"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="container bg-gray-800 text-white">
      <div className="flex md:flex-row flex-col justify-between items-center md:p-10 p-5 md:space-y-0 space-y-5">
        <div className="flex md:gap-10 justify-between md:w-[500px] md:h-[100px] gap-5 ">
          <div className="relative md:h-[80px] md:w-[200px] h-[50px] w-[120px] overflow-hidden rounded-lg my-auto">
            <Image
              src={"/images/HeaderWebSo.jpg"}
              alt="thumbnail"
              className="object-cover"
              fill
            />
          </div>
          <div className="flex text-center my-auto md:w-[250px]">
            <h1 className="font-semibold md:text-lg text-sm italic">Bersaing dan Berprestasi</h1>
          </div>
        </div>
        <div className="flex gap-10 text-xs">
          <div className="flex flex-col ">
            <p className="underline">Social Media</p>
            <div className="relative h-[30px] w-[30px] overflow-hidden rounded-lg mt-3">
              <Image
                src={"/images/igIcon.png"}
                alt="thumbnail"
                className="object-cover cursor-pointer"
                fill
                onClick={() =>
                  window.open("https://www.instagram.com/sentralolimpiade/")
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="underline">Company</p>
            <p
              className="cursor-pointer"
              onClick={() => router.push("/contact-us")}
            >
              Contact-Us
            </p>
            <p
              className="cursor-pointer"
              onClick={() => router.push("/testimoni")}
            >
              Testimoni
            </p>

            <p
              className="cursor-pointer"
              onClick={() => router.push("/article")}
            >
              Article
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="underline">Tearms & Policies</p>
            <p
              className="cursor-pointer"
              onClick={() => router.push("/article")}
            >
              Ketentuan Penggunaan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
