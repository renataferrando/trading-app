import { Button } from "@/components/ui/button";

const Header = ({
  title,
  navItems,
  button,
}: {
  title: string;
  navItems: string[];
  className?: string;
  button: React.ReactNode;
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <Button key={item}>{item}</Button>
          ))}
          {button}
        </div>
      </div>
    </div>
  );
};

export default Header;
