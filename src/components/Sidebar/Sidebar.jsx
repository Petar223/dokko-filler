import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import {
  BuildingIcon,
  DescriptionIcon,
  EyeLookIcon,
  HouseWindowIcon,
} from '~components/Icons';
import NavigationItem from '~components/Sidebar/NavigationItem/NavigationItem';
import { ROUTES } from '~utils/routes';

// `label` values are translation keys; `tourId` is the `data-tour` target.
const NAV_ITEMS = [
  {
    label: 'nav.home',
    tourId: 'nav-home',
    icon: HouseWindowIcon,
    route: ROUTES.HOME,
    end: true,
  },
  {
    label: 'nav.contracts',
    tourId: 'nav-contracts',
    icon: DescriptionIcon,
    route: ROUTES.DOCUMENTS,
  },
  {
    label: 'nav.demo',
    tourId: 'nav-demo',
    icon: EyeLookIcon,
    route: ROUTES.DEMO,
  },
  {
    label: 'nav.about',
    tourId: 'nav-about',
    icon: BuildingIcon,
    route: ROUTES.ABOUT,
  },
];

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <Box
      component="nav"
      aria-label={t('nav.label')}
      sx={{
        width: 88,
        flexShrink: 0,
        py: 2,
        px: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        overflowY: 'auto',
      }}
    >
      {NAV_ITEMS.map((item) => (
        <NavigationItem key={item.route} {...item} label={t(item.label)} />
      ))}
    </Box>
  );
};

export default Sidebar;
