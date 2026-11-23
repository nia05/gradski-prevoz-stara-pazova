import { TextAroundMatch } from './utils.model';

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
