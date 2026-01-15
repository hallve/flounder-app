import { useState } from "react";
import { Plus, Save, Edit2, Trash2, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface Participant {
  id: string;
  discipline: string;
  fullName: string;
  team: string;
  age: number;
  time: string;
  distance: string;
  heat: string;
  lane: number;
}

type SortField = keyof Participant;
type SortDirection = "asc" | "desc";

const initialParticipants: Participant[] = [
  { id: "1", discipline: "Вольный стиль", fullName: "Иванов Алексей Петрович", team: "Дельфины", age: 24, time: "00:24.5", distance: "50м", heat: "Финал А", lane: 4 },
  { id: "2", discipline: "Вольный стиль", fullName: "Петрова Мария Сергеевна", team: "Волны", age: 22, time: "00:26.8", distance: "50м", heat: "Финал А", lane: 5 },
  { id: "3", discipline: "Вольный стиль", fullName: "Сидоров Константин Иванович", team: "Дельфины", age: 26, time: "00:25.2", distance: "50м", heat: "Финал А", lane: 3 },
  { id: "4", discipline: "Баттерфляй", fullName: "Козлова Елена Александровна", team: "Акулы", age: 23, time: "00:27.1", distance: "100м", heat: "Финал Б", lane: 2 },
  { id: "5", discipline: "Баттерфляй", fullName: "Новиков Дмитрий Владимирович", team: "Волны", age: 25, time: "00:54.9", distance: "100м", heat: "Финал А", lane: 6 },
  { id: "6", discipline: "Брасс", fullName: "Лебедев Игорь Николаевич", team: "Акулы", age: 27, time: "01:05.2", distance: "100м", heat: "Финал А", lane: 1 },
];

export function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Participant | null>(null);
  
  const [filterDiscipline, setFilterDiscipline] = useState<string>("all");
  const [filterTeam, setFilterTeam] = useState<string>("all");
  const [filterSearch, setFilterSearch] = useState<string>("");
  
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const disciplines = Array.from(new Set(participants.map(p => p.discipline)));
  const teams = Array.from(new Set(participants.map(p => p.team)));

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  let filteredParticipants = participants.filter(p => {
    const matchesDiscipline = filterDiscipline === "all" || p.discipline === filterDiscipline;
    const matchesTeam = filterTeam === "all" || p.team === filterTeam;
    const matchesSearch = filterSearch === "" || 
      p.fullName.toLowerCase().includes(filterSearch.toLowerCase()) ||
      p.team.toLowerCase().includes(filterSearch.toLowerCase());
    
    return matchesDiscipline && matchesTeam && matchesSearch;
  });

  if (sortField) {
    filteredParticipants = [...filteredParticipants].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }

  const handleEdit = (participant: Participant) => {
    setEditingId(participant.id);
    setEditedData({ ...participant });
  };

  const handleSave = () => {
    if (editedData) {
      setParticipants(participants.map(p => p.id === editedData.id ? editedData : p));
      setEditingId(null);
      setEditedData(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedData(null);
  };

  const handleDelete = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const handleAdd = () => {
    const newParticipant: Participant = {
      id: String(Date.now()),
      discipline: "Вольный стиль",
      fullName: "",
      team: "",
      age: 0,
      time: "00:00.0",
      distance: "50м",
      heat: "Финал А",
      lane: 1
    };
    setParticipants([...participants, newParticipant]);
    setEditingId(newParticipant.id);
    setEditedData(newParticipant);
  };

  const updateField = (field: keyof Participant, value: any) => {
    if (editedData) {
      setEditedData({ ...editedData, [field]: value });
    }
  };

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-primary transition-colors"
    >
      {label}
      <ArrowUpDown className="w-3 h-3" />
    </button>
  );

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-3">Участники</h1>
          <p className="text-muted-foreground">
            Таблица участников соревнований по плаванию
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          Добавить участника
        </Button>
      </div>

      {/* Фильтры */}
      <div className="bg-card rounded-lg border p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold">Фильтры</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Поиск</label>
            <Input
              placeholder="Имя или команда..."
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Дисциплина</label>
            <Select value={filterDiscipline} onValueChange={setFilterDiscipline}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все дисциплины</SelectItem>
                {disciplines.map(d => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Команда</label>
            <Select value={filterTeam} onValueChange={setFilterTeam}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все команды</SelectItem>
                {teams.map(t => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">
                  <SortButton field="discipline" label="Дисциплина" />
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  <SortButton field="fullName" label="ФИО" />
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  <SortButton field="team" label="Команда" />
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  <SortButton field="age" label="Возраст" />
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  <SortButton field="time" label="Время" />
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  <SortButton field="distance" label="Дистанция" />
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  <SortButton field="heat" label="Заплыв" />
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  <SortButton field="lane" label="№ дорожки" />
                </th>
                <th className="px-4 py-3 text-right font-medium">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredParticipants.map((participant) => (
                <tr key={participant.id} className="hover:bg-muted/20">
                  {editingId === participant.id && editedData ? (
                    <>
                      <td className="px-4 py-3">
                        <Select
                          value={editedData.discipline}
                          onValueChange={(value) => updateField('discipline', value)}
                        >
                          <SelectTrigger className="min-w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Вольный стиль">Вольный стиль</SelectItem>
                            <SelectItem value="Баттерфляй">Баттерфляй</SelectItem>
                            <SelectItem value="Брасс">Брасс</SelectItem>
                            <SelectItem value="Кроль на спине">Кроль на спине</SelectItem>
                            <SelectItem value="Комплексное плавание">Комплексное плавание</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={editedData.fullName}
                          onChange={(e) => updateField('fullName', e.target.value)}
                          className="min-w-[200px]"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={editedData.team}
                          onChange={(e) => updateField('team', e.target.value)}
                          className="min-w-[120px]"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type="number"
                          value={editedData.age}
                          onChange={(e) => updateField('age', Number(e.target.value))}
                          className="w-20"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={editedData.time}
                          onChange={(e) => updateField('time', e.target.value)}
                          className="w-24"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={editedData.distance}
                          onChange={(e) => updateField('distance', e.target.value)}
                          className="w-24"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={editedData.heat}
                          onChange={(e) => updateField('heat', e.target.value)}
                          className="min-w-[100px]"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type="number"
                          value={editedData.lane}
                          onChange={(e) => updateField('lane', Number(e.target.value))}
                          className="w-20"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="default" onClick={handleSave}>
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            Отмена
                          </Button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                          {participant.discipline}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">{participant.fullName}</td>
                      <td className="px-4 py-3">{participant.team}</td>
                      <td className="px-4 py-3">{participant.age}</td>
                      <td className="px-4 py-3 font-mono">{participant.time}</td>
                      <td className="px-4 py-3">{participant.distance}</td>
                      <td className="px-4 py-3">{participant.heat}</td>
                      <td className="px-4 py-3 text-center">{participant.lane}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(participant)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive"
                            onClick={() => handleDelete(participant.id)}
                          >
                            <Trash2 className="w-4 h-4" />
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
  );
}
