import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PersonalInfoData } from "@/types/registration";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PersonalInfoFormProps {
  data: PersonalInfoData;
  onLineChange: (value: string) => void;
  onDivisionSelect: (divisionId: string, priority: number) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  onLineChange,
  onDivisionSelect,
}) => {
  const [selectedDivisions, setSelectedDivisions] = React.useState<string[]>(
    data.selectedDivisions.map((d) => d.divisionId)
  );

  // Sync local state with parent state when data.selectedDivisions changes
  React.useEffect(() => {
    setSelectedDivisions(data.selectedDivisions.map((d) => d.divisionId));
  }, [data.selectedDivisions]);

  const handleDivisionSelect = (divisionId: string, priority: number) => {
    const newSelected = [...selectedDivisions];

    // Replace the division at the given priority index
    newSelected[priority - 1] = divisionId;

    setSelectedDivisions(newSelected);
    onDivisionSelect(divisionId, priority);
  };

  return (
    <div className="space-y-6">
      {/* Personal Information Fields */}
      <div className="space-y-4">
        <Input
          label="Nama"
          value={data.name}
          disabled
          className="cursor-not-allowed"
        />

        <Input
          label="NPM"
          value={data.npm}
          disabled
          className="cursor-not-allowed"
        />

        <Input
          label="Fakultas"
          value={data.faculty}
          disabled
          className="cursor-not-allowed"
        />

        <Input
          label="Jurusan"
          value={data.studyProgram}
          disabled
          className="cursor-not-allowed"
        />

        <Input
          label="Email"
          value={data.email}
          disabled
          className="cursor-not-allowed"
        />

        <Input
          label="Line"
          value={data.line}
          onChange={(e) => onLineChange(e.target.value)}
          placeholder="Masukkan ID Line Anda"
        />
      </div>

      {/* Division Selection */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: data.maxChooseDivision }).map((_, index) => {
            const priority = index + 1;
            const selectedDivisionId = selectedDivisions[index] || "";

            // Filter out already selected divisions from other selects
            const availableOptions = data.availableDivisions.filter(
              (division) =>
                !selectedDivisions.includes(division.id) ||
                division.id === selectedDivisionId
            );

            return (
              <div key={priority} className="space-y-2 w-full">
                <Label className="text-neutral-50 font-jakarta text-sm">
                  Pilihan Divisi {priority}
                </Label>
                <Select
                  value={selectedDivisionId}
                  onValueChange={(value) =>
                    handleDivisionSelect(value, priority)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={`Pilih divisi prioritas ${priority}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableOptions.map((division) => (
                      <SelectItem key={division.id} value={division.id}>
                        {division.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
