import { notFound } from "next/navigation";
import { getEventById } from "@/lib/api/event";
// import EventModule from "@/modules/legacy/EventModule";
import EventDetailModuleV2 from "@/modules/EventDetailModuleV2";

type EventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;

  try {
    const decodedId = decodeURIComponent(id);
    const event = await getEventById(decodedId);

    // return <EventModule event={event} />;
    return <EventDetailModuleV2 event={event} />;
  } catch (error) {
    console.error("Error loading event:", error);
    notFound();
  }
}
