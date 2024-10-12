import "./globals.css";
import { Head } from "./head";
import { Navbar } from "@/components/navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body className={`antialiased container mx-auto px-4`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
