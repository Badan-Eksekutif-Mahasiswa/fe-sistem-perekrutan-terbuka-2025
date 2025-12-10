import { getAllEvents } from "@/lib/api/event";
import PendaftaranModule from "@/modules/PendaftaranModule";

export default async function StaffRegistrationPage() {
  const events = await getAllEvents();

  return <PendaftaranModule events={events} />;
}
