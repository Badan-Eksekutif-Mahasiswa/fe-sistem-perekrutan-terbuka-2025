import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui-legacy/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question } from "@/types/registration";
import { cn } from "@/lib/utils";

interface QuestionItemProps {
  question: Question;
  value: string;
  onAnswerChange: (questionId: string, value: string) => void;
  isReadOnly?: boolean;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  value,
  onAnswerChange,
  isReadOnly = false,
}) => {
  // Use value from parent, parse for multiple choice
  const multipleChoiceAnswers = React.useMemo(() => {
    if (question.inputType === "MULTIPLE_CHOICE" && value) {
      try {
        return JSON.parse(value) as string[];
      } catch {
        return [];
      }
    }
    return [];
  }, [value, question.inputType]);

  const handleInputChange = (newValue: string) => {
    onAnswerChange(question.id, newValue);
  };

  const handleMultipleChoiceChange = (
    optionValue: string,
    checked: boolean
  ) => {
    let newAnswers: string[];
    if (checked) {
      newAnswers = [...multipleChoiceAnswers, optionValue];
    } else {
      newAnswers = multipleChoiceAnswers.filter((v) => v !== optionValue);
    }
    onAnswerChange(question.id, JSON.stringify(newAnswers));
  };

  if (question.type === "INFORMATION" && question.inputType === null) {
    return (
      <div className="p-4 rounded-xl bg-blue-100 border-2 border-blue-300">
        <h3 className="font-jakarta font-semibold text-primary-500 mb-2">
          {question.question}
        </h3>
        {question.description && (
          <p className="text-sm text-primary-400">{question.description}</p>
        )}
      </div>
    );
  }
  if (question.type === "INFORMATION" && question.inputType === "BUTTON") {
    return (
      <div className="flex flex-col gap-3">
        <Link className="cursor-pointer" href={question.description || "#"}>
          <Button variant={"secondary"}>{question.question}</Button>
        </Link>
      </div>
    );
  }

  const renderInput = () => {
    switch (question.inputType) {
      case "SHORT_TEXT":
        return (
          <Input
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Masukkan jawaban Anda"
            required={question.isRequired}
            disabled={isReadOnly}
          />
        );

      case "LONG_TEXT":
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Masukkan jawaban Anda"
            required={question.isRequired}
            rows={5}
            disabled={isReadOnly}
            className={cn(
              "px-3 py-2 text-primary-300 focus:ring-2 focus:ring-offset-0 focus:ring-primary-100",
              "flex w-full font-jakarta rounded-xl border-2 font-normal bg-neutral-50",
              "hover:bg-neutral-100 focus:bg-neutral-200 text-p5",
              "placeholder:text-primary-300 focus-visible:outline-none",
              "border-primary-300 hover:border-primary-400 transition-all duration-500",
              "resize-none",
              isReadOnly && "cursor-not-allowed opacity-60"
            )}
          />
        );

      case "NUMBER":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Masukkan angka"
            required={question.isRequired}
            disabled={isReadOnly}
          />
        );

      case "DATE":
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            required={question.isRequired}
            disabled={isReadOnly}
          />
        );

      case "SINGLE_CHOICE":
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <label
                key={option.id}
                className={cn(
                  "flex items-center gap-3 py-2 px-3 rounded-xl border-2 transition-all",
                  isReadOnly
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer",
                  value === option.value
                    ? "border-3 border-primary-400 bg-neutral-50 text-neutral-50"
                    : "border-primary-300 bg-neutral-50"
                )}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleInputChange(e.target.value)}
                  required={question.isRequired}
                  disabled={isReadOnly}
                  className="w-4 h-4 text-secondary-300 focus:ring-secondary-300"
                />
                <span className="text-primary-500 font-jakarta">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        );

      case "MULTIPLE_CHOICE":
        return (
          <div className="space-y-3">
            {question.options.map((option) => {
              const isChecked = multipleChoiceAnswers.includes(option.value);
              return (
                <label
                  key={option.id}
                  className={cn(
                    "flex items-center gap-3 py-2 px-3 rounded-xl border-2 transition-all",
                    isReadOnly
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer",
                    isChecked
                      ? " border-3 border-primary-400 bg-neutral-50 text-neutral-50"
                      : "border-primary-300 bg-neutral-50"
                  )}
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isChecked}
                    onChange={(e) =>
                      handleMultipleChoiceChange(
                        e.target.value,
                        e.target.checked
                      )
                    }
                    disabled={isReadOnly}
                    className="w-4 h-4 text-secondary-300 rounded focus:ring-secondary-300"
                  />
                  <span className="text-primary-500 font-jakarta">
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        );

      case "DROPDOWN":
        return (
          <Select
            value={value}
            onValueChange={handleInputChange}
            disabled={isReadOnly}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih opsi" />
            </SelectTrigger>
            <SelectContent>
              {question.options.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <Label className="text-neutral-50 font-jakarta text-base">
          {question.question}
          {question.isRequired && <span className="text-red-400 ml-1">*</span>}
        </Label>
        {question.description && (
          <p className="text-sm text-neutral-300 mt-1">
            {question.description}
          </p>
        )}
      </div>
      {renderInput()}
    </div>
  );
};
