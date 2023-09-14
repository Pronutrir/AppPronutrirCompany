import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  DeviceEventEmitter,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { BluetoothManager } from '@brooons/react-native-bluetooth-escpos-printer';
//import { PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';
import { styles } from './styles';
import ItemList from './ItemList';
import SamplePrint from './SamplePrint';
//var { height, width } = useWindowDimensions()

interface Devices {
  name: string;
  address: string;
}

const PrintBluetooth = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  //const [devices, setDevices] = useState(null)
  const [pairedDevices, setPairedDevices] = useState<Devices[]>([]);
  const [foundDs, setFoundDs] = useState<any[]>([]);
  const [bleOpend, setBleOpend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [boundAddress, setBoundAddress] = useState('');

  const deviceAlreadPaired = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (rsp: any) => {
      let ds = null;
      if (typeof rsp.devices == 'object') {
        ds = rsp.devices;
      } else {
        try {
          ds = JSON.parse(rsp.devices);
        } catch (e) {
          ('');
        }
      }
      if (ds && ds.length) {
        let pared = pairedDevices;
        if (pared.length < 1) {
          pared = pared.concat(ds || []);
        }
        setPairedDevices(pared);
      }
    },
    [pairedDevices],
  );

  const deviceFoundEvent = useCallback(
    (rsp: any) => {
      let r: any = null;
      try {
        if (typeof rsp.device == 'object') {
          r = rsp.device;
        } else {
          r = JSON.parse(rsp.device);
        }
      } catch (e) {
        //alert(e.message);
        //ignore
      }

      if (r) {
        const found = foundDs || [];
        if (found.findIndex) {
          const duplicated = found.findIndex(function (x: any) {
            return x.address == r.address;
          });
          //CHECK DEPLICATED HERE...
          if (duplicated == -1) {
            found.push(r);
            setFoundDs(found);
          }
        }
      }
    },
    [foundDs],
  );

  const connect = (row: Devices) => {
    setLoading(true);
    BluetoothManager.connect(row.address).then(
      () => {
        setLoading(false);
        setBoundAddress(row.address);
        setName(row.name || 'UNKNOWN');
      },
      () => {
        setLoading(false);
      },
    );
  };

  const unPair = (address: string) => {
    setLoading(true);
    BluetoothManager.disconnect(address).then(
      () => {
        setLoading(false);
        setBoundAddress('');
        setName('');
      },
      () => {
        setLoading(false);
      },
    );
  };

  const scanDevices = useCallback(async () => {
    setLoading(true);
    const {
      found,
      paired,
    }: {
      found: Array<{ address: string; name?: string }>;
      paired: [];
    } = JSON.parse(await BluetoothManager.scanDevices());

    return {
      paired,
      found: found.filter(device => !!device.name),
    };
  }, [foundDs]);

  const blueTooth = async () => {
    const permissions = {
      title: 'FirePrint pede permissão para acessar o bluetooth',
      message:
        'FirePrint requer acesso ao bluetooth para o processo de conexão a uma impressora bluetooth',
      buttonNeutral: 'Lembrar mais tarde',
      buttonNegative: 'Não Permitir',
      buttonPositive: 'Permitir',
    };

    const bluetoothConnectGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      permissions,
    );
    if (bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED) {
      const bluetoothScanGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        permissions,
      );
      if (bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED) {
        scanDevices();
      }
    } else {
      // ignore akses ditolak
    }
  };

  const scan = useCallback(() => {
    try {
      blueTooth();
    } catch (err) {
      console.warn(err);
    }
  }, [scanDevices]);

  const scanBluetoothDevice = async () => {
    setLoading(true);
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]).then(stattuses => {
      console.log(stattuses);
      if (
        stattuses['android.permission.ACCESS_FINE_LOCATION'] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        scanDevices();
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    BluetoothManager.checkBluetoothEnabled().then(
      enabled => {
        setBleOpend(Boolean(enabled));
        setLoading(false);
      },
      err => {
        err;
      },
    );

    if (Platform.OS === 'ios') {
      const bluetoothManagerEmitter = new NativeEventEmitter();
      bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED.toString(),
        rsp => {
          deviceAlreadPaired(rsp);
        },
      );
      bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND.toString(),
        rsp => {
          deviceFoundEvent(rsp);
        },
      );
    } else if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED.toString(),
        rsp => {
          deviceAlreadPaired(rsp);
        },
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND.toString(),
        rsp => {
          deviceFoundEvent(rsp);
        },
      );
    }
  }, [boundAddress, deviceAlreadPaired, deviceFoundEvent, pairedDevices, scan]);

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
      <Text style={styles({}).sectionTitle}>
        Impressora conectada ao aplicativo:
      </Text>
      {boundAddress.length > 0 && (
        <ItemList
          label={name}
          value={boundAddress}
          onPress={() => unPair(boundAddress)}
          actionText="Desconectar"
          color="#E9493F"
        />
      )}
      {boundAddress.length < 1 && (
        <Text style={styles({}).printerInfo}>
          Ainda não há nenhuma impressora conectada
        </Text>
      )}
      <Text style={styles({}).sectionTitle}>
        Bluetooth conectado a este celular:
      </Text>
      {loading ? <ActivityIndicator animating={true} /> : null}
      <View style={styles({}).containerList}>
        {pairedDevices.map((item, index) => {
          return (
            <ItemList
              key={index}
              onPress={() => connect(item)}
              label={item.name}
              value={item.address}
              connected={item.address === boundAddress}
              actionText="Conectar"
              color="#00BCD4"
            />
          );
        })}
      </View>
      <SamplePrint />
      <Button onPress={() => scanBluetoothDevice()} title="Scan Bluetooth" />
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default PrintBluetooth;
