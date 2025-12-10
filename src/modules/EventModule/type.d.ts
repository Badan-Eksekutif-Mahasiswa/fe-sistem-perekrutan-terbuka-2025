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
  bphImage: string;
};

type TestimonyType = {
  profilePicture: string;
  name: string;
  jabatan: string;
  desc: string;
};

export type {
  EventTimelineType,
  TimelineMarkerProps,
  DivisiDataType,
  TestimonyType,
};
