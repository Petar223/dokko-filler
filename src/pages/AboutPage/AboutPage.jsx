import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import PageHeader from '~shared-components/PageHeader/PageHeader';

const AboutPage = () => (
  <>
    <PageHeader title="O platformi" />
    <Card
      sx={{ p: { xs: 3, sm: 4 }, maxWidth: 760, animation: 'fadeIn 0.4s ease' }}
    >
      <Typography sx={{ mb: 2 }}>
        Ova platforma služi za automatsko generisanje ugovora. Cilj aplikacije
        je da omogućimo brže i jednostavnije popunjavanje raznih tipova ugovora,
        čime se štedi vreme i povećava efikasnost u radu.
      </Typography>
      <Typography color="text.secondary">
        Naš cilj je da unapredimo vašu produktivnost i pružimo korisničko
        iskustvo koje je intuitivno i prijatno.
      </Typography>
    </Card>
  </>
);

export default AboutPage;
