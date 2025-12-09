type EventTimelineType = {
  date: Date;
  title: string;
  desc: string;
};

type TimelineMarkerProps = {
  isEven: boolean;
  isLast: boolean;
};

type DivisiDataType = {
  nama: string;
  desc: string;
  jobdesc: string;
  bphName: string[];
  bphIamge: string;
};

export type { EventTimelineType, TimelineMarkerProps, DivisiDataType };
