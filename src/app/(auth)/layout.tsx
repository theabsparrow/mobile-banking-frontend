import { ShieldCheck } from "lucide-react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center p-4 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(8, 1, 8, 0.75), rgba(12, 1, 12, 0.9)), url('/images/auth-bg.jpg')`,
      }}
    >
      {/* Background Decorative Glows */}
      <div className="absolute -top-40 -left-40 h-100 w-100 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-100 w-100 rounded-full bg-secondary/20 blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-110 z-10 transition-all duration-300">
        {/* Logo / Header */}
        <header className="flex flex-col items-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-tr from-primary to-secondary p-3 shadow-[0_0_20px_rgba(226,19,110,0.4)] mb-3">
            <ShieldCheck className="h-full w-full text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-1.5 font-sans">
            Pay<span className="text-secondary bg-clip-text">Swift</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5 font-medium">
            Secure Mobile Financial Services
          </p>
        </header>
        
        <main>{children}</main>

        {/* Footer info */}
        <footer className="flex justify-between items-center mt-6 text-xs text-muted-foreground px-4">
          <p>© {new Date().getFullYear()} PaySwift Ltd.</p>
          <div className="flex gap-3">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default AuthLayout;
