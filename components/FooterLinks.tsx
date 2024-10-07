import Link from 'next/link';
import { DesirePro } from "@/lib/fonts";

const FooterLinks = () => {

  const linkStyle = `text-black hover:underline text-2xl ${DesirePro.className}`

  return (
    <div className="w-full flex justify-center space-x-4 mt-8">
      <Link href="/datenschutz" className={linkStyle}>
        Datenschutz
      </Link>
      <Link href="/impressum" className={linkStyle}>
        Impressum
      </Link>
    </div>
  );
};

export default FooterLinks;
