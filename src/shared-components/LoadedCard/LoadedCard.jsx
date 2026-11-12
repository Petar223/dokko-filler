import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {
  BusinessWomanWithTieIcon,
  CarDocumentIcon,
  CheckMarkCircleLineIcon,
  RecycleBinLineIcon,
  YoungBusinessmanIcon,
} from '~components/Icons';
import {
  CARD_TYPE,
  CARD_TYPES,
  FIELD_LABELS,
  getMissingCardFields,
  isMale,
} from '~pages/GenerateDocumentPage/consts';
import FieldList from '~shared-components/FieldList/FieldList';
import Icon from '~shared-components/Icon/Icon';

const join = (...parts) => parts.filter(Boolean).join(' ');

const ROWS = {
  [CARD_TYPE.ID]: (d) => [
    { label: 'Ime i prezime', value: join(d.GivenName, d.Surname) },
    { label: 'Broj dokumenta', value: d.DocumentNumber },
    { label: 'JMBG', value: d.PersonalNumber },
    { label: 'Datum rođenja', value: d.DateOfBirth },
    { label: 'Mesto rođenja', value: d.PlaceOfBirth },
    {
      label: 'Adresa',
      value: [join(d.Street, d.AddressNumber), d.Place]
        .filter(Boolean)
        .join(', '),
    },
  ],
  [CARD_TYPE.VEHICLE]: (d) => [
    { label: 'Registracija', value: d.RegistrationNumberOfVehicle },
    { label: 'Kategorija', value: d.VehicleCategory },
    { label: 'Marka', value: d.VehicleMake },
    { label: 'Model', value: d.CommercialDescription },
    { label: 'Godina', value: d.YearOfProduction },
    { label: 'Zapremina', value: d.EngineCapacity },
    {
      label: 'Vlasnik',
      value: join(d.OwnerName, d.OwnersSurnameOrBusinessName),
    },
    { label: 'Adresa vlasnika', value: d.OwnerAddress },
  ],
};

const cardIcon = (type, snapshot) => {
  if (type === CARD_TYPE.VEHICLE) return CarDocumentIcon;
  return isMale(snapshot.Sex) ? YoungBusinessmanIcon : BusinessWomanWithTieIcon;
};

const LoadedCard = ({ card, snapshot, onRemove }) => {
  const missing = getMissingCardFields(card.type, snapshot);

  return (
    <Card sx={{ p: 2.5, height: '100%', animation: 'fadeIn 0.25s ease' }}>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ alignItems: 'flex-start', mb: 2 }}
      >
        <Box
          sx={(t) => ({
            width: 48,
            height: 48,
            flexShrink: 0,
            borderRadius: 3,
            display: 'grid',
            placeItems: 'center',
            color: 'primary.main',
            bgcolor: alpha(t.palette.primary.main, 0.1),
          })}
        >
          <Icon as={cardIcon(card.type, snapshot)} size={28} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" component="h3" noWrap title={card.name}>
            {card.name}
          </Typography>
          <Stack
            direction="row"
            spacing={0.75}
            sx={{ mt: 0.5, alignItems: 'center' }}
          >
            <Chip
              size="small"
              label={CARD_TYPES[card.type]?.label ?? card.type}
              color="primary"
              variant="outlined"
            />
            <Tooltip title="Učitano">
              <Box
                component="span"
                sx={{ color: 'success.main', display: 'flex' }}
              >
                <Icon
                  as={CheckMarkCircleLineIcon}
                  size={18}
                  aria-label="Učitano"
                />
              </Box>
            </Tooltip>
          </Stack>
        </Box>
        {onRemove && (
          <Tooltip title="Ukloni podatke">
            <IconButton
              onClick={onRemove}
              aria-label={`Ukloni podatke: ${card.name}`}
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'error.main' },
              }}
            >
              <Icon as={RecycleBinLineIcon} size={18} />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      <FieldList items={ROWS[card.type]?.(snapshot) ?? []} />

      {missing.length > 0 && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Nedostaju polja: {missing.map((f) => FIELD_LABELS[f] ?? f).join(', ')}
        </Alert>
      )}
    </Card>
  );
};

export default LoadedCard;
