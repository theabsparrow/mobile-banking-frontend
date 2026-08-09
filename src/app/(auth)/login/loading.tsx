import { Loader2 } from "lucide-react";

const LoginLoadingPage = () => {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center p-4 bg-cover bg-center text-white"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(8, 1, 8, 0.85), rgba(12, 1, 12, 0.95)), url('/images/auth-bg.jpg')`,
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-semibold tracking-wider text-muted-foreground">
          Loading PaySwift Secured Portal...
        </p>
      </div>
    </div>
  );
};

export default LoginLoadingPage;
