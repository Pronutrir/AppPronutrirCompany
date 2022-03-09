import { withRepeat } from "react-native-reanimated";

const YELLOW = '#f1c40f';
const BLUE = '#2c3e50';
const EMERALD = '#2ecc71';
const ALIZARIN = '#e74c3c';

const GREENPRIMARY= '#038C7F';
const GREENLIGHT = '#88BFBF';
const GREENDARK = '#038C8C';

const BROWNPRIMARY = '#737373';
const BROWNLIGHT = '#F2F2F2';
const BROWNDARK = '#565759';

const DARKLIGHT = "#2D2C40";
const BLACK = '#262626';

const WHITE = '#FFFF';

const OPACITY = 'rgba(0,0,0,.8)';

export interface IColor {
    WARNING: string;
    SUCCESS: string;
    INFOR: string;
    ERROR: string;
    BACKGROUND_1: string,
    BACKGROUND_2: string,
    BACKDROP: string,
    TEXT_PRIMARY: string,
    TEXT_SECONDARY: string,
    TEXT_TERTIARY: string,
    GREENPRIMARY: string;
    GREENLIGHT: string;
    GREENDARK: string;
    BROWNPRIMARY: string;
    BROWNLIGHT: string;
    BROWNDARK: string;
    DARKLIGHT: string;
    BLACK: string;
    WHITE: string;
}

export interface IThemeColors {
    light: IColor;
    dark: IColor;
}

const common = {
    WARNING: YELLOW,
    SUCCESS: EMERALD,
    INFOR: BLUE,
    ERROR: ALIZARIN,
};

const light: IColor = {
    ...common,
    BACKGROUND_1: WHITE,
    BACKGROUND_2: BROWNLIGHT,
    BACKDROP: OPACITY,
    TEXT_PRIMARY: GREENPRIMARY,
    TEXT_SECONDARY: BROWNPRIMARY,
    TEXT_TERTIARY: '#FFFF',
    GREENPRIMARY: '#038C7F',
    GREENLIGHT: '#88BFBF',
    GREENDARK: '#038C8C',
    BROWNPRIMARY: '#737373',
    BROWNLIGHT: '#F2F2F2',
    BROWNDARK: '#565759',
    DARKLIGHT: "#2D2C40",
    BLACK: '#262626',
    WHITE: '#FFFF',
};

const dark: IColor = {
    ...common,
    BACKGROUND_1: '#FFFF',
    BACKGROUND_2: '#F2F2F2',
    BACKDROP: OPACITY,
    TEXT_PRIMARY: '#038C8C',
    TEXT_SECONDARY: '#737373',
    TEXT_TERTIARY: '#FFFF',
    GREENPRIMARY: '#038C7F',
    GREENLIGHT: '#88BFBF',
    GREENDARK: '#038C8C',
    BROWNPRIMARY: '#737373',
    BROWNLIGHT: '#F2F2F2',
    BROWNDARK: '#565759',
    DARKLIGHT: "#2D2C40",
    BLACK: '#262626',
    WHITE: '#FFFF',
};

export const colors: IThemeColors = { light, dark };
