import { useCallback, useState } from 'react';

const storageKey = (id) => `dokko-tour:${id}`;

const isSeen = (id) => {
  try {
    return localStorage.getItem(storageKey(id)) !== null;
  } catch {
    // Storage blocked (private mode): treat as seen, never nag on every visit.
    return true;
  }
};

const markSeen = (id) => {
  try {
    localStorage.setItem(storageKey(id), '1');
  } catch {
    // The tour just shows again next time.
  }
};

/**
 * Run state of one product tour. `id` is unique per tour (and per user when
 * the tour is user-specific, e.g. `welcome:<email>`); `null` = never runs.
 * With `autoStart`, the tour runs once per browser until it is finished or
 * skipped. `start()` replays it at any time.
 */
// ponytail: "seen" lives in localStorage (per browser). Move it to a Cognito
// user attribute if tours must not repeat on another device.
const useTour = (id, { autoStart = false } = {}) => {
  // Explicit start/end per tour id; otherwise fall back to the seen flag.
  const [overrides, setOverrides] = useState({});

  const run = Boolean(id) && (overrides[id] ?? (autoStart && !isSeen(id)));

  const start = useCallback(() => {
    if (id) setOverrides((prev) => ({ ...prev, [id]: true }));
  }, [id]);

  const end = useCallback(() => {
    if (!id) return;
    markSeen(id);
    setOverrides((prev) => ({ ...prev, [id]: false }));
  }, [id]);

  return { run, start, end };
};

export default useTour;
