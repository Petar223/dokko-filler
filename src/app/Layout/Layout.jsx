import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from '~app/ErrorBoundary/ErrorBoundary';
import Footer from '~app/Footer/Footer';
import Header from '~app/Header/Header';
import Sidebar from '~app/Sidebar/Sidebar';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flex: 1, overflowY: 'auto', bgcolor: 'background.default' }}
        >
          <Box
            sx={{
              maxWidth: 1200,
              mx: 'auto',
              px: { xs: 2, sm: 4 },
              py: { xs: 3, sm: 4 },
              minHeight: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* A crashing page keeps header and sidebar usable. */}
            <ErrorBoundary resetKey={pathname}>{children}</ErrorBoundary>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
