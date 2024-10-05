import localFont from "next/font/local";

export const OpenSans = localFont({
  src: [
    {
      path: "../public/fonts/opensans-variablefont_wdthwght-webfont.woff",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/opensans-italic-variablefont_wdthwght-webfont.woff",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-open-sans",
  display: "swap",
});

export const DesirePro = localFont({
  src: [
    {
      path: "../public/fonts/desirepro-webfont.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-desirepro",
  display: "swap",
});

export const Dancing = localFont({
  src: [
    {
      path: "../public/fonts/DancingScript-VariableFont_wght.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-desirepro",
  display: "swap",
});
