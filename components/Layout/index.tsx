import { useState } from 'react';
import { Footer } from "components/Footer";
import Link from 'next/link';
import { MainContent, LayoutContainer, LayoutNavLogo, AppNavBar, DrawerLink, NavDrawer } from './Layout.css';
import { Container, Toolbar, Typography, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BuildIcon from '@mui/icons-material/Build';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import CasinoIcon from '@mui/icons-material/Casino';

const pages = [{
  label: "Brews",
  destination: "/brews",
  icon: <SportsBarIcon />
}, 
{
  label: "Builds",
  destination: "/builds",
  icon: <BuildIcon />
},
{
  label: "Tools",
  destination: "/tools/dice",
  icon: <CasinoIcon />
}];

const NavLink = ({href, children}) => {
  return (
    <div className="nav-link"><Link href={href}>{children}</Link></div>
  );
};

const DropDownLink = ({href, children}) => {
  return (
    <div className="dropdown-item"><Link href={href}>{children}</Link></div>
  );
};

export const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    console.log(open);
    setIsDrawerOpen(open);
  };

  return (
    <LayoutContainer>
      <AppNavBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href="/">
              <LayoutNavLogo
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                Dire Dice
              </LayoutNavLogo>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <NavDrawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    {pages.map((page) => (
                      <ListItem key={page.label} disablePadding>
                        <DrawerLink href={page.destination}>
                          <ListItemButton>
                            <ListItemIcon>
                              {page.icon}
                            </ListItemIcon>
                            <ListItemText primary={page.label} />
                          </ListItemButton>
                        </DrawerLink>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </NavDrawer>
            </Box>
            <Link href="/">
              <LayoutNavLogo
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                }}
              >
                Dire Dice
              </LayoutNavLogo>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link href={page.destination} key={page.label}>
                  <Typography
                    key={page.label}
                    sx={{ mr: 2, my: 2, display: 'block' }}
                  >
                    {page.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppNavBar>
      <MainContent>
        { children }
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};