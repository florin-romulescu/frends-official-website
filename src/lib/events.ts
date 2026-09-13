import type { EventStatus } from '../components/types';

const todayIn = (timeZone: string): string =>
  new Intl.DateTimeFormat('en-CA', { timeZone, dateStyle: 'short' }).format(new Date());

export const eventStatus = (
  startDate: string,
  endDate: string | undefined,
  today = todayIn('Europe/Bucharest'),
): EventStatus => {
  if (today < startDate) return 'open';
  if (today <= (endDate || startDate)) return 'ongoing';
  return 'completed';
};
