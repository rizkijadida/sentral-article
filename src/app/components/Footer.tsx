"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="container bg-gray-800 text-white">
      <div className="flex flex-col items-center justify-between space-y-5 p-5 md:flex-row md:space-y-0 md:p-10">
        <div className="flex justify-between gap-5 md:h-[100px] md:w-[500px] md:gap-10">
          <div className="relative my-auto h-[50px] w-[120px] overflow-hidden rounded-lg md:h-[80px] md:w-[200px]">
            <Image
              src={"/images/HeaderWebSo.jpg"}
              alt="thumbnail"
              className="object-cover"
              fill
            />
          </div>
          <div className="my-auto flex text-center md:w-[250px]">
            <h1 className="text-sm font-semibold italic md:text-lg">
              Bersaing dan Berprestasi
            </h1>
          </div>
        </div>
        <div className="flex gap-10 text-xs">
          <div className="flex flex-col">
            <p className="underline">Social Media</p>
            <div className="relative mt-3 h-[30px] w-[30px] overflow-hidden rounded-lg">
              <Image
                src={"/images/igIcon.png"}
                alt="thumbnail"
                className="cursor-pointer object-cover"
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
