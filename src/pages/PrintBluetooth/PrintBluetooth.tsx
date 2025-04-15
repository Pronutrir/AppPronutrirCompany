import React, { useCallback, useContext, useEffect, memo } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  AppState,
} from 'react-native';
import { styles } from './styles';
import SamplePrint from './SamplePrint';
import PrintBluetoothContext, {
  IDevices,
} from '../../contexts/printBluetoothContext';
import CardSimples from '../../components/Cards/CardSimples';
import PressableRipple from '../../components/ripple/PressableRipple';
import SelectedDropdownOptions from '../../components/selectedDropdown/SelectedDropdownOptions';

const PrintBluetooth = (): JSX.Element => {
  const {
    scanBluetoothDevice,
    loading,
    bleOpend,
    pairedDevices,
    BluetoothManagerCheck,
    selectDevice,
    saveDevice,
  } = useContext(PrintBluetoothContext);

  const onAppStateChange = useCallback(async () => {
    await BluetoothManagerCheck();
    if (bleOpend) {
      scanBluetoothDevice();
    }
  }, []);

  const selectedDevice = (device: IDevices) => {
    try {
      saveDevice(device);
    } catch (error) {
      console.log('selectedDevice', 'Error');
    }
  };

  useEffect(() => {
    AppState.addEventListener('focus', onAppStateChange);
  }, []);

  console.log('PrintBluetooth', selectDevice);

  useEffect(() => {
    if (!selectDevice) {
      scanBluetoothDevice();
    }
  }, []);

  return (
    <ScrollView style={styles({}).container}>
      <View style={styles({}).bluetoothStatusContainer}>
        <Text
          style={
            styles({ colorBluetoothStatus: bleOpend ? '#47BF34' : '#A8A9AA' })
              .bluetoothStatus
          }>
          Bluetooth {bleOpend ? 'Ativo' : 'Não Ativo'}
        </Text>
      </View>
      {!bleOpend && (
        <Text style={styles({}).bluetoothInfo}>
          Por favor, ative seu bluetooth
        </Text>
      )}
      {bleOpend && (
        <>
          <Text style={styles({}).sectionTitle}>
            Bluetooth conectado a este celular:
          </Text>
          {loading ? <ActivityIndicator animating={true} /> : null}
          <View style={styles({}).containerList}>
            {pairedDevices.length > 0 ? (
              <SelectedDropdownOptions
                selectedIndex={selectDevice?.index}
                onChange={({ value }) => selectedDevice(value)}
                data={pairedDevices.map((item, index) => {
                  return {
                    index: index,
                    label: `${item.name} - ${item.address}`,
                    value: { ...item, index: index },
                  };
                })}
              />
            ) : (
              <CardSimples>
                <PressableRipple
                  style={{ flex: 1 }}
                  onPressIn={() => scanBluetoothDevice()}>
                  <Text style={{ textAlign: 'center', margin: 10 }}>
                    Verificar Dispositivos
                  </Text>
                </PressableRipple>
              </CardSimples>
            )}
          </View>
          <SamplePrint />
          <View style={{ height: 100 }} />
        </>
      )}
    </ScrollView>
  );
};

export default memo(PrintBluetooth);
