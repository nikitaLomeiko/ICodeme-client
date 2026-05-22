"use client";

import { withAccount, withAuth } from "@/app/providers/auth";
import { DocumentationPage } from "@/pages-root/documentation";

export default withAuth(withAccount(DocumentationPage));
