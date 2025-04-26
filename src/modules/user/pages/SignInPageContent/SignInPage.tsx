import { SignInForm } from "../../components";

export function SignInPageContent() {
  return (
    <section className="min-h-[calc(100dvh-69px)] flex-col gap-6 flex items-center justify-center p-6">
      <SignInForm />
    </section>
  );
}
