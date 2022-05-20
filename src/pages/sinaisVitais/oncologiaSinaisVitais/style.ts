import { StyleSheet, Dimensions, Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ThemeContextData } from "../../../contexts/themeContext";

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: Dimensions.get('screen').width,
            paddingVertical: 10,
            alignItems: 'center',
            backgroundColor: theme.colors.BACKGROUND_2
        },
        safeAreaViewStyle: {
            flex: 1,
            paddingTop: 10
        },
        SearchBarBoxStyle: {
            marginTop: Dimensions.get('screen').height / 100 * 2,
            flex: 1
        },
        SearchBarStyle: {
            height: Dimensions.get('screen').height / 16,
            backgroundColor: theme.colors.GREENDARK
        },
        listBox2: {
            flex: 2,
            marginVertical: RFPercentage(3),
            marginTop: RFPercentage(8),
            justifyContent: 'center',
            alignItems: 'center',
        },
        textInputStyle: {
            fontSize: RFValue(16, 680)
        },
        clearIconImageStyle: {
            width: RFPercentage(2),
            height: RFPercentage(2)
        },
        searchIconImageStyle: {
            width: RFPercentage(2),
            height: RFPercentage(2)
        },
        containerAutoComplete: {
            flex: 1,
            flexDirection: 'row',
            alignSelf: 'center',
            borderRadius: 2,
            position: 'absolute',
            width: '88%',
            padding: 10,
            zIndex: 1,
            marginTop: Dimensions.get('screen').height / 15,
            maxHeight: 400,
            shadowColor: '#000',
            ...Platform.select({
                ios: {
                    shadowOffset: {
                        width: 0,
                        height: 5
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 6,
                },
                android: {
                    elevation: 3,
                }
            })
        },
        item: {
            flex: 1,
            marginBottom: 10,
            paddingVertical: 10,
        },
        btn: {
            padding: 10,
            marginHorizontal: 5,
            backgroundColor: '#fff',
            borderRadius: 30,
            ...Platform.select({
                ios: {
                    shadowOffset: {
                        width: 0,
                        height: 5
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 6,
                },
                android: {
                    elevation: 3,
                }
            })
        },
        loading: {
            width: "100%",
            height: "100%",
            backgroundColor: '#fff'
        }
    });
    return styles;
}


export default createStyles;
