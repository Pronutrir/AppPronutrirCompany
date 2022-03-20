import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(2),
  },
  box: {
    flex: 1,
  },
  item1: {
    flex: 1,
    alignItems: 'flex-start',
  },
  item2: {
    flex: 1
  },
  item3: {

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
  item: {
    flex: 1,
    marginBottom: 10,
    paddingVertical: 10
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
    fontSize: RFValue(16, 680),
    flexWrap: 'wrap',
  },
  boxLabel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  modalAlert: {
    alignSelf: 'flex-end',
}
})

export default styles;
