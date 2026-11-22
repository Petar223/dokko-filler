import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TourTooltip from './TourTooltip';
import { renderWithProviders } from '../../../../test/renderWithProviders';

// The props Joyride passes to a tooltipComponent (label as `children`).
const buttonProps = (label) => ({
  'aria-label': label,
  'data-action': label,
  children: label,
  onClick: jest.fn(),
  role: 'button',
  title: label,
});

const setup = (overrides = {}) => {
  const props = {
    step: {
      title: 'Ugovori',
      content: 'Ovde su svi šabloni.',
      buttons: ['back', 'close', 'primary', 'skip'],
    },
    index: 1,
    size: 4,
    backProps: buttonProps('Nazad'),
    closeProps: buttonProps('Zatvori vodič'),
    primaryProps: buttonProps('Dalje'),
    skipProps: buttonProps('Preskoči'),
    tooltipProps: { 'aria-modal': true, role: 'alertdialog' },
    ...overrides,
  };
  renderWithProviders(<TourTooltip {...props} />);
  return props;
};

it('shows title, content and progress as a labelled dialog', () => {
  setup();
  expect(
    screen.getByRole('alertdialog', { name: 'Ugovori' })
  ).toBeInTheDocument();
  expect(screen.getByText('Ovde su svi šabloni.')).toBeInTheDocument();
  expect(screen.getByText('2 od 4')).toBeInTheDocument();
});

it('wires every button to the Joyride handlers', async () => {
  const props = setup();
  await userEvent.click(screen.getByRole('button', { name: 'Dalje' }));
  await userEvent.click(screen.getByRole('button', { name: 'Nazad' }));
  await userEvent.click(screen.getByRole('button', { name: 'Preskoči' }));
  await userEvent.click(screen.getByRole('button', { name: 'Zatvori vodič' }));
  expect(props.primaryProps.onClick).toHaveBeenCalled();
  expect(props.backProps.onClick).toHaveBeenCalled();
  expect(props.skipProps.onClick).toHaveBeenCalled();
  expect(props.closeProps.onClick).toHaveBeenCalled();
});

it('has no back button on the first step', () => {
  setup({ index: 0 });
  expect(
    screen.queryByRole('button', { name: 'Nazad' })
  ).not.toBeInTheDocument();
});

it('shows only the buttons the step allows', () => {
  setup({ step: { title: 'X', content: 'Y', buttons: ['primary'] } });
  expect(screen.getAllByRole('button')).toHaveLength(1);
  expect(screen.getByRole('button', { name: 'Dalje' })).toBeInTheDocument();
});
