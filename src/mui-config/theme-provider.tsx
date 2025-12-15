import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@wavemaker/react-runtime/mui-config/theme";

export const WmThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {children}
    </ThemeProvider>
  );
};
