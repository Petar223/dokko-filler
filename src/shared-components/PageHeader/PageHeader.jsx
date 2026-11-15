import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { AngleLeftIcon } from '~components/Icons';
import Icon from '~shared-components/Icon/Icon';

const PageHeader = ({ title, subtitle, onBack, actions }) => {
  const { t } = useTranslation();
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{
        alignItems: { sm: 'flex-end' },
        justifyContent: 'space-between',
        pb: 3,
        mb: 3,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Stack spacing={1} sx={{ minWidth: 0 }}>
        {onBack && (
          <Button
            onClick={onBack}
            startIcon={<Icon as={AngleLeftIcon} size={14} />}
            color="inherit"
            size="small"
            sx={{ alignSelf: 'flex-start', color: 'text.secondary', ml: -1 }}
          >
            {t('common.back')}
          </Button>
        )}
        <Typography
          variant="h2"
          component="h1"
          sx={{ wordBreak: 'break-word' }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
            {subtitle}
          </Typography>
        )}
      </Stack>
      {actions && (
        <Stack direction="row" spacing={1.5} sx={{ flexShrink: 0 }}>
          {actions}
        </Stack>
      )}
    </Stack>
  );
};

export default PageHeader;
