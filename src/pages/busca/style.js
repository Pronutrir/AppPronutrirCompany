import { Platform, Dimensions, StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const centerSubtitleStyle = (item) => ({
  fontSize: 12,
  marginLeft: 8,
  textAlign: "center",
  color: item.strokeColor,
});

const styles = StyleSheet.create({
    safeAreaViewStyle: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 10
      },
      flatListStyle: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center'
      },
      cardShadowStyle: {
        ...Platform.select({
          ios: {
            shadowRadius: 3,
            shadowOpacity: 0.4,
            shadowColor: "#000",
            shadowOffset: {
              width: 3,
              height: 3,
            },
          },
          android: {
            elevation: 3,
          },
        }),
      },
      SearchBarBoxStyle:{
        marginTop: Dimensions.get('screen').width / 15, 
        flex: 1
      },
      SearchBarStyle:{
        backgroundColor: "#08948A",
        fontSize: RFValue(30, 680),
      },
      cardStyle: {
        width: Dimensions.get('screen').width, 
        marginTop: 16,
        alignItems: "flex-start",
        justifyContent: "center",
        borderBottomWidth: 0.5,
        borderColor: '#7C9292',
        paddingLeft: 10
      },
      container: {
        ...Platform.select({
          android: {
            top: 24,
          },
        }),
        backgroundColor: "#21283d",
      },
      label: {
        marginHorizontal: 10,
        fontSize: RFValue(18, 680),
        color: '#08948A'
      },
      textDescription:{
        marginHorizontal: 10,
        marginVertical: 5,
        fontSize: RFValue(16, 680),
        color: '#7C9292'
      }
      
  });
  
  export default styles;