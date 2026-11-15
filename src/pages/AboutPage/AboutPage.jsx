import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import PageHeader from '~shared-components/PageHeader/PageHeader';

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title={t('about.title')} />
      <Card
        sx={{
          p: { xs: 3, sm: 4 },
          maxWidth: 760,
          animation: 'fadeIn 0.4s ease',
        }}
      >
        <Typography sx={{ mb: 2 }}>{t('about.purpose')}</Typography>
        <Typography color="text.secondary">{t('about.goal')}</Typography>
      </Card>
    </>
  );
};

export default AboutPage;
