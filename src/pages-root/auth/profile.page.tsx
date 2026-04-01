import { ProfileForm } from "@/features/profile-form";
import { AuthLayout } from "@/widgets/auth-layout";

export const ProfilePage = () => {
  return (
    <AuthLayout>
      <ProfileForm />
    </AuthLayout>
  );
};
