import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10
  },
  SearchBarBoxStyle: {
    marginTop: Dimensions.get('screen').height / 100 * 2,
    flex: 1
  },
  SearchBarStyle: {
    height: Dimensions.get('screen').height / 15,
    backgroundColor: "#08948A"
  },
  box1: {
    flex: 0.1
  },
  box2: {
    flex: 2,
    marginVertical: RFPercentage(1, 680)
  },
  item1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item2: {
    flex: 1
  },
  box3: {
    flex: 0.2
  },
  textInputStyle: {
    fontSize: RFValue(20, 680)
  },
  clearIconImageStyle: {
    width: RFValue(20, 680),
    height: RFValue(20, 680)
  },
  searchIconImageStyle: {
    width: RFValue(20, 680),
    height: RFValue(20, 680)
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
  item: {
    flex: 1,
    marginBottom: 10
  },
  descricao: {
    color: '#1E707D',
    fontSize: RFValue(16, 680)
  },
  label: {
    color: '#1E707D',
    fontSize: RFValue(16, 680),
    fontWeight: 'bold'
  },
  text: {
    color: '#1E707D',
    fontSize: RFValue(16, 680)
  },
})

export default styles;
