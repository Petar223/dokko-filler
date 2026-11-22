import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CENTER } from '~utils/tour';
import AppTour from './AppTour';
import { renderWithProviders } from '../../../test/renderWithProviders';

// Real react-joyride; `demoWorkspace` copy from the Serbian locale.
const STEPS = [
  { id: 'progress', ...CENTER },
  { id: 'done', ...CENTER },
];

const setup = () => {
  const onEnd = jest.fn();
  renderWithProviders(
    <AppTour name="demoWorkspace" steps={STEPS} run onEnd={onEnd} />
  );
  return onEnd;
};

it('walks through the steps with translated copy and finishes', async () => {
  const onEnd = setup();
  expect(await screen.findByText('Napredak')).toBeInTheDocument();
  expect(screen.getByText('1 od 2')).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: 'Dalje' }));
  expect(await screen.findByText('To je ceo proces')).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: 'Završi' }));
  await waitFor(() => expect(onEnd).toHaveBeenCalledWith('finished'));
});

it('ends as skipped from the skip button', async () => {
  const onEnd = setup();
  await userEvent.click(
    await screen.findByRole('button', { name: 'Preskoči' })
  );
  await waitFor(() => expect(onEnd).toHaveBeenCalledWith('skipped'));
});

it('ends the whole tour with Esc instead of jumping to the next step', async () => {
  const onEnd = setup();
  await screen.findByText('Napredak');
  await userEvent.keyboard('{Escape}');
  await waitFor(() => expect(onEnd).toHaveBeenCalledWith('skipped'));
  expect(screen.queryByText('To je ceo proces')).not.toBeInTheDocument();
});
