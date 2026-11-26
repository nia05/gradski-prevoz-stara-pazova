import { DayTab } from './bus-stop-header.model';
import { TimetableDay } from '../../../core/bus-lines/bus-lines.model';

export const DAY_TABS: DayTab[] = [
  { day: TimetableDay.Weekday, label: 'Radni dan' },
  { day: TimetableDay.Saturday, label: 'Subota' },
  { day: TimetableDay.Sunday, label: 'Nedelja' },
];
