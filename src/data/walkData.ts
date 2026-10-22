import type { WalkDay } from '../types';

const START_DATE = new Date('2026-10-22T00:00:00');

const locations = [
  'Brussels, Belgium',
  'Gent, Belgium',
  'Antwerp, Belgium',
  'Leuven, Belgium',
  'Namur, Belgium',
  'Mechelen, Belgium',
  'Liège, Belgium',
  'Ghent, Belgium',
  'Bruges, Belgium',
  'Charleroi, Belgium',
  'Brussels, Belgium',
];

const changes = [
  'The route became longer. Familiar streets started feeling different.',
  'A softer light carried the city into a different rhythm than the day before.',
  'The sidewalks were quieter, the corners more familiar, and the city opened like a held breath.',
  'The route kept changing shape, almost by instinct, as if the distance were learning the city.',
  'Old shopfronts became more noticeable than before, and the crossing patterns shifted.',
  'The walk felt less like movement and more like returning to a repeated memory.',
  'New construction lined one of the older streets, but the route still held its line.',
  'The same faces reappeared with a kind of ritual calm and the route grew more confident.',
  'An empty square drew attention, and the next turn adjusted itself without warning.',
  'The road felt wider than before, as though the city had altered its pace for the day.',
  'The route grew more deliberate, the sidewalks cleaner, the weather slightly warmer than usual.',
  'A closed shop changed the angle of the walk and the line of the route softened into a new direction.',
];

const notices = [
  'A closed shop. New construction. The same people taking the same route every morning.',
  'A bicycle chain against the railings. A dog pacing the same patch of grass. The same bus stop still waiting.',
  'A bakery door opened before sunrise. The same cyclist crossed the square without looking up.',
  'A temporary fence near the canal. The church bell sounded a few minutes later than yesterday.',
  'The evening light felt sharper. A woman always walked the same bend, carrying the same paper bag.',
  'Three pigeons gathered where the street widened. A bus shelter was newly painted in a shade of grey.',
  'An old sign had disappeared. The lane next to the park had become noticeably quieter.',
  'Two teenagers sat on a low wall, not speaking, both looking in the same direction.',
  'The route passed a closed kiosk. One corner of the square stayed empty for longer than usual.',
  'A different bench was occupied every time. The wind sounded louder near the river.',
  'An empty storefront had gained a handwritten note. The same dog always stopped at the same gate.',
  'The old pavement looked wetter than yesterday. A man in the distance was walking in a matching rhythm.',
];

const distances = [
  0.6, 1.2, 1.8, 2.5, 3.1, 3.9, 4.6, 5.2, 5.8, 6.4, 7.1,
  8.3, 9.2, 10.4, 11.6, 12.2, 13.5, 14.8, 16.1, 17.3, 18.4,
  16.8, 15.3, 13.9, 12.5, 18.7, 20.6, 22.1, 19.2, 17.8, 16.4,
  14.7, 13.2, 11.5, 10.6, 9.4, 8.7, 7.8, 6.2, 5.1, 4.4,
  3.9, 2.8, 1.6, 0.9, 2.1, 3.4, 5.7, 8.9, 11.2, 13.8,
  15.9, 18.5, 20.2, 17.4, 15.8, 12.9, 10.1, 7.8, 6.4, 4.9,
];

export const walkData: WalkDay[] = Array.from({ length: 60 }, (_, index) => {
  const date = new Date(START_DATE);
  date.setDate(START_DATE.getDate() + index);

  const distanceKm = distances[index] ?? 0;
  const timeMinutes = Math.max(0, Math.round(distanceKm * 26 + (index % 6) * 11));
  const location = locations[index % locations.length];
  const changed = changes[index % changes.length];
  const noticed = notices[index % notices.length];

  return {
    id: `day-${index + 1}`,
    date: date.toISOString(),
    dayNumber: index + 1,
    distanceKm,
    timeMinutes,
    location,
    changed,
    noticed,
    routeProgress: (index + 1) / 60,
  };
});
