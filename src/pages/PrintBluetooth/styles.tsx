import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface StylesProps {
  colorBluetoothStatus?: string
}
interface StyleSheetType {
  container: ViewStyle,
  containerList: ViewStyle,
  bluetoothStatusContainer: ViewStyle,
  bluetoothStatus: TextStyle,
  bluetoothInfo: TextStyle,
  sectionTitle: TextStyle,
  printerInfo: TextStyle
}

type StylesFunctionProps = (props: StylesProps) => StyleSheetType


export const styles: StylesFunctionProps = ({ colorBluetoothStatus }) => StyleSheet.create<StyleSheetType>({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  containerList: { flex: 1, flexDirection: 'column' },
  bluetoothStatusContainer: { justifyContent: 'flex-end', alignSelf: 'flex-end' },
  bluetoothStatus:{
    backgroundColor: colorBluetoothStatus,
    padding: 8,
    borderRadius: 2,
    color: 'white',
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  bluetoothInfo: { textAlign: 'center', fontSize: 16, color: '#FFC806', marginBottom: 20 },
  sectionTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  printerInfo: { textAlign: 'center', fontSize: 16, color: '#E9493F', marginBottom: 20 },
});