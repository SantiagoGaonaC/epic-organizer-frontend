"use client";
import { AuthProvider } from "@/context/AuthProvier";
import "./globals.css";
import theme from "@/theme/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { TaskProvider } from "@/context/TaskContext";

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
    <html lang="en" className="bg-[#000000]">
      <body>
        <AuthProvider>
          <TaskProvider>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
