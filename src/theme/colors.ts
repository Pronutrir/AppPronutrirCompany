const YELLOW = '#f1c40f';
const BLUE = '#2c3e50';
const EMERALD = '#2ecc71';
const ALIZARIN = '#e74c3c';

const GREENPRIMARY = '#038C7F';
const GREENLIGHT = '#20c4cb';
const GREENDARK = '#038C8C';

const BROWNPRIMARY = '#737373';
const BROWNLIGHT = '#F2F2F2';
const BROWNDARK = '#565759';

const DARKLIGHT = '#2D2C40';
const BLACK = '#262626';

const WHITE = '#FFFF';

const OPACITY = 'rgba(0,0,0,.8)';

export interface IColor {
    WARNING: string;
    SUCCESS: string;
    INFOR: string;
    ERROR: string;
    BACKGROUND_1: string;
    BACKGROUND_2: string;
    BACKDROP: string;
    TEXT_PRIMARY: string;
    TEXT_SECONDARY: string;
    TEXT_TERTIARY: string;
    FILL_ICONE: string;
    GREENPRIMARY: string;
    GREENLIGHT: string;
    GREENDARK: string;
    BROWNPRIMARY: string;
    BROWNLIGHT: string;
    BROWNDARK: string;
    DARKLIGHT: string;
    BLACK: string;
    WHITE: string;
    BUTTON_PRIMARY: string;
    BUTTON_SECUNDARY: string;
    BUTTON_TERTIARY: string;
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

const BntColor = {
    BUTTON_PRIMARY: WHITE,
    BUTTON_SECUNDARY: GREENLIGHT,
    BUTTON_TERTIARY: GREENPRIMARY,
};

const light: IColor = {
    ...common,
    ...BntColor,
    BACKGROUND_1: WHITE,
    BACKGROUND_2: BROWNLIGHT,
    BACKDROP: OPACITY,
    TEXT_PRIMARY: GREENDARK,
    TEXT_SECONDARY: BROWNPRIMARY,
    TEXT_TERTIARY: WHITE,
    FILL_ICONE: BROWNPRIMARY,
    GREENPRIMARY: GREENPRIMARY,
    GREENLIGHT: GREENLIGHT,
    GREENDARK: GREENDARK,
    BROWNPRIMARY: BROWNPRIMARY,
    BROWNLIGHT: BROWNLIGHT,
    BROWNDARK: BROWNDARK,
    DARKLIGHT: DARKLIGHT,
    BLACK: BLACK,
    WHITE: WHITE,
};

const dark: IColor = {
    ...common,
    ...BntColor,
    BACKGROUND_1: WHITE,
    BACKGROUND_2: BROWNLIGHT,
    BACKDROP: OPACITY,
    TEXT_PRIMARY: GREENPRIMARY,
    TEXT_SECONDARY: BROWNPRIMARY,
    TEXT_TERTIARY: WHITE,
    FILL_ICONE: BROWNPRIMARY,
    GREENPRIMARY: GREENPRIMARY,
    GREENLIGHT: GREENLIGHT,
    GREENDARK: GREENDARK,
    BROWNPRIMARY: BROWNPRIMARY,
    BROWNLIGHT: BROWNLIGHT,
    BROWNDARK: BROWNDARK,
    DARKLIGHT: DARKLIGHT,
    BLACK: BLACK,
    WHITE: WHITE,
};

export const colors: IThemeColors = { light, dark };
