import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { getEventById } from "@/lib/api/event";
import RegistrationFormModule from "@/modules/RegistrationFormModule";
import Loader from "@/components/elements/Loader";
import ProtectedRoute from "@/components/elements/ProtectedRoute";

type RegistrationFormPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RegistrationFormPage({
  params,
}: RegistrationFormPageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  let event: Awaited<ReturnType<typeof getEventById>>;

  try {
    event = await getEventById(decodedId);
  } catch (error) {
    console.error("Error loading event:", error);
    notFound();
  }

  if (event.eventCode && decodedId !== event.eventCode) {
    redirect(`/${event.eventCode}/form`);
  }

  return (
    <ProtectedRoute>
      <Suspense fallback={<Loader />}>
        <RegistrationFormModule event={event} />
      </Suspense>
    </ProtectedRoute>
  );
}