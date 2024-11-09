import Link from "next/link";
import { DesirePro } from "@/lib/fonts";

const FooterLinks = () => {
  const linkStyle = `text-black hover:underline text-2xl ${DesirePro.className}`;

  return (
    <>
      <hr className="w-full border-gray-500" />
      <div className="z-10 mt-3 flex w-full justify-center space-x-4  border-t-gray-900">
        <Link href="/datenschutz" className={linkStyle}>
          Datenschutz
        </Link>
        <Link href="/impressum" className={linkStyle}>
          Impressum
        </Link>
      </div>
    </>
  );
};

export default FooterLinks;
