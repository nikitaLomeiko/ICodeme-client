import { RootLayout as Root, metadata } from "@/app/";
import { AuthLayout } from "@/widgets/auth-layout";
import { Layout } from "@/widgets/layout";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Root>
      <AuthLayout>{children}</AuthLayout>
    </Root>
  );
}

export default RootLayout;
