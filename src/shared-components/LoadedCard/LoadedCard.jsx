import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import {
  BusinessWomanWithTieIcon,
  CarDocumentIcon,
  CheckMarkCircleLineIcon,
  RecycleBinLineIcon,
  YoungBusinessmanIcon,
} from '~components/Icons';
import {
  CARD_TYPE,
  getMissingCardFields,
  isMale,
} from '~pages/GenerateDocumentPage/consts';
import FieldList from '~shared-components/FieldList/FieldList';
import Icon from '~shared-components/Icon/Icon';

const join = (...parts) => parts.filter(Boolean).join(' ');

const ROWS = {
  [CARD_TYPE.ID]: (d, t) => [
    { label: t('card.rows.fullName'), value: join(d.GivenName, d.Surname) },
    { label: t('card.rows.idNumber'), value: d.DocumentNumber },
    { label: t('card.rows.personalNumber'), value: d.PersonalNumber },
    { label: t('card.rows.birthDate'), value: d.DateOfBirth },
    { label: t('card.rows.birthPlace'), value: d.PlaceOfBirth },
    {
      label: t('card.rows.residence'),
      value: [join(d.Street, d.AddressNumber), d.Place]
        .filter(Boolean)
        .join(', '),
    },
  ],
  [CARD_TYPE.VEHICLE]: (d, t) => [
    {
      label: t('card.rows.registration'),
      value: d.RegistrationNumberOfVehicle,
    },
    { label: t('card.rows.vehicleType'), value: d.VehicleCategory },
    { label: t('card.rows.make'), value: d.VehicleMake },
    { label: t('card.rows.model'), value: d.CommercialDescription },
    { label: t('card.rows.year'), value: d.YearOfProduction },
    { label: t('card.rows.engine'), value: d.EngineCapacity },
    {
      label: t('card.rows.owner'),
      value: join(d.OwnerName, d.OwnersSurnameOrBusinessName),
    },
    { label: t('card.rows.address'), value: d.OwnerAddress },
  ],
};

const cardIcon = (type, snapshot) => {
  if (type === CARD_TYPE.VEHICLE) return CarDocumentIcon;
  return isMale(snapshot.Sex) ? YoungBusinessmanIcon : BusinessWomanWithTieIcon;
};

const LoadedCard = ({ card, snapshot, onRemove }) => {
  const { t } = useTranslation();
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
              label={t(`cardType.${card.type}`, { defaultValue: card.type })}
              color="primary"
              variant="outlined"
            />
            <Tooltip title={t('card.loaded')}>
              <Box
                component="span"
                sx={{ color: 'success.main', display: 'flex' }}
              >
                <Icon
                  as={CheckMarkCircleLineIcon}
                  size={18}
                  aria-label={t('card.loaded')}
                />
              </Box>
            </Tooltip>
          </Stack>
        </Box>
        {onRemove && (
          <Tooltip title={t('card.remove')}>
            <IconButton
              onClick={onRemove}
              aria-label={t('card.removeNamed', { name: card.name })}
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

      <FieldList items={ROWS[card.type]?.(snapshot, t) ?? []} />

      {missing.length > 0 && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {t('card.missing', {
            fields: missing
              .map((f) => t(`field.${f}`, { defaultValue: f }))
              .join(', '),
          })}
        </Alert>
      )}
    </Card>
  );
};

export default LoadedCard;
