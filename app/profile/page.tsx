"use client";

import { withAuth } from "@/app/providers/auth";
import { ProfilePage } from "@/pages-root/profile";

export default withAuth(ProfilePage);
