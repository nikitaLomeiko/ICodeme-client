import { RootLayout as Root, metadata } from "@/app/";
import { Layout } from "@/widgets/layout";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Root>
      <Layout>{children}</Layout>
    </Root>
  );
}

export default RootLayout;
