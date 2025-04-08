import { RFValue } from "react-native-responsive-fontsize";

export interface IBorderRadius {
    XXS: number;
    XS: number;
    S: number;
    M: number;
    L: number;
    XL: number;
    ROUND: number;
}

export interface ISpacing {
    XXS: number;
    XS: number;
    S: number;
    M: number;
    L: number;
    XL: number;
    XXL: number;
}

export interface IThemeSpacing {
    SPACING: ISpacing;
    BORDER_RADIUS: IBorderRadius;
}

const SPACING: ISpacing = {
    XXS: RFValue(2, 680),
    XS: RFValue(4, 680),
    S: RFValue(8, 680),
    M: RFValue(12, 680),
    L: RFValue(16, 680),
    XL: RFValue(24, 680),
    XXL: RFValue(32, 680),
};

const BORDER_RADIUS: IBorderRadius = {
    XXS: 4,
    XS: 8,
    S: 12,
    M: 16,
    L: 24,
    XL: 32,
    ROUND: 999,
};

export const spacing: IThemeSpacing = { SPACING, BORDER_RADIUS };
