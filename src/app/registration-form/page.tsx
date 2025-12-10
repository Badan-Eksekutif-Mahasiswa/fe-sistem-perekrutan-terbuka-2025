import { Suspense } from "react";
import RegistrationFormModule from "@/modules/RegistrationFormModule";
import Loader from "@/components/elements/Loader";

export default function RegistrationFormPage() {
  return (
    <Suspense fallback={<Loader />}>
      <RegistrationFormModule />
    </Suspense>
  );
}
