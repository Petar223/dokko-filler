import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18n from '~utils/i18n';
import LanguageSwitch from './LanguageSwitch';
import { renderWithProviders } from '../../../test/renderWithProviders';

afterEach(() => i18n.changeLanguage('sr'));

it('switches the app to English and back, and remembers the choice', async () => {
  renderWithProviders(<LanguageSwitch />);

  await userEvent.click(
    screen.getByRole('button', { name: 'Switch to English' })
  );
  expect(i18n.t('common.back')).toBe('Back');
  expect(localStorage.getItem('dokko-language')).toBe('en');
  expect(document.documentElement.lang).toBe('en');

  await userEvent.click(
    screen.getByRole('button', { name: 'Prebaci na srpski' })
  );
  expect(i18n.t('common.back')).toBe('Nazad');
});

it('has the same keys in both languages', () => {
  const keys = (obj, prefix = '') =>
    Object.entries(obj).flatMap(([key, value]) =>
      typeof value === 'object'
        ? keys(value, `${prefix}${key}.`)
        : // Plural forms differ per language (sr has _few).
          [`${prefix}${key}`.replace(/_(one|few|other)$/, '')]
    );
  const of = (lng) => [
    ...new Set(keys(i18n.getResourceBundle(lng, 'translation'))),
  ];
  expect(of('en').sort()).toEqual(of('sr').sort());
});
