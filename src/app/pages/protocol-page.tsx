import { useState } from "react";
import { FileText, Plus, Edit2, Save, Trash2, X, Download } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface LaneEntry {
  id: string;
  laneNumber: number;
  fullName: string;
  organization: string;
  ageCategory: string;
  time: string;
}

interface Heat {
  id: string;
  name: string;
  lanes: LaneEntry[];
}

interface Distance {
  id: string;
  name: string;
  gender: "male" | "female";
  heats: Heat[];
}

interface Protocol {
  id: string;
  title: string;
  competitionName: string;
  competitionType: "cup" | "championship";
  date: string;
  distances: Distance[];
}

const initialProtocols: Protocol[] = [
  {
    id: "1",
    title: "Протокол соревнований - Январь 2026",
    competitionName: "Первенство города",
    competitionType: "championship",
    date: "2026-01-10",
    distances: [
      {
        id: "d1",
        name: "50м Вольный стиль",
        gender: "male",
        heats: [
          {
            id: "h1",
            name: "Заплыв 1",
            lanes: Array.from({ length: 8 }, (_, i) => ({
              id: `l${i}`,
              laneNumber: i + 1,
              fullName: i === 0 ? "Иванов Алексей" : "",
              organization: i === 0 ? "Дельфины" : "",
              ageCategory: i === 0 ? "18-25 лет" : "",
              time: i === 0 ? "00:24.5" : "00:00.0"
            }))
          }
        ]
      }
    ]
  }
];

export function ProtocolPage() {
  const [protocols, setProtocols] = useState<Protocol[]>(initialProtocols);
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLaneId, setEditingLaneId] = useState<string | null>(null);
  const [editedLane, setEditedLane] = useState<LaneEntry | null>(null);

  const handleCreateProtocol = () => {
    const newProtocol: Protocol = {
      id: String(Date.now()),
      title: `Новый протокол - ${new Date().toLocaleDateString()}`,
      competitionName: "",
      competitionType: "cup",
      date: new Date().toISOString().split('T')[0],
      distances: []
    };
    setProtocols([...protocols, newProtocol]);
    setSelectedProtocol(newProtocol);
    setIsDialogOpen(true);
  };

  const handleAddDistance = () => {
    if (selectedProtocol) {
      const newDistance: Distance = {
        id: String(Date.now()),
        name: "50м Вольный стиль",
        gender: "male",
        heats: [{
          id: String(Date.now()),
          name: "Заплыв 1",
          lanes: Array.from({ length: 8 }, (_, i) => ({
            id: `l${Date.now()}_${i}`,
            laneNumber: i + 1,
            fullName: "",
            organization: "",
            ageCategory: "",
            time: "00:00.0"
          }))
        }]
      };
      
      setSelectedProtocol({
        ...selectedProtocol,
        distances: [...selectedProtocol.distances, newDistance]
      });
    }
  };

  const handleAddHeatToDistance = (distanceId: string) => {
    if (selectedProtocol) {
      const newHeat: Heat = {
        id: String(Date.now()),
        name: `Заплыв ${selectedProtocol.distances.find(d => d.id === distanceId)?.heats.length! + 1}`,
        lanes: Array.from({ length: 8 }, (_, i) => ({
          id: `l${Date.now()}_${i}`,
          laneNumber: i + 1,
          fullName: "",
          organization: "",
          ageCategory: "",
          time: "00:00.0"
        }))
      };

      setSelectedProtocol({
        ...selectedProtocol,
        distances: selectedProtocol.distances.map(d => 
          d.id === distanceId 
            ? { ...d, heats: [...d.heats, newHeat] }
            : d
        )
      });
    }
  };

  const handleSaveProtocol = () => {
    if (selectedProtocol) {
      setProtocols(protocols.map(p => p.id === selectedProtocol.id ? selectedProtocol : p));
      setIsDialogOpen(false);
      setSelectedProtocol(null);
    }
  };

  const handleEditLane = (lane: LaneEntry) => {
    setEditingLaneId(lane.id);
    setEditedLane({ ...lane });
  };

  const handleSaveLane = () => {
    if (editedLane && selectedProtocol) {
      const updatedProtocol = {
        ...selectedProtocol,
        distances: selectedProtocol.distances.map(distance => ({
          ...distance,
          heats: distance.heats.map(heat => ({
            ...heat,
            lanes: heat.lanes.map(lane => lane.id === editedLane.id ? editedLane : lane)
          }))
        }))
      };
      setSelectedProtocol(updatedProtocol);
      setEditingLaneId(null);
      setEditedLane(null);
    }
  };

  const handleDeleteProtocol = (id: string) => {
    setProtocols(protocols.filter(p => p.id !== id));
  };

  const updateField = (field: keyof LaneEntry, value: any) => {
    if (editedLane) {
      setEditedLane({ ...editedLane, [field]: value });
    }
  };

  const updateProtocolField = (field: keyof Protocol, value: any) => {
    if (selectedProtocol) {
      setSelectedProtocol({ ...selectedProtocol, [field]: value });
    }
  };

  const updateDistanceField = (distanceId: string, field: keyof Distance, value: any) => {
    if (selectedProtocol) {
      setSelectedProtocol({
        ...selectedProtocol,
        distances: selectedProtocol.distances.map(d =>
          d.id === distanceId ? { ...d, [field]: value } : d
        )
      });
    }
  };

  const handleDownloadProtocol = () => {
    alert("Функция скачивания протокола будет реализована");
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-3">Протоколы соревнований</h1>
          <p className="text-muted-foreground">
            Официальные протоколы заплывов и соревнований по плаванию
          </p>
        </div>
        <Button onClick={handleCreateProtocol} className="gap-2">
          <Plus className="w-4 h-4" />
          Добавить протокол
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {protocols.map((protocol) => (
          <Card key={protocol.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-lg">{protocol.title}</CardTitle>
              <CardDescription>{protocol.competitionName} • {protocol.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setSelectedProtocol(protocol);
                    setIsDialogOpen(true);
                  }}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Редактировать
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-destructive"
                  onClick={() => handleDeleteProtocol(protocol.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Удалить
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsDialogOpen(false);
          setSelectedProtocol(null);
        }
      }}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Редактирование протокола</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleDownloadProtocol}>
                  <Download className="w-4 h-4 mr-2" />
                  Скачать
                </Button>
                <Button size="sm" onClick={handleSaveProtocol}>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedProtocol && (
            <div className="space-y-6">
              {/* Информация о соревнованиях */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Название соревнований</label>
                    <Input
                      value={selectedProtocol.competitionName}
                      onChange={(e) => updateProtocolField('competitionName', e.target.value)}
                      placeholder="Например: Первенство города"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Тип соревнований</label>
                    <Select
                      value={selectedProtocol.competitionType}
                      onValueChange={(value) => updateProtocolField('competitionType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cup">Кубок</SelectItem>
                        <SelectItem value="championship">Первенство</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Дата</label>
                    <Input
                      type="date"
                      value={selectedProtocol.date}
                      onChange={(e) => updateProtocolField('date', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Дистанции */}
              {selectedProtocol.distances.map((distance) => (
                <div key={distance.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <Input
                        value={distance.name}
                        onChange={(e) => updateDistanceField(distance.id, 'name', e.target.value)}
                        className="font-semibold"
                        placeholder="Название дистанции"
                      />
                      <Select
                        value={distance.gender}
                        onValueChange={(value) => updateDistanceField(distance.id, 'gender', value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Мужчины</SelectItem>
                          <SelectItem value="female">Женщины</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button size="sm" onClick={() => handleAddHeatToDistance(distance.id)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить заплыв
                    </Button>
                  </div>

                  {distance.heats.map((heat) => (
                    <div key={heat.id} className="space-y-2">
                      <h4 className="font-semibold text-secondary">{heat.name}</h4>
                      <div className="bg-card rounded-lg border overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-muted/50">
                              <tr>
                                <th className="px-4 py-3 text-left font-medium">Дорожка №</th>
                                <th className="px-4 py-3 text-left font-medium">ФИО</th>
                                <th className="px-4 py-3 text-left font-medium">Организация</th>
                                <th className="px-4 py-3 text-left font-medium">Возрастная категория</th>
                                <th className="px-4 py-3 text-left font-medium">Время</th>
                                <th className="px-4 py-3 text-right font-medium">Действия</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {heat.lanes.map((lane) => (
                                <tr key={lane.id} className="hover:bg-muted/20">
                                  {editingLaneId === lane.id && editedLane ? (
                                    <>
                                      <td className="px-4 py-3">
                                        <Input
                                          type="number"
                                          value={editedLane.laneNumber}
                                          onChange={(e) => updateField('laneNumber', Number(e.target.value))}
                                          className="w-20"
                                        />
                                      </td>
                                      <td className="px-4 py-3">
                                        <Input
                                          value={editedLane.fullName}
                                          onChange={(e) => updateField('fullName', e.target.value)}
                                          className="min-w-[200px]"
                                        />
                                      </td>
                                      <td className="px-4 py-3">
                                        <Input
                                          value={editedLane.organization}
                                          onChange={(e) => updateField('organization', e.target.value)}
                                          className="min-w-[120px]"
                                        />
                                      </td>
                                      <td className="px-4 py-3">
                                        <Input
                                          value={editedLane.ageCategory}
                                          onChange={(e) => updateField('ageCategory', e.target.value)}
                                          className="min-w-[120px]"
                                        />
                                      </td>
                                      <td className="px-4 py-3">
                                        <Input
                                          value={editedLane.time}
                                          onChange={(e) => updateField('time', e.target.value)}
                                          className="w-24"
                                        />
                                      </td>
                                      <td className="px-4 py-3">
                                        <div className="flex gap-2 justify-end">
                                          <Button size="sm" variant="default" onClick={handleSaveLane}>
                                            <Save className="w-4 h-4" />
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                              setEditingLaneId(null);
                                              setEditedLane(null);
                                            }}
                                          >
                                            <X className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      </td>
                                    </>
                                  ) : (
                                    <>
                                      <td className="px-4 py-3 text-center font-semibold">{lane.laneNumber}</td>
                                      <td className="px-4 py-3 font-medium">{lane.fullName || "-"}</td>
                                      <td className="px-4 py-3">{lane.organization || "-"}</td>
                                      <td className="px-4 py-3">{lane.ageCategory || "-"}</td>
                                      <td className="px-4 py-3 font-mono">{lane.time}</td>
                                      <td className="px-4 py-3">
                                        <div className="flex gap-2 justify-end">
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleEditLane(lane)}
                                          >
                                            <Edit2 className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      </td>
                                    </>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              <Button onClick={handleAddDistance} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Добавить дистанцию
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
