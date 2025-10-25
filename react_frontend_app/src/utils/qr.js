export function buildBookingQR({ id, lotId, slotId, startsAt }) {
  return `BOOK|${id}|${lotId}|${slotId}|${startsAt}`;
}
