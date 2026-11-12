import { useCallback, useMemo, useRef, useState } from 'react';
import { useNotification } from '~app/Notifications';
import { MSG } from '~constants/messages';
import { CARD_TYPES, detectCardType, toOrderedFields } from './cardTypes';

/**
 * Card slot state for one document.
 * `readFn(order)` resolves to a raw card snapshot ({ GivenName, ... }).
 * Only one read runs at a time; the result is stored for the slot that
 * started the read, never for a slot clicked later.
 */
const useCardSlots = (readFn) => {
  const notify = useNotification();
  const [snapshots, setSnapshots] = useState({});
  const [loadingOrder, setLoadingOrder] = useState(null);
  const busy = useRef(false);

  const loadCard = useCallback(
    async (card) => {
      if (busy.current) return;
      busy.current = true;
      setLoadingOrder(card.order);
      try {
        const snapshot = await readFn(card.order);
        const detected = detectCardType(snapshot);
        if (detected && detected !== card.type) {
          notify(
            MSG.reader.wrongType(CARD_TYPES[card.type]?.label ?? card.name),
            'warning'
          );
          return;
        }
        setSnapshots((prev) => ({ ...prev, [card.order]: snapshot }));
        notify(MSG.reader.loaded(card.name), 'success', 3000);
      } catch (error) {
        notify(error.message || MSG.reader.readFailed, 'error');
      } finally {
        busy.current = false;
        setLoadingOrder(null);
      }
    },
    [readFn, notify]
  );

  const removeCard = useCallback((order) => {
    setSnapshots(({ [order]: removed, ...rest }) => rest);
  }, []);

  const fields = useMemo(
    () =>
      Object.entries(snapshots).reduce(
        (acc, [order, snapshot]) => ({
          ...acc,
          ...toOrderedFields(snapshot, order),
        }),
        {}
      ),
    [snapshots]
  );

  return { snapshots, fields, loadingOrder, loadCard, removeCard };
};

export default useCardSlots;
