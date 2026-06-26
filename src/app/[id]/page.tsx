import { notFound } from "next/navigation";
import { getEventById } from "@/lib/api/event";
import EventModule from "@/modules/legacy/EventModule";

type EventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;

  try {
    const event = await getEventById(id);
    console.log(event.timeline);

    return <EventModule event={event} />;
  } catch (error) {
    console.error("Error loading event:", error);
    notFound();
  }
}
