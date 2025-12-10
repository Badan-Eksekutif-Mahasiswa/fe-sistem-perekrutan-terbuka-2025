import { Suspense } from "react";
import { notFound } from "next/navigation";
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

  try {
    const event = await getEventById(id);

    return (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <RegistrationFormModule event={event} />
        </Suspense>
      </ProtectedRoute>
    );
  } catch (error) {
    console.error("Error loading event:", error);
    notFound();
  }
}
