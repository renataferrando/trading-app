import { cn } from "@/lib/utils";

const PageWrapper = ({
  header,
  className,
  children,
  showHeader = true,
  centerContent = false,
}: {
  header: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  children: React.ReactNode;
  centerContent?: boolean;
}) => {
  return (
    <div className={cn("min-h-screen text-white flex flex-col", className)}>
      <div
        className={cn(
          "max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 w-full flex flex-col",
          centerContent && "flex-grow"
        )}
      >
        {showHeader && header && <div className="mb-6">{header}</div>}
        <div
          className={cn(
            "space-y-6",
            centerContent && "flex-grow flex flex-col justify-center"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
