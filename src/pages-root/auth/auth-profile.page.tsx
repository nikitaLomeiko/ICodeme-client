import { ProfileForm } from "@/features/profile";
import { AuthLayout } from "@/widgets/auth-layout";

export const AuthProfilePage = () => {
  return (
    <AuthLayout>
      <ProfileForm />
    </AuthLayout>
  );
};
