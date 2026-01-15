import { useState } from "react";
import { Plus, Edit2, Save, Trash2, X, FileText, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

interface HeatName {
  id: string;
  name: string;
  stage: string;
  order: number;
}

interface AgeCategory {
  id: string;
  groupName: string;
  minAge: number;
  maxAge: number;
}

const initialHeatNames: HeatName[] = [
  { id: "1", name: "Заплыв 1", stage: "Предварительный этап", order: 1 },
  { id: "2", name: "Заплыв 2", stage: "Предварительный этап", order: 2 },
  { id: "3", name: "Полуфинал А", stage: "Полуфинал", order: 3 },
  { id: "4", name: "Полуфинал Б", stage: "Полуфинал", order: 4 },
  { id: "5", name: "Финал А", stage: "Финал", order: 5 },
  { id: "6", name: "Финал Б", stage: "Финал", order: 6 },
];

const initialAgeCategories: AgeCategory[] = [
  { id: "1", groupName: "Юниоры", minAge: 12, maxAge: 17 },
  { id: "2", groupName: "Молодежь", minAge: 18, maxAge: 25 },
  { id: "3", groupName: "Взрослые", minAge: 26, maxAge: 35 },
  { id: "4", groupName: "Мастера", minAge: 36, maxAge: 50 },
  { id: "5", groupName: "Ветераны", minAge: 51, maxAge: 100 },
];

export function RegulationsPage() {
  const [heatNames, setHeatNames] = useState<HeatName[]>(initialHeatNames);
  const [ageCategories, setAgeCategories] = useState<AgeCategory[]>(initialAgeCategories);
  
  const [editingHeatId, setEditingHeatId] = useState<string | null>(null);
  const [editedHeat, setEditedHeat] = useState<HeatName | null>(null);
  
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editedCategory, setEditedCategory] = useState<AgeCategory | null>(null);

  // Heat Names handlers
  const handleEditHeat = (heat: HeatName) => {
    setEditingHeatId(heat.id);
    setEditedHeat({ ...heat });
  };

  const handleSaveHeat = () => {
    if (editedHeat) {
      setHeatNames(heatNames.map(h => h.id === editedHeat.id ? editedHeat : h));
      setEditingHeatId(null);
      setEditedHeat(null);
    }
  };

  const handleDeleteHeat = (id: string) => {
    setHeatNames(heatNames.filter(h => h.id !== id));
  };

  const handleAddHeat = () => {
    const newHeat: HeatName = {
      id: String(Date.now()),
      name: "",
      stage: "",
      order: heatNames.length + 1
    };
    setHeatNames([...heatNames, newHeat]);
    setEditingHeatId(newHeat.id);
    setEditedHeat(newHeat);
  };

  const updateHeatField = (field: keyof HeatName, value: any) => {
    if (editedHeat) {
      setEditedHeat({ ...editedHeat, [field]: value });
    }
  };

  // Age Categories handlers
  const handleEditCategory = (category: AgeCategory) => {
    setEditingCategoryId(category.id);
    setEditedCategory({ ...category });
  };

  const handleSaveCategory = () => {
    if (editedCategory) {
      setAgeCategories(ageCategories.map(c => c.id === editedCategory.id ? editedCategory : c));
      setEditingCategoryId(null);
      setEditedCategory(null);
    }
  };

  const handleDeleteCategory = (id: string) => {
    setAgeCategories(ageCategories.filter(c => c.id !== id));
  };

  const handleAddCategory = () => {
    const newCategory: AgeCategory = {
      id: String(Date.now()),
      groupName: "",
      minAge: 0,
      maxAge: 0
    };
    setAgeCategories([...ageCategories, newCategory]);
    setEditingCategoryId(newCategory.id);
    setEditedCategory(newCategory);
  };

  const updateCategoryField = (field: keyof AgeCategory, value: any) => {
    if (editedCategory) {
      setEditedCategory({ ...editedCategory, [field]: value });
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="mb-12">
        <h1 className="mb-3">Регламент</h1>
        <p className="text-muted-foreground">
          Настройка названий заплывов и возрастных категорий
        </p>
      </div>

      <Tabs defaultValue="heats" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="heats">
            <FileText className="w-4 h-4 mr-2" />
            Названия заплывов
          </TabsTrigger>
          <TabsTrigger value="ages">
            <Users className="w-4 h-4 mr-2" />
            Возрастные категории
          </TabsTrigger>
        </TabsList>

        <TabsContent value="heats" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Названия заплывов</CardTitle>
                  <CardDescription>
                    Настройте названия заплывов по этапам соревнований
                  </CardDescription>
                </div>
                <Button onClick={handleAddHeat} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Добавить
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {heatNames.sort((a, b) => a.order - b.order).map((heat) => (
                  <div key={heat.id} className="p-4 border rounded-lg hover:bg-muted/20">
                    {editingHeatId === heat.id && editedHeat ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Порядок</label>
                            <Input
                              type="number"
                              value={editedHeat.order}
                              onChange={(e) => updateHeatField('order', Number(e.target.value))}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Название</label>
                            <Input
                              value={editedHeat.name}
                              onChange={(e) => updateHeatField('name', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Этап</label>
                            <Input
                              value={editedHeat.stage}
                              onChange={(e) => updateHeatField('stage', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSaveHeat}>
                            <Save className="w-4 h-4 mr-1" />
                            Сохранить
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => {
                              setEditingHeatId(null);
                              setEditedHeat(null);
                            }}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Отмена
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                            {heat.order}
                          </div>
                          <div>
                            <h3 className="font-semibold">{heat.name}</h3>
                            <p className="text-sm text-muted-foreground">{heat.stage}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditHeat(heat)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive"
                            onClick={() => handleDeleteHeat(heat.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ages" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Возрастные категории</CardTitle>
                  <CardDescription>
                    Настройте возрастные группы и их ограничения
                  </CardDescription>
                </div>
                <Button onClick={handleAddCategory} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Добавить
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ageCategories.map((category) => (
                  <div key={category.id} className="p-4 border rounded-lg hover:bg-muted/20">
                    {editingCategoryId === category.id && editedCategory ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Название группы</label>
                            <Input
                              value={editedCategory.groupName}
                              onChange={(e) => updateCategoryField('groupName', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Мин. возраст</label>
                            <Input
                              type="number"
                              value={editedCategory.minAge}
                              onChange={(e) => updateCategoryField('minAge', Number(e.target.value))}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Макс. возраст</label>
                            <Input
                              type="number"
                              value={editedCategory.maxAge}
                              onChange={(e) => updateCategoryField('maxAge', Number(e.target.value))}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSaveCategory}>
                            <Save className="w-4 h-4 mr-1" />
                            Сохранить
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => {
                              setEditingCategoryId(null);
                              setEditedCategory(null);
                            }}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Отмена
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                            <Users className="w-6 h-6 text-secondary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{category.groupName}</h3>
                            <p className="text-sm text-muted-foreground">
                              {category.minAge} - {category.maxAge} лет
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditCategory(category)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
