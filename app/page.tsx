import Image from "next/image";
import "./globals.css";
import News from "@/components/News";
import FooterLinks from "@/components/FooterLinks";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex w-full flex-grow flex-col items-center justify-start">
        <News />
       
      </main>
      <FooterLinks  />
    </div>
  );
}
