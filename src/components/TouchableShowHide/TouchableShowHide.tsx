import React, { useRef, useState, memo, useCallback } from 'react';
import {
    View,
    Animated,
    TouchableHighlight,
    LayoutAnimation,
    StyleSheet,
    Platform,
    UIManager,
    Text,
} from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';

interface Props {
    children: React.ReactNode;
    TextHeader?: string;
    SubTextHeader?: string;
    Show?: boolean;
    ComponentTop?: JSX.Element;
}

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TouchableShowHide: React.FC<Props> = ({
    children,
    TextHeader = 'Texto do Header',
    SubTextHeader,
    Show = false,
    ComponentTop,
}: Props) => {
    const styles = useThemeAwareObject(createStyles);
    const rotateValueHolder = useRef(new Animated.Value(0)).current;
    const [expanded, setExpanded] = useState(Show);

    const rotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(rotateValueHolder, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(rotateValueHolder, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const ComponentTopHeader = useCallback(() => {
        if (ComponentTop) {
            return ComponentTop;
        } else {
            return (
                <View style={styles.buttonItem1}>
                    <Text style={styles.Label}>{TextHeader}</Text>
                </View>
            );
        }
    }, [ComponentTop, SubTextHeader, TextHeader]);

    return (
        <View style={styles.container}>
            <TouchableHighlight
                underlayColor={'#fff'}
                onPress={() => {
                    LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.linear,
                    );
                    setExpanded(!expanded);
                    !expanded ? fadeIn() : fadeOut();
                }}>
                <View style={styles.button}>
                    <ComponentTopHeader />
                    <View style={styles.buttonItem3}>
                        <Animated.Image
                            style={[
                                styles.arrowImg,
                                { transform: [{ rotate: rotateData }] },
                            ]}
                            source={require('../../assets/imagens/seta-para-baixo.png')}
                        />
                    </View>
                </View>
            </TouchableHighlight>
            {expanded && <View style={styles.boxContainer}>{children}</View>}
        </View>
    );
};

export default memo(TouchableShowHide);

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND_1,
            padding: RFPercentage(1),
            paddingVertical: RFPercentage(2),
            marginVertical: RFPercentage(1),
        },
        button: {
            flexDirection: 'row',
            ...Platform.select({
                ios: {
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 6,
                },
                android: {
                    elevation: 3,
                },
            }),
            backgroundColor: theme.colors.BUTTON_PRIMARY,
            borderRadius: 7,
            paddingLeft: 10,
            paddingVertical: 10,
        },
        buttonItem1: {
            flex: 1,
            alignItems: 'center',
            paddingVertical: 10
        },
        buttonItem2: {
            flex: 4,
            alignItems: 'baseline',
        },
        buttonItem3: {
            position: 'absolute',
            right: 0,
            alignSelf: 'center',
            padding: 10,
            paddingRight: 20,
        },
        arrowImg: {
            width: RFPercentage(2),
            height: RFPercentage(2),
        },
        Label: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            fontSize: theme.typography.SIZE.fontysize18,
            marginTop: 5,
        },
        textLabel: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize14,
            marginTop: 5,
        },
        boxContainer: {
            backgroundColor: theme.colors.BACKGROUND_2,
            marginTop: 3,
            padding: 10,
        },
    });
    return styles;
}
