import { useState } from "react";
import { Trophy, Medal, Award } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface Winner {
  place: 1 | 2 | 3;
  name: string;
  initials: string;
  team: string;
  time: string;
  ageCategory: string;
}

interface DistanceResults {
  distance: string;
  discipline: string;
  winners: Winner[];
}

const mockResults: DistanceResults[] = [
  {
    distance: "50м Вольный стиль",
    discipline: "Вольный стиль",
    winners: [
      { place: 1, name: "Иванов Алексей", initials: "ИА", team: "Дельфины", time: "00:24.5", ageCategory: "18-25 лет" },
      { place: 2, name: "Сидоров Константин", initials: "СК", team: "Дельфины", time: "00:25.2", ageCategory: "18-25 лет" },
      { place: 3, name: "Новиков Дмитрий", initials: "НД", team: "Волны", time: "00:25.9", ageCategory: "18-25 лет" },
      { place: 1, name: "Морозов Андрей", initials: "МА", team: "Дельфины", time: "00:26.1", ageCategory: "26-35 лет" },
      { place: 2, name: "Лебедев Игорь", initials: "ЛИ", team: "Акулы", time: "00:26.5", ageCategory: "26-35 лет" },
      { place: 3, name: "Васильев Сергей", initials: "ВС", team: "Волны", time: "00:27.0", ageCategory: "26-35 лет" },
    ]
  },
  {
    distance: "50м Вольный стиль (женщины)",
    discipline: "Вольный стиль",
    winners: [
      { place: 1, name: "Петрова Мария", initials: "ПМ", team: "Волны", time: "00:26.8", ageCategory: "18-25 лет" },
      { place: 2, name: "Козлова Елена", initials: "КЕ", team: "Акулы", time: "00:27.1", ageCategory: "18-25 лет" },
      { place: 3, name: "Соколова Анна", initials: "СА", team: "Волны", time: "00:27.5", ageCategory: "18-25 лет" },
    ]
  },
  {
    distance: "100м Баттерфляй",
    discipline: "Баттерфляй",
    winners: [
      { place: 1, name: "Новиков Дмитрий", initials: "НД", team: "Волны", time: "00:54.3", ageCategory: "18-25 лет" },
      { place: 2, name: "Сидоров Константин", initials: "СК", team: "Дельфины", time: "00:55.1", ageCategory: "18-25 лет" },
      { place: 3, name: "Иванов Алексей", initials: "ИА", team: "Дельфины", time: "00:55.8", ageCategory: "18-25 лет" },
    ]
  },
  {
    distance: "100м Брасс",
    discipline: "Брасс",
    winners: [
      { place: 1, name: "Лебедев Игорь", initials: "ЛИ", team: "Акулы", time: "01:05.2", ageCategory: "26-35 лет" },
      { place: 2, name: "Морозов Андрей", initials: "МА", team: "Дельфины", time: "01:06.5", ageCategory: "26-35 лет" },
      { place: 3, name: "Васильев Сергей", initials: "ВС", team: "Волны", time: "01:07.1", ageCategory: "26-35 лет" },
    ]
  }
];

const placeConfig = {
  1: { icon: Trophy, color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-400" },
  2: { icon: Medal, color: "text-gray-500", bgColor: "bg-gray-50", borderColor: "border-gray-400" },
  3: { icon: Award, color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-400" }
};

export function AwardsPage() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("all");

  const disciplines = Array.from(new Set(mockResults.map(r => r.discipline)));
  
  const filteredResults = selectedDiscipline === "all" 
    ? mockResults 
    : mockResults.filter(r => r.discipline === selectedDiscipline);

  const groupByAgeCategory = (winners: Winner[]) => {
    const grouped: Record<string, Winner[]> = {};
    winners.forEach(winner => {
      if (!grouped[winner.ageCategory]) {
        grouped[winner.ageCategory] = [];
      }
      grouped[winner.ageCategory].push(winner);
    });
    return grouped;
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="mb-12">
        <h1 className="mb-3">Награждение</h1>
        <p className="text-muted-foreground">
          Победители и призеры соревнований по плаванию
        </p>
      </div>

      <Tabs value={selectedDiscipline} onValueChange={setSelectedDiscipline} className="mb-8">
        <TabsList>
          <TabsTrigger value="all">Все дисциплины</TabsTrigger>
          {disciplines.map(d => (
            <TabsTrigger key={d} value={d}>{d}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-12">
        {filteredResults.map((result, idx) => {
          const groupedWinners = groupByAgeCategory(result.winners);

          return (
            <div key={idx} className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-primary mb-2">{result.distance}</h2>
                <p className="text-muted-foreground">{result.discipline}</p>
              </div>

              {Object.entries(groupedWinners).map(([ageCategory, winners]) => (
                <div key={ageCategory}>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-secondary">{ageCategory}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Золото */}
                    {winners.filter(w => w.place === 1).map(winner => {
                      const PlaceIcon = placeConfig[1].icon;
                      return (
                        <Card 
                          key={winner.name} 
                          className={`${placeConfig[1].bgColor} border-2 ${placeConfig[1].borderColor} transform hover:scale-105 transition-transform`}
                        >
                          <CardContent className="pt-6 text-center">
                            <div className="flex justify-center mb-4">
                              <div className="p-4 rounded-full bg-white">
                                <PlaceIcon className={`w-12 h-12 ${placeConfig[1].color}`} />
                              </div>
                            </div>
                            <div className="flex justify-center mb-3">
                              <Avatar className="w-16 h-16">
                                <AvatarFallback className="bg-yellow-600 text-white text-lg">
                                  {winner.initials}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <h4 className="font-bold text-lg mb-1">{winner.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{winner.team}</p>
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white">
                              <span className="font-mono font-bold text-xl">{winner.time}</span>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}

                    {/* Серебро */}
                    {winners.filter(w => w.place === 2).map(winner => {
                      const PlaceIcon = placeConfig[2].icon;
                      return (
                        <Card 
                          key={winner.name} 
                          className={`${placeConfig[2].bgColor} border-2 ${placeConfig[2].borderColor} transform hover:scale-105 transition-transform`}
                        >
                          <CardContent className="pt-6 text-center">
                            <div className="flex justify-center mb-4">
                              <div className="p-4 rounded-full bg-white">
                                <PlaceIcon className={`w-12 h-12 ${placeConfig[2].color}`} />
                              </div>
                            </div>
                            <div className="flex justify-center mb-3">
                              <Avatar className="w-16 h-16">
                                <AvatarFallback className="bg-gray-500 text-white text-lg">
                                  {winner.initials}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <h4 className="font-bold text-lg mb-1">{winner.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{winner.team}</p>
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white">
                              <span className="font-mono font-bold text-xl">{winner.time}</span>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}

                    {/* Бронза */}
                    {winners.filter(w => w.place === 3).map(winner => {
                      const PlaceIcon = placeConfig[3].icon;
                      return (
                        <Card 
                          key={winner.name} 
                          className={`${placeConfig[3].bgColor} border-2 ${placeConfig[3].borderColor} transform hover:scale-105 transition-transform`}
                        >
                          <CardContent className="pt-6 text-center">
                            <div className="flex justify-center mb-4">
                              <div className="p-4 rounded-full bg-white">
                                <PlaceIcon className={`w-12 h-12 ${placeConfig[3].color}`} />
                              </div>
                            </div>
                            <div className="flex justify-center mb-3">
                              <Avatar className="w-16 h-16">
                                <AvatarFallback className="bg-orange-600 text-white text-lg">
                                  {winner.initials}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <h4 className="font-bold text-lg mb-1">{winner.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{winner.team}</p>
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white">
                              <span className="font-mono font-bold text-xl">{winner.time}</span>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
