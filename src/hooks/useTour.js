import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

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

// Only one tour may run at a time (e.g. the welcome tour and a page tour both
// want to auto-start right after login). The first one to ask gets the slot;
// the others wait and start, in turn, when it is freed.
let activeTour = null;
const listeners = new Set();
const setActiveTour = (id) => {
  activeTour = id;
  listeners.forEach((listener) => listener());
};
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getActiveTour = () => activeTour;

/**
 * Run state of one product tour. `id` is unique per tour (and per user when
 * the tour is user-specific, e.g. `welcome:<email>`). Pass `null` while the
 * tour cannot be shown (no user yet, empty list, dialog closed).
 * With `autoStart`, the tour runs once per browser until it is finished or
 * skipped. `start()` replays it at any time.
 */
// ponytail: "seen" lives in localStorage (per browser). Move it to a Cognito
// user attribute if tours must not repeat on another device.
const useTour = (id, { autoStart = false } = {}) => {
  // Explicit start/end per tour id; otherwise fall back to the seen flag.
  const [overrides, setOverrides] = useState({});
  const active = useSyncExternalStore(subscribe, getActiveTour);

  const wanted = Boolean(id) && (overrides[id] ?? (autoStart && !isSeen(id)));

  useEffect(() => {
    if (!wanted) return undefined;
    const claim = () => {
      if (activeTour === null) setActiveTour(id);
    };
    claim();
    const unsubscribe = subscribe(claim);
    return () => {
      unsubscribe();
      if (activeTour === id) setActiveTour(null);
    };
  }, [wanted, id]);

  const start = useCallback(() => {
    if (id) setOverrides((prev) => ({ ...prev, [id]: true }));
  }, [id]);

  const end = useCallback(() => {
    if (!id) return;
    markSeen(id);
    setOverrides((prev) => ({ ...prev, [id]: false }));
  }, [id]);

  return { run: wanted && active === id, start, end };
};

export default useTour;
