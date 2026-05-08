"use client";

import { withAccount, withAuth } from "@/app/providers/auth";
import { Layout } from "@/widgets/layout";

function Home() {
  return <Layout>test</Layout>;
}

export default withAuth(withAccount(Home));
