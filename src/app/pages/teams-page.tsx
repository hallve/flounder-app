import { useState } from "react";
import { Users, Trophy, User, Plus, Edit2, Save, X, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  age: number;
}

interface Team {
  id: string;
  name: string;
  description: string;
  coach: string;
  members: TeamMember[];
  totalPoints: number;
}

const initialTeams: Team[] = [
  {
    id: "1",
    name: "Дельфины",
    description: "Команда опытных пловцов, специализирующихся на вольном стиле",
    coach: "Иванов Петр Сергеевич",
    totalPoints: 245,
    members: [
      { id: "m1", name: "Иванов Алексей", initials: "ИА", age: 24 },
      { id: "m2", name: "Сидоров Константин", initials: "СК", age: 26 },
      { id: "m3", name: "Морозов Андрей", initials: "МА", age: 23 }
    ]
  },
  {
    id: "2",
    name: "Волны",
    description: "Молодая команда с акцентом на баттерфляй и комплексное плавание",
    coach: "Петрова Мария Владимировна",
    totalPoints: 198,
    members: [
      { id: "m4", name: "Петрова Мария", initials: "ПМ", age: 22 },
      { id: "m5", name: "Новиков Дмитрий", initials: "НД", age: 25 },
      { id: "m6", name: "Соколова Анна", initials: "СА", age: 21 }
    ]
  },
  {
    id: "3",
    name: "Акулы",
    description: "Команда спринтеров, специализирующихся на короткие дистанции",
    coach: "Козлов Сергей Николаевич",
    totalPoints: 212,
    members: [
      { id: "m7", name: "Козлова Елена", initials: "КЕ", age: 23 },
      { id: "m8", name: "Лебедев Игорь", initials: "ЛИ", age: 27 },
      { id: "m9", name: "Орлова Виктория", initials: "ОВ", age: 24 }
    ]
  }
];

export function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [editedTeam, setEditedTeam] = useState<Team | null>(null);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editedMember, setEditedMember] = useState<TeamMember | null>(null);

  const sortedTeams = [...teams].sort((a, b) => b.totalPoints - a.totalPoints);

  const handleEditTeam = (team: Team) => {
    setEditingTeamId(team.id);
    setEditedTeam({ ...team });
  };

  const handleSaveTeam = () => {
    if (editedTeam) {
      setTeams(teams.map(t => t.id === editedTeam.id ? editedTeam : t));
      setEditingTeamId(null);
      setEditedTeam(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTeamId(null);
    setEditedTeam(null);
    setEditingMemberId(null);
    setEditedMember(null);
  };

  const updateTeamField = (field: keyof Team, value: any) => {
    if (editedTeam) {
      setEditedTeam({ ...editedTeam, [field]: value });
    }
  };

  const handleAddMember = () => {
    if (editedTeam) {
      const newMember: TeamMember = {
        id: String(Date.now()),
        name: "",
        initials: "",
        age: 0
      };
      setEditedTeam({
        ...editedTeam,
        members: [...editedTeam.members, newMember]
      });
      setEditingMemberId(newMember.id);
      setEditedMember(newMember);
    }
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMemberId(member.id);
    setEditedMember({ ...member });
  };

  const handleSaveMember = () => {
    if (editedTeam && editedMember) {
      setEditedTeam({
        ...editedTeam,
        members: editedTeam.members.map(m => m.id === editedMember.id ? editedMember : m)
      });
      setEditingMemberId(null);
      setEditedMember(null);
    }
  };

  const handleDeleteMember = (memberId: string) => {
    if (editedTeam) {
      setEditedTeam({
        ...editedTeam,
        members: editedTeam.members.filter(m => m.id !== memberId)
      });
    }
  };

  const updateMemberField = (field: keyof TeamMember, value: any) => {
    if (editedMember) {
      setEditedMember({ ...editedMember, [field]: value });
    }
  };

  const handleAddTeam = () => {
    const newTeam: Team = {
      id: String(Date.now()),
      name: "Новая команда",
      description: "",
      coach: "",
      totalPoints: 0,
      members: []
    };
    setTeams([...teams, newTeam]);
    setEditingTeamId(newTeam.id);
    setEditedTeam(newTeam);
  };

  const handleDeleteTeam = (teamId: string) => {
    setTeams(teams.filter(t => t.id !== teamId));
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-3">Команды</h1>
          <p className="text-muted-foreground">
            Зарегистрированные команды и их состав
          </p>
        </div>
        <Button onClick={handleAddTeam} className="gap-2">
          <Plus className="w-4 h-4" />
          Добавить команду
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedTeams.map((team, index) => {
          const isEditing = editingTeamId === team.id;
          const displayTeam = isEditing && editedTeam ? editedTeam : team;

          return (
            <Card key={team.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Users className="w-10 h-10 text-primary" />
                  <div className="flex gap-2">
                    {!isEditing && index < 3 && (
                      <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                        Топ {index + 1}
                      </Badge>
                    )}
                  </div>
                </div>
                {isEditing ? (
                  <Input
                    value={displayTeam.name}
                    onChange={(e) => updateTeamField('name', e.target.value)}
                    className="text-xl font-semibold mb-2"
                  />
                ) : (
                  <CardTitle className="text-xl">{displayTeam.name}</CardTitle>
                )}
                {isEditing ? (
                  <Textarea
                    value={displayTeam.description}
                    onChange={(e) => updateTeamField('description', e.target.value)}
                    className="min-h-[60px]"
                  />
                ) : (
                  <CardDescription>{displayTeam.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Очки команды</label>
                    <Input
                      type="number"
                      value={displayTeam.totalPoints}
                      onChange={(e) => updateTeamField('totalPoints', Number(e.target.value))}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-secondary" />
                    <span className="font-semibold text-lg">{displayTeam.totalPoints}</span>
                    <span className="text-sm text-muted-foreground">очков</span>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4 text-secondary" />
                    {isEditing ? (
                      <Input
                        value={displayTeam.coach}
                        onChange={(e) => updateTeamField('coach', e.target.value)}
                        placeholder="Тренер"
                        className="text-sm"
                      />
                    ) : (
                      <span>Тренер: {displayTeam.coach}</span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2 flex items-center justify-between">
                    <span>Участники ({displayTeam.members.length})</span>
                    {isEditing && (
                      <Button size="sm" variant="outline" onClick={handleAddMember}>
                        <Plus className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {displayTeam.members.map((member) => (
                      <div key={member.id}>
                        {isEditing && editingMemberId === member.id && editedMember ? (
                          <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
                            <Input
                              value={editedMember.name}
                              onChange={(e) => updateMemberField('name', e.target.value)}
                              placeholder="Имя"
                              className="text-xs"
                            />
                            <Input
                              value={editedMember.initials}
                              onChange={(e) => updateMemberField('initials', e.target.value)}
                              placeholder="Инициалы"
                              className="w-16 text-xs"
                            />
                            <Input
                              type="number"
                              value={editedMember.age}
                              onChange={(e) => updateMemberField('age', Number(e.target.value))}
                              placeholder="Возраст"
                              className="w-16 text-xs"
                            />
                            <Button size="sm" variant="ghost" onClick={handleSaveMember}>
                              <Save className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-2 bg-muted px-3 py-1 rounded-full">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                                  {member.initials}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs">{member.name}, {member.age}</span>
                            </div>
                            {isEditing && (
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0"
                                  onClick={() => handleEditMember(member)}
                                >
                                  <Edit2 className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 text-destructive"
                                  onClick={() => handleDeleteMember(member.id)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  {isEditing ? (
                    <>
                      <Button size="sm" className="flex-1" onClick={handleSaveTeam}>
                        <Save className="w-4 h-4 mr-1" />
                        Сохранить
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEditTeam(team)}>
                        <Edit2 className="w-4 h-4 mr-1" />
                        Редактировать
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive"
                        onClick={() => handleDeleteTeam(team.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
