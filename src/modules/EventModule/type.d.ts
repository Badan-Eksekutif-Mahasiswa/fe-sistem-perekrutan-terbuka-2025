type EventTimelineType = {
  date: Date;
  title: string;
  desc: string;
};

type TimelineMarkerProps = {
  isEven: boolean;
  isLast: boolean;
};

export type { EventTimelineType, TimelineMarkerProps };
