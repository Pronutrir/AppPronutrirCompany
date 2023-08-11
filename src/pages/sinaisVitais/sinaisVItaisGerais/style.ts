import { StyleSheet, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { ThemeContextData } from "../../../contexts/themeContext";

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: Dimensions.get('screen').width,
            paddingVertical: 10,
            backgroundColor: theme.colors.BACKGROUND_2,
            marginBottom: 10
        },
        SearchBarStyle: {
            width: '90%',
            height: Dimensions.get('screen').height / 16,
            backgroundColor: theme.colors.GREENDARK,
        },
        textInputStyle: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_TERTIARY,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        clearIconImageStyle: {
            width: RFPercentage(2),
            height: RFPercentage(2),
        },
        searchIconImageStyle: {
            width: RFPercentage(2),
            height: RFPercentage(2),
        },
          loading:{
            width: "100%",
            height: "100%",
            backgroundColor: '#fff'
          },
          item: {
            flex: 1,
            marginBottom: 10,
            paddingVertical: 10
          },
    });
    return styles;
}

export default createStyles;
