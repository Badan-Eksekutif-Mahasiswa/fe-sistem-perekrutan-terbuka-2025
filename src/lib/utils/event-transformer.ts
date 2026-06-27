import { Event } from "@/types/event";
import { EventType } from "@/modules/PendaftaranModule/type";

/**
 * Get event status based on registration dates
 */
export function getEventStatus(
  event?: Event | null
): "Dibuka" | "Akan Datang" | "Ditutup" {
  if (!event) return "Ditutup";
  if (event.status === "CLOSED") return "Ditutup";

  const now = new Date();
  const openDate = new Date(event.registrationOpen);
  const closeDate = new Date(event.registrationClose);

  if (now < openDate) {
    return "Akan Datang";
  } else if (now >= openDate && now <= closeDate) {
    return "Dibuka";
  } else {
    return "Ditutup";
  }
}

/**
 * Map event level to category
 */
export function mapEventLevelToCategory(
  eventLevel: Event["eventLevel"]
): string {
  return eventLevel || "Umum";
}

/**
 * Map type of event to category
 */
export function mapTypeOfEventToCategory(
  typeOfEvent: Event["typeOfEvent"]
): string {
  if (!typeOfEvent) return "Event";

  const typeMapping: Record<NonNullable<Event["typeOfEvent"]>, string> = {
    ORGANISASI: "Organisasi",
    KEPANITIAAN: "Kepanitiaan",
    UKM: "UKM",
  };
  return typeMapping[typeOfEvent];
}

/**
 * Transform API Event to EventType for PendaftaranModule
 */
export function transformEventToEventType(event: Event): EventType {
  const categories: string[] = [
    mapEventLevelToCategory(event.eventLevel),
    mapTypeOfEventToCategory(event.typeOfEvent),
  ];

  return {
    id: event.id,
    eventCode: event.eventCode || event.id,
    title: event.title,
    logo: event.logo || "/placeholders/logo-event.webp",
    desc: event.description,
    status: getEventStatus(event),
    startedAt: new Date(event.registrationOpen),
    closedAt: new Date(event.registrationClose),
    categories: categories as readonly string[],
    isSaved: false,
  };
}

/**
 * Transform multiple API Events to EventType array
 */
export function transformEventsToEventTypes(events: Event[]): EventType[] {
  return events
    .filter(Boolean)
    .filter((event) => event.status !== "DRAFT" && event.status !== "ARCHIVED")
    .map(transformEventToEventType);
}
