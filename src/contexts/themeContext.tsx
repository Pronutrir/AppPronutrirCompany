import React, { createContext } from 'react';
import {colors, IColor} from '../theme/colors';
import {typography, ITypography} from '../theme/typography';
export interface ThemeContextData {
   colors: IColor;
   typography: ITypography;
}

const ThemeContext = createContext({} as ThemeContextData);

const ThemeProvider: React.FC = ({children}) => {
  const isLightTheme = true; // this is temporary, we will get back to it later

  const theme = {
    colors: isLightTheme ? colors.light : colors.dark,
    typography: typography,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
