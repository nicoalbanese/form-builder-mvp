const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl pt-6">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
