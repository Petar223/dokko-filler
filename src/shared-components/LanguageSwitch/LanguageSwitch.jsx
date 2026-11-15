import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

/** Toggles between Serbian and English; shows the language it switches to. */
const LanguageSwitch = () => {
  const { t, i18n } = useTranslation();
  const next = i18n.language === 'sr' ? 'en' : 'sr';

  return (
    <Tooltip title={t('language.switchTo')}>
      <Button
        onClick={() => i18n.changeLanguage(next)}
        aria-label={t('language.switchTo')}
        color="inherit"
        size="small"
        sx={{ minWidth: 40, fontWeight: 700 }}
      >
        {next.toUpperCase()}
      </Button>
    </Tooltip>
  );
};

export default LanguageSwitch;
