import { useCallback, useMemo, useRef, useState } from 'react';
import { useNotification } from '~context/NotificationContext';
import {
  detectCardType,
  toOrderedFields,
} from '~pages/GenerateDocumentPage/consts';
import i18n from '~utils/i18n';

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
            i18n.t('reader.wrongType', {
              expected: i18n.t(`cardType.${card.type}`, {
                defaultValue: card.name,
              }),
            }),
            'warning'
          );
          return;
        }
        setSnapshots((prev) => ({ ...prev, [card.order]: snapshot }));
        notify(i18n.t('reader.loaded', { name: card.name }), 'success', 3000);
      } catch (error) {
        notify(error.message || i18n.t('reader.readFailed'), 'error');
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
