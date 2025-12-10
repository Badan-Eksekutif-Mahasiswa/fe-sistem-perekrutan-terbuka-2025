"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PersonalInfoForm } from "./components/PersonalInfoForm";
import { QuestionItem } from "./components/QuestionItem";
import { registrationApi } from "@/lib/api/registration";
import Loader from "@/components/elements/Loader";
import {
  Section,
  PersonalInfoData,
  QuestionSectionData,
  AnswerSubmit,
  SelectedDivision,
} from "@/types/registration";
import { toast } from "sonner";
import Image from "next/image";
import Logo from "@/../public/logo-warnai.webp";

export default function RegistrationFormModule() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId") || "";

  const [sections, setSections] = useState<Section[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Refs for debounce timeouts
  const lineTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const answerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Personal Info State
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData | null>(
    null
  );
  const [lineId, setLineId] = useState("");
  const [selectedDivisions, setSelectedDivisions] = useState<
    SelectedDivision[]
  >([]);

  // Question Section State
  const [questionSection, setQuestionSection] =
    useState<QuestionSectionData | null>(null);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());

  const currentSection = sections[currentSectionIndex];
  const isPersonalInfo = currentSection?.id === "personal-info";
  const isLastSection = currentSectionIndex === sections.length - 1;

  // Fetch sections on mount
  useEffect(() => {
    if (eventId) {
      fetchSections();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  // Fetch current section data when section changes
  useEffect(() => {
    if (currentSection) {
      fetchSectionData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const sections = await registrationApi.getSections(eventId);
      setSections(sections);
    } catch (error) {
      toast.error("Gagal memuat daftar section");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSectionData = async () => {
    try {
      setLoading(true);
      const response = await registrationApi.getRegistrationForm(
        eventId,
        currentSection.name
      );

      if (response.success) {
        if (currentSection.id === "personal-info" && response.data.data) {
          const data = response.data.data as PersonalInfoData;
          setPersonalInfo(data);
          setLineId(data.line || "");
          setSelectedDivisions(data.selectedDivisions || []);
        } else if (response.data.questions) {
          const data = response.data as unknown as QuestionSectionData;
          setQuestionSection(data);

          // Pre-fill answers
          const answerMap = new Map<string, string>();
          data.questions.forEach((q) => {
            if (q.answer) {
              answerMap.set(q.id, q.answer);
            }
          });
          setAnswers(answerMap);
        }
      }
    } catch (error) {
      toast.error("Gagal memuat data section");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLineChange = useCallback(
    (value: string) => {
      setLineId(value);

      // Clear previous timeout
      if (lineTimeoutRef.current) {
        clearTimeout(lineTimeoutRef.current);
      }

      // Auto-save with debounce
      lineTimeoutRef.current = setTimeout(async () => {
        try {
          await registrationApi.partialUpdateRegistration({
            eventId,
            section: "personal-info",
            line: value,
          });
        } catch (error) {
          console.error("Auto-save failed:", error);
        }
      }, 1000);
    },
    [eventId]
  );

  const handleDivisionSelect = useCallback(
    (divisionId: string, priority: number) => {
      setSelectedDivisions((prev) => {
        const newDivisions = prev.filter((d) => d.divisionId !== divisionId);

        const division = personalInfo?.availableDivisions.find(
          (d) => d.id === divisionId
        );

        if (division) {
          newDivisions.push({
            divisionId,
            divisionName: division.name,
            priority,
          });
        }

        newDivisions.sort((a, b) => a.priority - b.priority);
        return newDivisions;
      });
    },
    [personalInfo]
  );

  const handleAnswerChange = useCallback(
    (questionId: string, value: string) => {
      setAnswers((prevAnswers) => {
        // Only update if the value actually changed
        if (prevAnswers.get(questionId) === value) {
          return prevAnswers;
        }
        const newAnswers = new Map(prevAnswers);
        newAnswers.set(questionId, value);
        return newAnswers;
      });

      // Clear previous timeout
      if (answerTimeoutRef.current) {
        clearTimeout(answerTimeoutRef.current);
      }

      // Auto-save with debounce
      answerTimeoutRef.current = setTimeout(async () => {
        if (currentSection) {
          try {
            await registrationApi.partialUpdateRegistration({
              eventId,
              section: currentSection.name,
              answers: [{ questionId, value }],
            });
          } catch (error) {
            console.error("Auto-save failed:", error);
          }
        }
      }, 1000);
    },
    [eventId, currentSection]
  );

  const validateCurrentSection = (): boolean => {
    if (isPersonalInfo) {
      if (!lineId.trim()) {
        toast.error("ID Line harus diisi");
        return false;
      }
      if (
        selectedDivisions.length === 0 ||
        (personalInfo &&
          selectedDivisions.length > personalInfo.maxChooseDivision)
      ) {
        toast.error(`Pilih ${personalInfo?.maxChooseDivision || 1} divisi`);
        return false;
      }
      return true;
    } else if (questionSection) {
      const requiredQuestions = questionSection.questions.filter(
        (q) => q.isRequired && q.type === "INPUT"
      );

      for (const question of requiredQuestions) {
        const answer = answers.get(question.id);
        if (!answer || answer.trim() === "") {
          toast.error(`Pertanyaan "${question.question}" harus diisi`);
          return false;
        }
      }
      return true;
    }
    return true;
  };

  const submitCurrentSection = async () => {
    if (!validateCurrentSection()) return;

    try {
      setSubmitting(true);

      if (isPersonalInfo) {
        await registrationApi.updateRegistration({
          eventId,
          section: "personal-info",
          line: lineId,
          divisions: selectedDivisions.map((d) => d.divisionId),
        });
      } else {
        const answerArray: AnswerSubmit[] = Array.from(answers.entries()).map(
          ([questionId, value]) => ({
            questionId,
            value,
          })
        );

        await registrationApi.updateRegistration({
          eventId,
          section: currentSection.name,
          answers: answerArray,
        });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal menyimpan data"
      );
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = async () => {
    try {
      await submitCurrentSection();

      if (!isLastSection) {
        setCurrentSectionIndex((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.success("Pendaftaran berhasil diselesaikan!");
        // Redirect or show success page
      }
    } catch {
      // Error already handled in submitCurrentSection
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-primary-500 relative overflow-hidden">

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Progress Tabs */}
        <div className="mb-8 bg-primary-400/30 backdrop-blur-sm rounded-xl p-1 flex gap-1 overflow-x-auto">
          {sections.map((section, index) => (
            <button
              key={`${section.id}-${index}`}
              onClick={() => setCurrentSectionIndex(index)}
              disabled={index > currentSectionIndex}
              className={`
                flex-shrink-0 px-4 py-2 rounded-lg font-jakarta text-sm font-medium transition-all
                ${
                  index === currentSectionIndex
                    ? "bg-secondary-300 text-primary-500"
                    : index < currentSectionIndex
                    ? "bg-primary-300/50 text-neutral-100 hover:bg-primary-300/70"
                    : "bg-transparent text-neutral-300 cursor-not-allowed"
                }
              `}
            >
              {section.name === "personal-info"
                ? "Personal Info"
                : section.name}
            </button>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-primary-400/40 backdrop-blur-md rounded-2xl border-2 border-primary-300/50 p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-jakarta font-bold text-neutral-100 mb-2">
              {isPersonalInfo
                ? "Staff Semarak Apresiasi 2026"
                : questionSection?.title || currentSection?.name}
            </h2>
            <p className="text-neutral-200 text-sm">
              {isPersonalInfo
                ? "Lengkapi form registrasi berikut"
                : questionSection?.description}
            </p>
          </div>

          <div className="space-y-6">
            {isPersonalInfo && personalInfo ? (
              <PersonalInfoForm
                data={personalInfo}
                onLineChange={handleLineChange}
                onDivisionSelect={handleDivisionSelect}
              />
            ) : questionSection ? (
              questionSection.questions.map((question) => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  value={answers.get(question.id) || ""}
                  onAnswerChange={handleAnswerChange}
                />
              ))
            ) : null}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-primary-300/30">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentSectionIndex === 0 || submitting}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <Button
              variant="secondary"
              onClick={handleNext}
              disabled={submitting}
            >
              {submitting ? "Menyimpan..." : isLastSection ? "Submit" : "Next"}
              {!isLastSection && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-16 border-t border-primary-400/30 bg-primary-500/80 backdrop-blur-sm py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-neutral-300 text-sm font-jakarta">
            © BEM Multimedia BEM UI 2025. All Rights Reserved
          </p>
          <p className="text-neutral-400 text-xs mt-1">
            Badan Eksekutif Mahasiswa UI 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
