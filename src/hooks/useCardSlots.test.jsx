import { act, renderHook } from '@testing-library/react';
import { NotificationProvider } from '~context/NotificationContext';
import { CARD_TYPE } from '~pages/GenerateDocumentPage/consts';
import useCardSlots from './useCardSlots';

const wrapper = ({ children }) => (
  <NotificationProvider>{children}</NotificationProvider>
);
const seller = { order: 1, type: CARD_TYPE.ID, name: 'Prodavac' };
const car = { order: 3, type: CARD_TYPE.VEHICLE, name: 'Vozilo' };
const idSnapshot = { PersonalNumber: '123', GivenName: 'Ana' };

it('loads a card into its own slot and tracks loading per slot (B15)', async () => {
  let resolve;
  const readFn = jest.fn(
    () =>
      new Promise((r) => {
        resolve = r;
      })
  );
  const { result } = renderHook(() => useCardSlots(readFn), { wrapper });

  let pending;
  act(() => {
    pending = result.current.loadCard(seller);
  });
  expect(result.current.loadingOrder).toBe(1);

  // A second click while reading is ignored (no race into another slot).
  act(() => {
    result.current.loadCard(car);
  });
  expect(readFn).toHaveBeenCalledTimes(1);

  await act(async () => {
    resolve(idSnapshot);
    await pending;
  });
  expect(result.current.loadingOrder).toBeNull();
  expect(result.current.snapshots).toEqual({ 1: idSnapshot });
  expect(result.current.fields).toEqual({
    PersonalNumber_1: '123',
    GivenName_1: 'Ana',
  });
});

it('rejects a card of the wrong type', async () => {
  const { result } = renderHook(() => useCardSlots(async () => idSnapshot), {
    wrapper,
  });
  await act(() => result.current.loadCard(car));
  expect(result.current.snapshots).toEqual({});
});

it('removes a card', async () => {
  const { result } = renderHook(() => useCardSlots(async () => idSnapshot), {
    wrapper,
  });
  await act(() => result.current.loadCard(seller));
  act(() => result.current.removeCard(1));
  expect(result.current.fields).toEqual({});
});
