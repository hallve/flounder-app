import { Waves } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Waves className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold text-primary">Flounder</span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © 2026 Flounder. Все права защищены.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Корпоративный портал для управления проектами
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
