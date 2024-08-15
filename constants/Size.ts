import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const deviceWidth = SCREEN_WIDTH;
export const deviceHeight = SCREEN_HEIGHT;

export const isSmallDevice = SCREEN_WIDTH < 375;
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeDevice = SCREEN_WIDTH >= 414;

export const isTablet = SCREEN_WIDTH >= 768;

export const scale = (size: number) => SCREEN_WIDTH / guidelineBaseWidth * size;
export const verticalScale = (size: number) => SCREEN_HEIGHT / guidelineBaseHeight * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;

export const fontScale = (size: number) => size * PixelRatio.getFontScale();

export const devicePixelRatio = PixelRatio.get();

export const hitSlop = { top: 10, bottom: 10, left: 10, right: 10 };

export const isIphoneX = () => {
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        (SCREEN_HEIGHT === 780 ||
            SCREEN_WIDTH === 780 ||
            SCREEN_HEIGHT === 812 ||
            SCREEN_WIDTH === 812 ||
            SCREEN_HEIGHT === 844 ||
            SCREEN_WIDTH === 844 ||
            SCREEN_HEIGHT === 896 ||
            SCREEN_WIDTH === 896 ||
            SCREEN_HEIGHT === 926 ||
            SCREEN_WIDTH === 926)
    );
};

export const ifIphoneX = (iphoneXStyle: any, regularStyle: any) => {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
};