import { act, renderHook } from '@testing-library/react';
import useTour from './useTour';

beforeEach(() => localStorage.clear());

it('auto-starts once, and not again after it ended', () => {
  const first = renderHook(() => useTour('demo', { autoStart: true }));
  expect(first.result.current.run).toBe(true);

  act(() => first.result.current.end());
  expect(first.result.current.run).toBe(false);

  const later = renderHook(() => useTour('demo', { autoStart: true }));
  expect(later.result.current.run).toBe(false);
});

it('replays with start() even after it was seen', () => {
  localStorage.setItem('dokko-tour:demo', '1');
  const { result } = renderHook(() => useTour('demo', { autoStart: true }));
  expect(result.current.run).toBe(false);

  act(() => result.current.start());
  expect(result.current.run).toBe(true);
});

it('never runs without an id (e.g. no user yet)', () => {
  const { result } = renderHook(() => useTour(null, { autoStart: true }));
  act(() => result.current.start());
  expect(result.current.run).toBe(false);
});

it('tracks each id separately (another user on the same browser)', () => {
  localStorage.setItem('dokko-tour:welcome:ana@example.com', '1');
  const { result, rerender } = renderHook(
    ({ id }) => useTour(id, { autoStart: true }),
    { initialProps: { id: 'welcome:ana@example.com' } }
  );
  expect(result.current.run).toBe(false);

  rerender({ id: 'welcome:marko@example.com' });
  expect(result.current.run).toBe(true);
});

it('without autoStart waits for start()', () => {
  const { result } = renderHook(() => useTour('demo'));
  expect(result.current.run).toBe(false);
});

describe('one tour at a time', () => {
  it('a second auto-start tour waits until the first one ends', () => {
    const { result } = renderHook(() => ({
      welcome: useTour('welcome', { autoStart: true }),
      page: useTour('page', { autoStart: true }),
    }));
    expect(result.current.welcome.run).toBe(true);
    expect(result.current.page.run).toBe(false);

    act(() => result.current.welcome.end());
    expect(result.current.page.run).toBe(true);
  });

  it('frees the slot when the running tour unmounts', () => {
    const first = renderHook(() => useTour('first', { autoStart: true }));
    const second = renderHook(() => useTour('second', { autoStart: true }));
    expect(second.result.current.run).toBe(false);

    first.unmount();
    expect(second.result.current.run).toBe(true);
  });
});
