import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';

interface StylesProps {
  buttonColor?: string;
}
interface StyleSheetType {
  container: ViewStyle;
  label: TextStyle;
  connected: TextStyle;
  button: TextStyle;
  actionText: TextStyle;
}

type StylesFunctionProps = (props: StylesProps) => StyleSheetType;

interface Props {
  label: string;
  value: string;
  onPress: () => void;
  connected?: boolean;
  actionText: string;
  color: string;
}

const ItemList = ({
  label,
  value,
  onPress,
  connected,
  actionText,
  color = '#00BCD4',
}: Props) => {
  return (
    <View style={styles({}).container}>
      <View>
        <Text style={styles({}).label}>{label || 'UNKNOWN'}</Text>
        <Text>{value}</Text>
      </View>
      {connected && <Text style={styles({}).connected}>Conectado</Text>}
      {!connected && (
        <TouchableOpacity
          onPress={onPress}
          style={styles({ buttonColor: color }).button}>
          <Text style={styles({}).actionText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ItemList;

const styles: StylesFunctionProps = ({ buttonColor }) =>
  StyleSheet.create<StyleSheetType>({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'transparent',
      marginBottom: 12,
      padding: 12,
      borderRadius: 4,
    },
    label: { fontWeight: 'bold' },
    connected: { fontWeight: 'bold', color: '#00BCD4' },
    button: {
      backgroundColor: buttonColor,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 4,
    },
    actionText: { color: 'white' },
  });
