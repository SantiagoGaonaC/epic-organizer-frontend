// theme.ts
import { extendTheme } from "@chakra-ui/react";
import { Roboto_Mono } from "next/font/google";

const nextFont = Roboto_Mono({
  weight: ["400"],
  subsets: ["latin"],
});

const theme = extendTheme({
  fonts: {
    body: nextFont.style.fontFamily,
    heading: nextFont.style.fontFamily,
  },
});

export default theme;

/*

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

fonts: {
    body: nextFont.style.fontFamily,
    heading: inter.style.fontFamily,
  },
*/
