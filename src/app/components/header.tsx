import { Waves } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  const navItems = [
    { path: "/protocol", label: "Протокол" },
    { path: "/participants", label: "Участники" },
    { path: "/teams", label: "Команды" },
    { path: "/awards", label: "Награждение" },
    { path: "/regulations", label: "Регламент" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <Waves className="w-8 h-8 text-primary" />
          <span className="text-2xl font-semibold text-primary">Flounder</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm transition-colors ${
                location.pathname === item.path
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}