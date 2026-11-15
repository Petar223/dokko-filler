import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { AngleLeftIcon, WordFileIcon } from '~components/Icons';
import Icon from '~shared-components/Icon/Icon';

/** Whole card is one button: no nested interactive elements. */
const DocumentItem = ({ name, onClick, actionLabel }) => {
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        height: '100%',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: (t) => `0 8px 24px ${alpha(t.palette.primary.main, 0.12)}`,
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          height: '100%',
          p: 2.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 2,
        }}
      >
        <Box
          sx={(t) => ({
            width: 48,
            height: 48,
            borderRadius: 3,
            display: 'grid',
            placeItems: 'center',
            color: 'primary.main',
            bgcolor: alpha(t.palette.primary.main, 0.1),
          })}
        >
          <Icon as={WordFileIcon} size={26} />
        </Box>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
          title={name}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
          }}
        >
          {actionLabel ?? t('documents.create')}
          <Icon
            as={AngleLeftIcon}
            size={10}
            style={{ transform: 'rotate(180deg)' }}
          />
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default DocumentItem;
