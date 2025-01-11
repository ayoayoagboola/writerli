import { SessionProvider } from "next-auth/react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <div className="w-full h-full">{children}</div>
    </SessionProvider>
  );
}
