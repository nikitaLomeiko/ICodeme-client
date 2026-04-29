"use client";

import { withAuth } from "@/app/providers/auth";
import { Layout } from "@/widgets/layout";
import { ProfilePage } from "@/pages-root/profile";

const ProfilePageWithLayout = () => {
  return (
    <Layout>
      <ProfilePage />
    </Layout>
  );
};

export default withAuth(ProfilePageWithLayout);
