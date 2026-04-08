"use client";

import { withAuth } from "@/app/providers/auth";
import { ProfilePage } from "@/pages-root/auth/profile.page";

export default withAuth(ProfilePage);
