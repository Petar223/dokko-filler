import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ThemeProvider from '~components/ThemeProvider/ThemeProvider';
import WelcomeTour from './WelcomeTour';
import { WELCOME_TOUR_STEPS } from './welcomeTourSteps';

// Every element the welcome tour points at, as the real header/sidebar render.
const TARGETS = [
  'nav-contracts',
  'nav-demo',
  'language-switch',
  'theme-switch',
  'user-menu',
];

const setup = ({ replay = false } = {}) => {
  const onEnd = jest.fn();
  render(
    <ThemeProvider>
      <MemoryRouter initialEntries={['/documents']}>
        {TARGETS.map((id) => (
          <button key={id} type="button" data-tour={id}>
            {id}
          </button>
        ))}
        <WelcomeTour run onEnd={onEnd} replay={replay} />
        <Routes>
          <Route path="/documents" element={<p>Lista ugovora</p>} />
          <Route path="/demo" element={<p>Demo stranica</p>} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
  return onEnd;
};

it('goes through every step and opens the demo at the end', async () => {
  const onEnd = setup();
  expect(
    await screen.findByText('Dobrodošli u Dokko Filler')
  ).toBeInTheDocument();

  for (let i = 1; i < WELCOME_TOUR_STEPS.length; i += 1) {
    await userEvent.click(screen.getByRole('button', { name: 'Dalje' }));
    await screen.findByText(`${i + 1} od ${WELCOME_TOUR_STEPS.length}`);
  }
  await userEvent.click(screen.getByRole('button', { name: 'Isprobaj demo' }));

  await waitFor(() => expect(onEnd).toHaveBeenCalled());
  expect(await screen.findByText('Demo stranica')).toBeInTheDocument();
});

it('skipping closes the tour and stays on the page', async () => {
  const onEnd = setup();
  await userEvent.click(
    await screen.findByRole('button', { name: 'Preskoči' })
  );
  await waitFor(() => expect(onEnd).toHaveBeenCalled());
  expect(screen.getByText('Lista ugovora')).toBeInTheDocument();
});

it('a replay from the user menu ends in place, without leaving the page', async () => {
  const onEnd = setup({ replay: true });
  await screen.findByText('Dobrodošli u Dokko Filler');
  for (let i = 1; i < WELCOME_TOUR_STEPS.length; i += 1) {
    await userEvent.click(screen.getByRole('button', { name: 'Dalje' }));
  }
  await userEvent.click(await screen.findByRole('button', { name: 'Završi' }));
  await waitFor(() => expect(onEnd).toHaveBeenCalled());
  expect(screen.getByText('Lista ugovora')).toBeInTheDocument();
});
