"use client";
import { AuthProvider } from "@/components/global/AuthProvier";
import "./globals.css";
import theme from "@/theme/theme";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export const metadata = {
  title: "Epic Organizer",
  description: "Organize your life by tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#171923]">
      <body>
        <AuthProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
