"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Loader from "@/components/elements/Loader";
import { SubmitConfirmationDialog } from "./components/SubmitConfirmationDialog";
import { registrationApi } from "@/lib/api/registration";
import { useRequireRole } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import type { Division, Event, SubmissionRequirement } from "@/types/event";
import type { RegistrationPayload } from "@/types/registration";

type RegistrationFormModuleProps = {
  event: Event;
};

type FormState = {
  contactEmail: string;
  whatsappNumber: string;
  lineId: string;
  divisionChoices: string[];
  submissionLinks: Record<string, string>;
};

const emptyForm: FormState = {
  contactEmail: "",
  whatsappNumber: "",
  lineId: "",
  divisionChoices: [],
  submissionLinks: {},
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function RegistrationFormModule({
  event: initialEvent,
}: RegistrationFormModuleProps) {
  const router = useRouter();
  const { show } = useToast();
  const { user, isLoading: authLoading, isAuthorized } = useRequireRole(
    ["APPLICANT"],
    "/login",
    "/"
  );

  const [event, setEvent] = useState<Event>(initialEvent);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [hasDraft, setHasDraft] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  const maxChoices = event.maxDivisionChoices || 1;

  const selectedDivisions = useMemo(
    () =>
      form.divisionChoices
        .map((divisionId) =>
          event.divisions.find((division) => division.id === divisionId)
        )
        .filter((division): division is Division => Boolean(division)),
    [event.divisions, form.divisionChoices]
  );

  const relevantRequirements = useMemo(() => {
    const eventRequirements = event.requirements || [];
    const divisionRequirements = selectedDivisions.flatMap(
      (division) => division.requirements || []
    );

    return [...eventRequirements, ...divisionRequirements].sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      return a.title.localeCompare(b.title);
    });
  }, [event.requirements, selectedDivisions]);

  useEffect(() => {
    if (!user || !isAuthorized) return;

    const loadRegistrationForm = async () => {
      try {
        setLoading(true);
        const response = await registrationApi.getRegistrationForm(
          initialEvent.id
        );
        const data = response.data;
        const draft = data.draft;

        setEvent(data.event);
        setHasDraft(Boolean(draft));

        if (draft) {
          setForm({
            contactEmail: draft.contactEmail || user.email || "",
            whatsappNumber: draft.whatsappNumber || "",
            lineId: draft.lineId || "",
            divisionChoices: draft.choices
              .slice()
              .sort((a, b) => a.choiceOrder - b.choiceOrder)
              .map((choice) => choice.divisionId),
            submissionLinks: Object.fromEntries(
              draft.submissionLinks.map((link) => [
                link.requirementId,
                link.submittedUrl,
              ])
            ),
          });
          return;
        }

        if (data.hasRegistration) {
          const statusResponse = await registrationApi.getApplicationStatus(
            initialEvent.id
          );
          const registration = statusResponse.data.registration;
          setIsSubmitted(Boolean(registration && registration.status !== "DRAFT"));

          if (registration) {
            setForm({
              contactEmail: registration.contactEmail || user.email || "",
              whatsappNumber: registration.whatsappNumber || "",
              lineId: registration.lineId || "",
              divisionChoices: registration.choices
                .slice()
                .sort((a, b) => a.choiceOrder - b.choiceOrder)
                .map((choice) => choice.divisionId),
              submissionLinks: Object.fromEntries(
                registration.submissionLinks.map((link) => [
                  link.requirementId,
                  link.submittedUrl,
                ])
              ),
            });
            return;
          }
        }

        setForm((current) => ({
          ...current,
          contactEmail: user.email || "",
        }));
      } catch (error) {
        show(
          "error",
          getErrorMessage(error, "Gagal memuat form pendaftaran")
        );
      } finally {
        setLoading(false);
      }
    };

    loadRegistrationForm();
  }, [initialEvent.id, isAuthorized, show, user]);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const toggleDivision = (divisionId: string) => {
    if (isSubmitted) return;

    setForm((current) => {
      const isSelected = current.divisionChoices.includes(divisionId);
      const divisionChoices = isSelected
        ? current.divisionChoices.filter((id) => id !== divisionId)
        : [...current.divisionChoices, divisionId].slice(0, maxChoices);

      const relevantRequirementIds = new Set([
        ...(event.requirements || []).map((requirement) => requirement.id),
        ...divisionChoices.flatMap((id) => {
          const division = event.divisions.find((item) => item.id === id);
          return (division?.requirements || []).map(
            (requirement) => requirement.id
          );
        }),
      ]);

      return {
        ...current,
        divisionChoices,
        submissionLinks: Object.fromEntries(
          Object.entries(current.submissionLinks).filter(([requirementId]) =>
            relevantRequirementIds.has(requirementId)
          )
        ),
      };
    });
  };

  const updateSubmissionLink = (requirementId: string, value: string) => {
    setForm((current) => ({
      ...current,
      submissionLinks: {
        ...current.submissionLinks,
        [requirementId]: value,
      },
    }));
  };

  const buildPayload = (): RegistrationPayload => ({
    eventId: event.id,
    contactEmail: form.contactEmail.trim().toLowerCase(),
    whatsappNumber: form.whatsappNumber.trim() || null,
    lineId: form.lineId.trim() || null,
    divisionChoices: form.divisionChoices,
    submissionLinks: relevantRequirements
      .map((requirement) => ({
        requirementId: requirement.id,
        submittedUrl: (form.submissionLinks[requirement.id] || "").trim(),
      }))
      .filter((link) => link.submittedUrl !== ""),
  });

  const validateForSubmit = () => {
    if (!isValidEmail(form.contactEmail.trim())) {
      show("error", "Email kontak harus valid");
      return false;
    }

    if (!form.lineId.trim()) {
      show("error", "Line ID wajib diisi");
      return false;
    }

    if (form.divisionChoices.length === 0) {
      show("error", "Pilih minimal satu divisi");
      return false;
    }

    if (form.divisionChoices.length > maxChoices) {
      show("error", `Maksimal pilih ${maxChoices} divisi`);
      return false;
    }

    for (const requirement of relevantRequirements) {
      const submittedUrl = (form.submissionLinks[requirement.id] || "").trim();
      if (requirement.isRequired && !submittedUrl) {
        show("error", `${requirement.title} wajib diisi`);
        return false;
      }
      if (submittedUrl && !isValidUrl(submittedUrl)) {
        show("error", `${requirement.title} harus berupa URL valid`);
        return false;
      }
    }

    return true;
  };

  const handleSaveDraft = async () => {
    if (isSubmitted) return;

    try {
      setSaving(true);
      const payload = buildPayload();

      if (hasDraft) {
        await registrationApi.updateRegistration(payload);
      } else {
        await registrationApi.createRegistration(payload);
        setHasDraft(true);
      }

      show("success", "Draft pendaftaran tersimpan");
    } catch (error) {
      show(
        "error",
        getErrorMessage(error, "Gagal menyimpan draft pendaftaran")
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitRegistration = async () => {
    if (!validateForSubmit()) return;

    try {
      setSubmitting(true);
      await registrationApi.submitRegistration(buildPayload());
      setShowSubmitDialog(false);
      show("success", "Pendaftaran berhasil dikirim");
      router.push("/dashboard");
    } catch (error) {
      show(
        "error",
        getErrorMessage(error, "Gagal submit pendaftaran")
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return <Loader />;
  }

  if (!user || !isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] px-4 py-24 text-white md:px-8">
      <main className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.4fr]">
        <aside className="h-fit rounded-lg border border-white/10 bg-white/[0.06] p-5">
          <p className="text-p5 uppercase tracking-normal text-secondary-100">
            Form Pendaftaran
          </p>
          <h1 className="mt-2 text-h3">{event.title}</h1>
          <div className="mt-5 grid gap-3 text-p5 text-white/70">
            <InfoRow label="Nama" value={user.name} />
            <InfoRow label="NPM" value={user.npm || "-"} />
            <InfoRow label="Fakultas" value={user.faculty || "-"} />
            <InfoRow label="Program Studi" value={user.studyProgram || "-"} />
          </div>
          <div className="mt-5 rounded-md border border-secondary-200/30 bg-secondary-300/10 px-4 py-3 text-p5 text-secondary-100">
            Maksimal pilihan divisi: {maxChoices}
          </div>
          {isSubmitted && (
            <div className="mt-3 rounded-md border border-green-200/30 bg-green-300/15 px-4 py-3 text-p5 text-green-100">
              Pendaftaran sudah disubmit dan tidak bisa diubah.
            </div>
          )}
        </aside>

        <section className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
          <div className="grid gap-5">
            <section>
              <h2 className="text-h4">Kontak Pendaftar</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Email Kontak" required>
                  <input
                    disabled={isSubmitted}
                    type="email"
                    value={form.contactEmail}
                    onChange={(event) =>
                      updateField("contactEmail", event.target.value)
                    }
                    className="w-full rounded-md border border-primary-300 bg-white px-3 py-2 text-neutral-900"
                    placeholder="nama@email.com"
                  />
                </Field>
                <Field label="Nomor WhatsApp">
                  <input
                    disabled={isSubmitted}
                    type="text"
                    value={form.whatsappNumber}
                    onChange={(event) =>
                      updateField("whatsappNumber", event.target.value)
                    }
                    className="w-full rounded-md border border-primary-300 bg-white px-3 py-2 text-neutral-900"
                    placeholder="081234567890"
                  />
                </Field>
                <Field label="Line ID" required>
                  <input
                    disabled={isSubmitted}
                    type="text"
                    value={form.lineId}
                    onChange={(event) =>
                      updateField("lineId", event.target.value)
                    }
                    className="w-full rounded-md border border-primary-300 bg-white px-3 py-2 text-neutral-900"
                    placeholder="line_id"
                  />
                </Field>
              </div>
            </section>

            <section>
              <h2 className="text-h4">Pilihan Divisi</h2>
              <div className="mt-4 grid gap-3">
                {event.divisions.map((division, index) => {
                  const choiceIndex = form.divisionChoices.indexOf(division.id);
                  const isSelected = choiceIndex >= 0;
                  const disableNewChoice =
                    !isSelected && form.divisionChoices.length >= maxChoices;

                  return (
                    <button
                      key={division.id}
                      type="button"
                      disabled={isSubmitted || disableNewChoice}
                      onClick={() => toggleDivision(division.id)}
                      className={`rounded-md border p-4 text-left transition ${
                        isSelected
                          ? "border-secondary-200 bg-secondary-300/15"
                          : "border-white/10 bg-white/[0.04] hover:border-primary-200"
                      } ${
                        disableNewChoice
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-p4 font-bold">{division.name}</p>
                          <p className="mt-1 text-p5 text-white/65">
                            {division.description || "Tidak ada deskripsi."}
                          </p>
                        </div>
                        {isSelected && (
                          <span className="rounded-md bg-secondary-200 px-2.5 py-1 text-p6 font-semibold text-primary-500">
                            Pilihan {choiceIndex + 1}
                          </span>
                        )}
                      </div>
                      {index === 0 && form.divisionChoices.length === 0 && (
                        <p className="mt-3 text-p6 text-yellow-100">
                          Minimal pilih satu divisi.
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="text-h4">Berkas dan Link</h2>
              <div className="mt-4 grid gap-4">
                {relevantRequirements.length === 0 ? (
                  <p className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-p5 text-white/65">
                    Belum ada requirement untuk event/divisi yang dipilih.
                  </p>
                ) : (
                  relevantRequirements.map((requirement) => (
                    <RequirementField
                      key={requirement.id}
                      requirement={requirement}
                      value={form.submissionLinks[requirement.id] || ""}
                      disabled={isSubmitted}
                      onChange={(value) =>
                        updateSubmissionLink(requirement.id, value)
                      }
                    />
                  ))
                )}
              </div>
            </section>

            <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
              {!isSubmitted && (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={saving || submitting}
                    onClick={handleSaveDraft}
                  >
                    {saving ? "Menyimpan..." : "Simpan Draft"}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={saving || submitting}
                    onClick={() => setShowSubmitDialog(true)}
                  >
                    Submit Pendaftaran
                  </Button>
                </>
              )}
              {isSubmitted && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.push("/dashboard")}
                >
                  Kembali ke Dashboard
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>

      <SubmitConfirmationDialog
        open={showSubmitDialog}
        onOpenChange={setShowSubmitDialog}
        onConfirm={handleSubmitRegistration}
        loading={submitting}
      />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-p6 text-white/45">{label}</p>
      <p className="text-p5 font-semibold text-white">{value}</p>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-p5 font-semibold">
        {label}
        {required && <span className="text-red-100"> *</span>}
      </span>
      {children}
    </label>
  );
}

function RequirementField({
  requirement,
  value,
  disabled,
  onChange,
}: {
  requirement: SubmissionRequirement;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-p4 font-bold">
            {requirement.title}
            {requirement.isRequired && (
              <span className="ml-1 text-red-100">*</span>
            )}
          </p>
          <p className="mt-1 text-p5 text-white/65">
            {requirement.instruction}
          </p>
        </div>
        <span className="w-fit rounded-md border border-primary-200/30 px-2.5 py-1 text-p6 text-primary-100">
          {requirement.scope === "EVENT" ? "Umum" : "Divisi"}
        </span>
      </div>
      {requirement.templateUrl && (
        <a
          className="mt-3 inline-block text-p5 text-secondary-100 underline"
          href={requirement.templateUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buka template
        </a>
      )}
      <input
        disabled={disabled}
        type="url"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 w-full rounded-md border border-primary-300 bg-white px-3 py-2 text-neutral-900"
        placeholder="https://drive.google.com/..."
      />
    </div>
  );
}
