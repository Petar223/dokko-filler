import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '~constants/routes';
import { CardGrid } from '~ui/CardGrid';
import Icon from '~ui/Icon';
import {
  DownloadToStorageIcon,
  IdProofLineIcon,
  WordFileIcon,
} from '~ui/Icons';

const STEPS = [
  {
    icon: WordFileIcon,
    title: 'Izaberi ugovor',
    text: 'Odaberite šablon iz liste dostupnih ugovora.',
  },
  {
    icon: IdProofLineIcon,
    title: 'Učitaj dokumente',
    text: 'Ubacite ličnu kartu ili saobraćajnu u čitač i podaci se popunjavaju sami.',
  },
  {
    icon: DownloadToStorageIcon,
    title: 'Pregledaj i preuzmi',
    text: 'Proverite izgled dokumenta i preuzmite gotov .docx fajl.',
  },
];

const HomePage = () => (
  <Box sx={{ animation: 'fadeIn 0.4s ease' }}>
    <Stack
      spacing={3}
      sx={{ alignItems: 'center', textAlign: 'center', py: { xs: 4, md: 8 } }}
    >
      <Typography
        variant="overline"
        color="primary"
        sx={{ fontWeight: 700, letterSpacing: '0.12em' }}
      >
        Dokko Filler
      </Typography>
      <Typography variant="h1" sx={{ maxWidth: 720 }}>
        Ugovori popunjeni za nekoliko sekundi
      </Typography>
      <Typography
        color="text.secondary"
        sx={{ maxWidth: 600, fontSize: '1.125rem' }}
      >
        Podaci se čitaju direktno sa lične karte i saobraćajne dozvole, a ugovor
        dobijate spreman za štampu, bez prepisivanja i grešaka.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <Button
          component={RouterLink}
          to={ROUTES.DOCUMENTS}
          variant="contained"
          size="large"
        >
          Pregledaj ugovore
        </Button>
        <Button
          component={RouterLink}
          to={ROUTES.DEMO}
          variant="outlined"
          size="large"
        >
          Pogledaj demo
        </Button>
      </Stack>
    </Stack>

    <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
      Kako radi
    </Typography>
    <CardGrid $min={240}>
      {STEPS.map((step, i) => (
        <Card key={step.title} sx={{ p: 3 }}>
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
            {i + 1}. {step.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {step.text}
          </Typography>
        </Card>
      ))}
    </CardGrid>
  </Box>
);

export default HomePage;
