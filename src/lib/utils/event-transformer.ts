import { Event } from "@/types/event";
import { EventType } from "@/modules/PendaftaranModule/type";

/**
 * Get event status based on registration dates
 */
export function getEventStatus(
  openRegistration: string,
  closeRegistration: string
): "Dibuka" | "Akan Datang" | "Ditutup" {
  const now = new Date();
  const openDate = new Date(openRegistration);
  const closeDate = new Date(closeRegistration);

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
  return eventLevel;
}

/**
 * Map type of event to category
 */
export function mapTypeOfEventToCategory(
  typeOfEvent: Event["typeOfEvent"]
): string {
  const typeMapping: Record<Event["typeOfEvent"], string> = {
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
    title: event.title,
    logo: event.logo || "/placeholders/logo-event.webp",
    desc: event.description,
    status: getEventStatus(event.openRegistration, event.closeRegistration),
    startedAt: new Date(event.openRegistration),
    closedAt: new Date(event.closeRegistration),
    categories: categories as readonly string[],
    isSaved: false,
  };
}

/**
 * Transform multiple API Events to EventType array
 */
export function transformEventsToEventTypes(events: Event[]): EventType[] {
  return events.map(transformEventToEventType);
}
