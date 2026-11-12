import { act, render, screen } from '@testing-library/react';
import { NotificationProvider, useNotification } from './NotificationContext';

let notify;
const Probe = () => {
  notify = useNotification();
  return null;
};

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

it('auto-hides after the given duration and restarts the timer for a new message (B13)', () => {
  render(
    <NotificationProvider>
      <Probe />
    </NotificationProvider>
  );

  act(() => notify('Prva', 'info', 1000));
  act(() => jest.advanceTimersByTime(800));
  act(() => notify('Druga', 'info', 1000));
  act(() => jest.advanceTimersByTime(800));
  expect(screen.getByText('Druga')).toBeInTheDocument();

  act(() => jest.advanceTimersByTime(1000));
  expect(screen.queryByText('Druga')).not.toBeInTheDocument();
});
