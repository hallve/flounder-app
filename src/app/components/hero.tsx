import { Waves, Calendar, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <Waves className="w-12 h-12 text-primary" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl mb-6 text-primary">
          Flounder Swimming
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Система управления соревнованиями по плаванию. Протоколы, участники, команды и награждение.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <Link to="/protocol" className="h-full">
            <div className="h-full p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Протоколы</h3>
              <p className="text-sm text-muted-foreground">Официальные результаты заплывов</p>
            </div>
          </Link>

          <Link to="/teams" className="h-full">
            <div className="h-full p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Команды</h3>
              <p className="text-sm text-muted-foreground">Зарегистрированные команды</p>
            </div>
          </Link>

          <Link to="/awards" className="h-full">
            <div className="h-full p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center">
              <Trophy className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Награждение</h3>
              <p className="text-sm text-muted-foreground">Победители и призеры</p>
            </div>
          </Link>
        </div>

        <Link to="/participants">
          <Button size="lg" className="gap-2">
            <Users className="w-5 h-5" />
            Посмотреть участников
          </Button>
        </Link>
      </div>
    </section>
  );
}