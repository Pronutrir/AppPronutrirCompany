import React, { createContext } from 'react';
import { colors, IColor } from '../theme/colors';
import { typography, ITypography } from '../theme/typography';
import { spacing, IThemeSpacing } from '../theme/spacing';

export interface ThemeContextData {
  colors: IColor;
  typography: ITypography;
  spacing: IThemeSpacing;
}

const ThemeContext = createContext({} as ThemeContextData);

const ThemeProvider: React.FC = ({ children }) => {
  const isLightTheme = true; // this is temporary, we will get back to it later

  const theme = {
    colors: isLightTheme ? colors.light : colors.dark,
    typography: typography,
    spacing: spacing,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
