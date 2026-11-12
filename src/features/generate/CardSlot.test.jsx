import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardSlot from './CardSlot';
import { CARD_TYPE } from './cardTypes';
import { renderWithProviders } from '../../../test/renderWithProviders';

const card = { order: 3, type: CARD_TYPE.VEHICLE, name: 'Vozilo' };

it('is a keyboard-accessible button when empty', async () => {
  const onLoad = jest.fn();
  renderWithProviders(<CardSlot card={card} onLoad={onLoad} />);
  const button = screen.getByRole('button', {
    name: /Učitaj sa čitača: Vozilo/,
  });
  button.focus();
  await userEvent.keyboard('{Enter}');
  expect(onLoad).toHaveBeenCalled();
});

it('cannot be clicked while loading', () => {
  renderWithProviders(<CardSlot card={card} loading onLoad={jest.fn()} />);
  expect(screen.getByRole('button', { name: /Vozilo/ })).toBeDisabled();
});

it('shows a loaded but incomplete card with a warning (B16)', () => {
  // Electric car: no EngineCapacity.
  const snapshot = {
    RegistrationNumberOfVehicle: 'BG-1',
    VehicleCategory: 'M1',
    VehicleMake: 'Tesla',
    CommercialDescription: 'Model 3',
    YearOfProduction: '2022',
    OwnersSurnameOrBusinessName: 'Ilić',
    OwnerName: 'Milan',
    OwnerAddress: 'Beograd',
  };
  renderWithProviders(
    <CardSlot card={card} snapshot={snapshot} onRemove={jest.fn()} />
  );
  expect(screen.getByText('Tesla')).toBeInTheDocument();
  expect(
    screen.getByText(/Nedostaju polja: Zapremina motora/)
  ).toBeInTheDocument();
});
