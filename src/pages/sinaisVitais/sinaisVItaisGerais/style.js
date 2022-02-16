import { StyleSheet, Dimensions } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('screen').width,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    SearchBarStyle: {
        width: '85%',
        height: Dimensions.get('screen').height / 16,
        backgroundColor: '#08948A',
    },
    textInputStyle: {
        fontSize: RFValue(16, 680),
    },
    clearIconImageStyle: {
        width: RFPercentage(2),
        height: RFPercentage(2),
    },
    searchIconImageStyle: {
        width: RFPercentage(2),
        height: RFPercentage(2),
    },
    containerAutoComplete: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#fff',
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
      descricao: {
        color: '#1E707D',
        fontSize: RFValue(16, 680)
      },
      selectTextStyle: {
        color: '#08948A',
        textAlign: 'center',
        fontSize: RFValue(18, 680),
    },
});

export default styles;
