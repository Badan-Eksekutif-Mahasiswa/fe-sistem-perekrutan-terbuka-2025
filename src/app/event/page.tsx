import { getAllEvents } from "@/lib/api/event";
// import PendaftaranModule from "@/modules/PendaftaranModule";
import EventModuleV2 from "@/modules/EventModuleV2";

export const dynamic = "force-dynamic";

export default async function StaffRegistrationPage() {
  const events = await getAllEvents();

  // return <PendaftaranModule events={events} />;
  return <EventModuleV2 events={events} />;
}
