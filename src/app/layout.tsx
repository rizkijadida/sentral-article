import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const openSans = Open_Sans({
  weight: ["400", "700"], // Pilih berat font yang kamu butuhkan
  subsets: ["latin"], // Menyesuaikan subset yang diperlukan
  variable: "--font-open-sans", // Menambahkan variabel untuk digunakan dalam CSS
});

export const metadata: Metadata = {
  title: "Sentral Olimpiade 2024",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["apple-touch-icon.png"],
  },
  description:
    "Situs resmi Olimpiade 2024, tempat untuk mengikuti kompetisi dan melihat hasil terbaru.",
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"], // Sesuaikan berat font sesuai kebutuhan
  variable: "--font-playfair", // Gunakan CSS variable
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body
        className={`${openSans.variable} ${geistMono.variable} antialiased space-y-10 bg-violet-100`}
      > */}
      <body
        className={`${playfair.variable} space-y-10 bg-violet-100 font-sans antialiased`}
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
