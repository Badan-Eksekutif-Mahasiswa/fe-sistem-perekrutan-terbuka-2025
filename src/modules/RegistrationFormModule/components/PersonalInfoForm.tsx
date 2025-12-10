import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PersonalInfoData } from "@/types/registration";
import { cn } from "@/lib/utils";

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

  const handleDivisionClick = (divisionId: string) => {
    let newSelected = [...selectedDivisions];

    if (newSelected.includes(divisionId)) {
      // Remove division
      newSelected = newSelected.filter((id) => id !== divisionId);
    } else {
      // Add division if under max limit
      if (newSelected.length < data.maxChooseDivision) {
        newSelected.push(divisionId);
      } else {
        return; // Don't add if max reached
      }
    }

    setSelectedDivisions(newSelected);

    // Update with priorities
    newSelected.forEach((id, index) => {
      onDivisionSelect(id, index + 1);
    });
  };

  const getDivisionPriority = (divisionId: string) => {
    const index = selectedDivisions.indexOf(divisionId);
    return index !== -1 ? index + 1 : null;
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
      <div className="space-y-4">
        <div>
          <Label className="text-neutral-50 font-jakarta">Pilihan Divisi</Label>
          <p className="text-xs text-neutral-300 mt-1">
            Pilih maksimal {data.maxChooseDivision} divisi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.availableDivisions.map((division) => {
            const isSelected = selectedDivisions.includes(division.id);
            const priority = getDivisionPriority(division.id);

            return (
              <div
                key={division.id}
                onClick={() => handleDivisionClick(division.id)}
                className={cn(
                  "relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                  "hover:shadow-lg",
                  isSelected
                    ? "border-secondary-300 bg-gradient-to-r from-secondary-100/20 to-secondary-200/20"
                    : "border-primary-300 bg-neutral-50 hover:border-primary-400 hover:bg-neutral-100"
                )}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-secondary-300 flex items-center justify-center">
                    <span className="text-primary-500 font-bold text-sm">
                      {priority}
                    </span>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="font-jakarta font-semibold text-primary-500">
                    {division.name}
                  </h3>
                  <p className="text-sm text-primary-400">
                    {division.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 flex-wrap">
          {selectedDivisions.map((divId, index) => {
            const division = data.availableDivisions.find(
              (d) => d.id === divId
            );
            if (!division) return null;

            return (
              <div
                key={divId}
                className="px-3 py-1.5 rounded-lg bg-secondary-200 text-primary-500 text-sm font-medium"
              >
                Pilihan {index + 1}: {division.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
