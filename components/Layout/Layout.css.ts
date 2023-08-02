import { AppBar, Box, Drawer, Typography } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";
import { COLORS } from "styles/vars.css";

export const LayoutNavBar = styled.div`
  padding-left: .5rem;
  padding-right: .5rem;
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 350px;
`;

export const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const AppNavBar = styled(AppBar)`
  background-color: ${COLORS.BACKGROUND};
`;

export const LayoutNavLogo = styled(Typography)`
  font-weight: 700;
  color: 'inherit';
  text-decoration: 'none';
`;

export const DrawerLink = styled(Link)`
  width: 100%;
`;

export const NavDrawer = styled(Drawer)`
  .MuiBox-root {
    width: 250px;
  }
`;
