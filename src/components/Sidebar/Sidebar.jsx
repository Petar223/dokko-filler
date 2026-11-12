import Box from '@mui/material/Box';
import {
  BuildingIcon,
  DescriptionIcon,
  EyeLookIcon,
  HouseWindowIcon,
} from '~components/Icons';
import NavigationItem from '~components/Sidebar/NavigationItem/NavigationItem';
import { ROUTES } from '~utils/routes';

const NAV_ITEMS = [
  { label: 'Početna', icon: HouseWindowIcon, route: ROUTES.HOME, end: true },
  { label: 'Ugovori', icon: DescriptionIcon, route: ROUTES.DOCUMENTS },
  { label: 'Demo', icon: EyeLookIcon, route: ROUTES.DEMO },
  { label: 'O platformi', icon: BuildingIcon, route: ROUTES.ABOUT },
];

const Sidebar = () => (
  <Box
    component="nav"
    aria-label="Glavna navigacija"
    sx={{
      width: 88,
      flexShrink: 0,
      py: 2,
      px: 1.5,
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
      <NavigationItem key={item.route} {...item} />
    ))}
  </Box>
);

export default Sidebar;
