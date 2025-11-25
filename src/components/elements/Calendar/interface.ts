export interface DateRange {
  start: Date;
  end: Date;
  label: string;
  available: boolean;
}

export interface CalendarProps {
  availableRanges?: DateRange[];
  onRangeSelect?: (range: DateRange | null) => void;
  selectedRange?: DateRange | null;
  className?: string;
}
