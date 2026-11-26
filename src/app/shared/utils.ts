import { TextAroundMatch } from './utils.model';
import { SATURDAY_INDEX, SUNDAY_INDEX } from './utils.constants';
import { TimetableDay } from '../core/bus-lines/bus-lines.model';

export function getTimetableDay(date: Date): TimetableDay {
  if (date.getDay() === SUNDAY_INDEX) {
    return TimetableDay.Sunday;
  }
  if (date.getDay() === SATURDAY_INDEX) {
    return TimetableDay.Saturday;
  }
  return TimetableDay.Weekday;
}

export function getTimeOfDay(date: Date): string {
  return date.toTimeString().slice(0, 5);
}

export function toLowercaseWithoutDiacritics(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replaceAll('č', 'c')
    .replaceAll('ć', 'c')
    .replaceAll('š', 's')
    .replaceAll('ž', 'z')
    .replaceAll('đ', 'd');
}

export function splitAroundMatch(text: string, searchTerm: string): TextAroundMatch {
  const term = toLowercaseWithoutDiacritics(searchTerm);
  const start = term ? toLowercaseWithoutDiacritics(text).indexOf(term) : -1;

  if (start === -1) {
    return { before: text, match: '', after: '' };
  }

  const end = start + term.length;
  return { before: text.slice(0, start), match: text.slice(start, end), after: text.slice(end) };
}
