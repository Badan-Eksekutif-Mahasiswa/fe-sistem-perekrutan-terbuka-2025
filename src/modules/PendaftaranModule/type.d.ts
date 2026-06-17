export type EventType = {
  id: string;
  eventCode?: string;
  title: string;
  logo: string;
  desc: string;
  status: "Dibuka" | "Akan Datang" | "Ditutup";
  startedAt: Date;
  closedAt: Date;
  categories: readonly string[];
  isSaved: boolean;
};

export type FilterCategoryType = {
  type: string;
  categories: string[];
};
