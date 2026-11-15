import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import {
  DownloadToStorageIcon,
  FileLineIcon,
  IdProofLineIcon,
  WordFileIcon,
} from '~components/Icons';
import Icon from '~shared-components/Icon/Icon';
import { CardGrid } from '~shared-components/shared-styled-components/CardGrid/CardGrid';
import { ROUTES } from '~utils/routes';

const STEPS = [
  { key: 'choose', icon: WordFileIcon },
  { key: 'load', icon: IdProofLineIcon },
  { key: 'download', icon: DownloadToStorageIcon },
];

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease' }}>
      <Stack
        spacing={3}
        sx={{ alignItems: 'center', textAlign: 'center', py: { xs: 4, md: 8 } }}
      >
        <Box
          sx={(t) => ({
            width: 88,
            height: 88,
            borderRadius: 6,
            display: 'grid',
            placeItems: 'center',
            color: 'primary.main',
            bgcolor: alpha(t.palette.primary.main, 0.1),
          })}
        >
          <Icon as={FileLineIcon} size={44} />
        </Box>
        <Typography variant="h1" sx={{ maxWidth: 720 }}>
          {t('home.title')}
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 600 }}>
          {t('home.description')}
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button
            component={RouterLink}
            to={ROUTES.DOCUMENTS}
            variant="contained"
            size="large"
          >
            {t('home.viewContracts')}
          </Button>
          <Button
            component={RouterLink}
            to={ROUTES.DEMO}
            variant="outlined"
            size="large"
          >
            {t('home.viewDemo')}
          </Button>
        </Stack>
      </Stack>

      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 3, textAlign: 'center' }}
      >
        {t('home.howItWorks')}
      </Typography>
      <CardGrid $min={280} style={{ maxWidth: 1000, margin: '0 auto' }}>
        {STEPS.map((step, i) => (
          <Card key={step.key} sx={{ p: 3 }}>
            <Box
              sx={(t) => ({
                width: 44,
                height: 44,
                borderRadius: 3,
                display: 'grid',
                placeItems: 'center',
                color: 'primary.main',
                bgcolor: alpha(t.palette.primary.main, 0.1),
                mb: 2,
              })}
            >
              <Icon as={step.icon} size={22} />
            </Box>
            <Typography variant="h6" component="h3">
              {i + 1}. {t(`home.steps.${step.key}.title`)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {t(`home.steps.${step.key}.text`)}
            </Typography>
          </Card>
        ))}
      </CardGrid>
    </Box>
  );
};

export default HomePage;
