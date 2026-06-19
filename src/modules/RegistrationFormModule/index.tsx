"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PersonalInfoForm } from "./components/PersonalInfoForm";
import { QuestionItem } from "./components/QuestionItem";
import { SubmitConfirmationDialog } from "./components/SubmitConfirmationDialog";
import { registrationApi } from "@/lib/api/registration";
import Loader from "@/components/elements/Loader";
import { useRouter } from "next/navigation";
import {
  Section,
  PersonalInfoData,
  QuestionSectionData,
  AnswerSubmit,
  SelectedDivision,
} from "@/types/registration";
import { useToast } from "@/hooks/useToast";
import { Event } from "@/types/event";

type RegistrationFormModuleProps = {
  event: Event;
};

export default function RegistrationFormModule({
  event,
}: RegistrationFormModuleProps) {
  const router = useRouter();
  const eventId = event.id;
  const toast = useToast();

  const [sections, setSections] = useState<Section[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const fetchApplicationStatus = async () => {
    try {
      const response = await registrationApi.getApplicationStatus(eventId);
      if (response.success && response.data.hasRegistration) {
        setIsSubmitted(response.data.registration?.status !== "DRAFT");
      }
    } catch (error) {
      console.error("Failed to fetch application status:", error);
    }
  };

  const fetchSections = async () => {
    try {
      setLoading(true);
      await fetchApplicationStatus();
      const sections = await registrationApi.getSections(eventId);
      setSections(sections);
    } catch (error) {
      toast.show("error", "Gagal memuat daftar section");
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
      toast.show("error", "Gagal memuat data section");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLineChange = useCallback(
    (value: string) => {
      if (isSubmitted) return;

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
    [eventId, isSubmitted]
  );

  const handleDivisionSelect = useCallback(
    (divisionId: string, priority: number) => {
      if (isSubmitted) return;

      setSelectedDivisions((prev) => {
        // Remove any division with the same priority (replacement)
        const newDivisions = prev.filter((d) => d.priority !== priority);

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

        // Auto-save with debounce
        if (lineTimeoutRef.current) {
          clearTimeout(lineTimeoutRef.current);
        }

        lineTimeoutRef.current = setTimeout(async () => {
          try {
            await registrationApi.partialUpdateRegistration({
              eventId,
              section: "personal-info",
              divisions: newDivisions.map((d) => d.divisionId),
            });
          } catch (error) {
            console.error("Auto-save divisions failed:", error);
          }
        }, 1000);

        return newDivisions;
      });
    },
    [personalInfo, eventId, isSubmitted]
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
        toast.show("error", "ID Line harus diisi");
        return false;
      }
      if (
        selectedDivisions.length === 0 ||
        (personalInfo &&
          selectedDivisions.length > personalInfo.maxDivisionChoices)
      ) {
        toast.show(
          "error",
          `Pilih ${personalInfo?.maxDivisionChoices || 1} divisi`
        );
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
          toast.show("error", `Pertanyaan "${question.question}" harus diisi`);
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
      toast.show(
        "error",
        error instanceof Error ? error.message : "Gagal menyimpan data"
      );
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = async () => {
    // Jika sudah submitted, hanya navigasi tanpa save
    if (isSubmitted) {
      if (!isLastSection) {
        setCurrentSectionIndex((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Jika belum submitted, validasi dan save
    try {
      await submitCurrentSection();

      if (!isLastSection) {
        setCurrentSectionIndex((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Tampilkan dialog konfirmasi di section terakhir
        setShowSubmitDialog(true);
      }
    } catch {
      // Error already handled in submitCurrentSection
    }
  };

  const handleFinalSubmit = async () => {
    try {
      setSubmitting(true);
      // TODO: Call API endpoint POST /registration/submit
      await registrationApi.submitRegistration(eventId);

      setShowSubmitDialog(false);
      toast.show("success", "Pendaftaran berhasil diselesaikan!");
      router.push("/dashboard");
    } catch (error) {
      toast.show(
        "error",
        error instanceof Error ? error.message : "Gagal submit pendaftaran"
      );
    } finally {
      setSubmitting(false);
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
    <div className="min-h-screen relative overflow-hidden pt-20">
      {/* Main Content */}
      <main className="relative grid grid-cols-[1.3fr_4fr] max-lg:grid-cols-1 max-lg:gap-4 gap-10 z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Progress Tabs */}
        <div className="bg-gradient-card-blur rounded-xl flex flex-col gap-2 h-fit p-3 overflow-x-auto">
          {sections.map((section, index) => (
            <Button
              key={`${section.id}-${index}`}
              onClick={() => setCurrentSectionIndex(index)}
              disabled={index > currentSectionIndex}
              variant={"secondary"}
              className={`
                ${
                  index === currentSectionIndex
                    ? ""
                    : index < currentSectionIndex
                    ? "bg-secondary-300/50 hover:bg-secondary-300/70"
                    : "bg-transparent text-neutral-300 cursor-not-allowed"
                }
              `}
            >
              {section.name === "personal-info"
                ? "Personal Info"
                : section.name}
            </Button>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-gradient-card-blur backdrop-blur-md rounded-2xl p-8 shadow-2xl">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-jakarta font-bold text-neutral-100">
                {isPersonalInfo
                  ? "Staff Semarak Apresiasi 2026"
                  : questionSection?.title || currentSection?.name}
              </h2>
              {isSubmitted && (
                <Button className="cursor-default" variant={"ghost"}>
                  Submitted
                </Button>
              )}
            </div>
            <p className="text-neutral-200 text-sm">
              {isPersonalInfo
                ? isSubmitted
                  ? "Formulir Anda telah di-submit. Data tidak dapat diubah."
                  : "Lengkapi form registrasi berikut"
                : questionSection?.description}
            </p>
          </div>

          <div className="space-y-6">
            {isPersonalInfo && personalInfo ? (
              <PersonalInfoForm
                data={{ ...personalInfo, line: lineId, selectedDivisions }}
                onLineChange={handleLineChange}
                onDivisionSelect={handleDivisionSelect}
                isReadOnly={isSubmitted}
              />
            ) : questionSection ? (
              questionSection.questions.map((question) => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  value={answers.get(question.id) || ""}
                  onAnswerChange={handleAnswerChange}
                  isReadOnly={isSubmitted}
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

            {/* Hide Next/Submit button only on last section when already submitted */}
            {!(isSubmitted && isLastSection) && (
              <Button
                variant="secondary"
                onClick={handleNext}
                disabled={submitting}
              >
                {submitting
                  ? "Menyimpan..."
                  : isLastSection
                  ? "Submit"
                  : "Next"}
                {!isLastSection && <ChevronRight className="w-4 h-4 ml-1" />}
              </Button>
            )}
          </div>
        </div>
      </main>

      {/* Submit Confirmation Dialog */}
      <SubmitConfirmationDialog
        open={showSubmitDialog}
        onOpenChange={setShowSubmitDialog}
        onConfirm={handleFinalSubmit}
        loading={submitting}
      />
    </div>
  );
}
