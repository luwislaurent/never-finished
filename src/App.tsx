import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { walkData } from './data/walkData';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const shortDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const routePath =
  'M 62 300 C 100 285, 138 260, 196 250 S 298 290, 358 262 S 430 192, 474 238 S 556 334, 612 274 S 706 170, 772 214 S 848 282, 908 268 S 964 234, 1018 208';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(walkData.length - 1);

  const selectedDay = walkData[selectedIndex];
  const progress = (selectedIndex / (walkData.length - 1)) * 100;
  const routeProgress = selectedDay.routeProgress;

  const timelineStart = useMemo(
    () => shortDateFormatter.format(new Date(walkData[0].date)),
    [],
  );

  const timelineEnd = useMemo(
    () => shortDateFormatter.format(new Date(walkData[walkData.length - 1].date)),
    [],
  );

  const selectedDateLabel = dateFormatter.format(new Date(selectedDay.date));

  const hours = Math.floor(selectedDay.timeMinutes / 60);
  const minutes = selectedDay.timeMinutes % 60;

  return (
    <div className="app-shell">
      <div className="walk-stage">
        <motion.div
          className="word-wrap"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="walk-word">WALK</div>
        </motion.div>

        <svg
          className="route-svg"
          viewBox="0 0 1080 420"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Walking route progress"
        >
          <path className="route route-base" d={routePath} />
          <motion.path
            className="route route-active"
            d={routePath}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: routeProgress }}
            transition={{ duration: 0.75, ease: 'easeInOut' }}
          />
        </svg>

        <motion.aside
          className="day-panel"
          key={selectedDay.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="eyebrow">PLACEHOLDER DATA</div>
          <h2>
            DAY {selectedDay.dayNumber} — {selectedDateLabel}
          </h2>

          <div className="stats-grid">
            <div>
              <span className="label">Distance</span>
              <strong>{selectedDay.distanceKm.toFixed(1)} km</strong>
            </div>
            <div>
              <span className="label">Time walked</span>
              <strong>
                {hours}h {minutes.toString().padStart(2, '0')}m
              </strong>
            </div>
            <div>
              <span className="label">Location</span>
              <strong>{selectedDay.location}</strong>
            </div>
          </div>

          <div className="notes-block">
            <div className="note">
              <span className="label">What changed?</span>
              <p>{selectedDay.changed}</p>
            </div>
            <div className="note">
              <span className="label">What was noticed?</span>
              <p>{selectedDay.noticed}</p>
            </div>
          </div>
        </motion.aside>
      </div>

      <div className="timeline">
        <div className="timeline-topline">
          <span>{timelineStart}</span>
          <span>{timelineEnd}</span>
        </div>

        <div className="slider-shell">
          <input
            type="range"
            min={0}
            max={walkData.length - 1}
            step={1}
            value={selectedIndex}
            onChange={(event) => setSelectedIndex(Number(event.target.value))}
            aria-label="Select day"
          />
          <div className="slider-fill" style={{ width: `${progress}%` }} />
          <div className="slider-handle" style={{ left: `${progress}%` }} />
        </div>

        <div className="timeline-bottomline">
          <span>START</span>
          <span>{selectedDay.dayNumber}</span>
          <span>FUTURE</span>
        </div>
      </div>
    </div>
  );
}

export default App;
