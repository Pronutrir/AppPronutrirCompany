import { RFValue } from "react-native-responsive-fontsize";

export interface IFonts {
    Black: string,
    BlackItalic: string,
    Bold: string,
    BoldItalic: string,
    Italic: string,
    Light: string,
    LightItalic: string,
    Medium: string,
    MediumItalic: string,
    Regular: string,
    Thin: string,
    ThinItalic: string,
}

export interface ITypography {
    FONTES: IFonts;
    SIZE: IFontSize;
    LETTERSPACING: ILetterSpacing;
}

export interface IFontSize {
    fontysize10: number,  
    fontysize12: number,
    fontysize14: number,
    fontysize16: number,
    fontysize18: number,
    fontysize20: number,
    fontysize22: number,
}

interface ILetterSpacing {
    S: number;
    M: number;
    L: number;
}

const SIZE: IFontSize = {
    fontysize10: RFValue(10, 680),  
    fontysize12: RFValue(12, 680),
    fontysize14: RFValue(14, 680),
    fontysize16: RFValue(16, 680),
    fontysize18: RFValue(18, 680),
    fontysize20: RFValue(20, 680),
    fontysize22: RFValue(22, 680),
  };
  
  const LETTERSPACING: ILetterSpacing = {
    S: 1,
    M: 2,
    L: 3,
  };

  const FONTES: IFonts = {
    Black: "Roboto-Black",
    BlackItalic: 'Roboto-BlackItalic',
    Bold: 'Roboto-Bold',
    BoldItalic: 'Roboto-BoldItalic',
    Italic: 'Roboto-Italic',
    Light: 'Roboto-Light',
    LightItalic: 'Roboto-LightItalic',
    Medium: 'Roboto-Medium',
    MediumItalic: 'Roboto-MediumItalic',
    Regular: 'Roboto-Regular',
    Thin: 'Roboto-Thin',
    ThinItalic: 'Roboto-ThinItalic',
  }
  
  export const typography: ITypography = {SIZE, LETTERSPACING, FONTES};
