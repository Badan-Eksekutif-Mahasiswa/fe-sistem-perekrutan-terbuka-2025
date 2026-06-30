import { notFound, redirect } from "next/navigation";
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
  const decodedId = decodeURIComponent(id);
  let event: Awaited<ReturnType<typeof getEventById>>;

  try {
    event = await getEventById(decodedId);
  } catch (error) {
    console.error("Error loading event:", error);
    notFound();
  }

  if (event.eventCode && decodedId !== event.eventCode) {
    redirect(`/${event.eventCode}`);
  }

  // return <EventModule event={event} />;
  return <EventDetailModuleV2 event={event} />;
}