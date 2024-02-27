import { createContext, useState } from "react";
import Sidebar from "../Sidebar";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { Light, Dark } from "../../styles/Themes";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

export const ThemeContext = createContext(null);

export const HomeLayout = ({children}) => {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <CssBaseline />
        <Container className={sidebarOpen ? "sidebarState active" : ""}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            </Grid>
            <Grid item xs={9}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

const Container = styled.div`
  background: ${({ theme }) => theme.bgtotal};
  transition:all 0.3s ;
  &.active { 
    grid-template-columns: 300px auto;
  }
  color:${({theme})=>theme.text};
`;