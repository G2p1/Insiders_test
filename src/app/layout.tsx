'use client';
import Tabs from "./components/tabs";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Tabs />
        {children}
      </body>
    </html>
  );
}
