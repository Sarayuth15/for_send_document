import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Login and registration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <nav className="bg-white p-4 shadow flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/users">Users</Link>
          <Link href="/logins">Logins</Link>
        </nav>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
