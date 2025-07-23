const PageWrapper = ({
  header,
  className = "max-w-screen-lg mx-auto",
  children,
  showHeader = true,
}: {
  header: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className={`min-h-screen text-white ${className}`}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {showHeader && header && <div className="mb-6">{header}</div>}
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default PageWrapper;
