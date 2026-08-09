const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main
      className="relative flex-1 flex flex-col justify-start bg-cover bg-center overflow-x-hidden min-h-screen"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(8, 1, 8, 0.85), rgba(12, 1, 12, 0.95)), url('/images/auth-bg.jpg')`,
      }}
    >
      {/* Background Decorative Glows */}
      <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-primary/10 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-secondary/10 blur-[130px] pointer-events-none" />

      {children}
    </main>
  );
};

export default HomeLayout;
