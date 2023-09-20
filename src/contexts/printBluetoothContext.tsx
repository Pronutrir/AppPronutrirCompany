import {
  BluetoothEscposPrinter,
  BluetoothManager,
} from '@brooons/react-native-bluetooth-escpos-printer';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import {
  DeviceEventEmitter,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { getImpressora, saveImpressora } from '../utils';
import { PropsGerarSenhaResponse } from '../hooks/usePainelSenha';
import LogoBase64 from '../assets/imagens/logaBase64';
import moment from 'moment';

interface AuthContextData {
  loading: boolean;
  deviceAlreadPaired(rsp: any): void;
  scanBluetoothDevice(): Promise<void>;
  bleOpend: boolean;
  boundAddress: string;
  unPair(row: IDevices): Promise<void>;
  connect(row: IDevices): Promise<void>;
  pairedDevices: IDevices[];
  name: string;
  validationBluetooth(): Promise<boolean>;
  BluetoothManagerCheck(): Promise<void>;
  selectDevice: IDevices | undefined;
  setSelectDevice: React.Dispatch<React.SetStateAction<IDevices | undefined>>;
  validationImpress: () => Promise<boolean>;
  printSenha: (item: PropsGerarSenhaResponse) => Promise<void>;
  saveDevice: (device: IDevices) => Promise<void>;
}

export interface IDevices {
  index: number;
  name: string;
  address: string;
}

const PrintBluetoothContext = createContext({} as AuthContextData);

export const PrintBluetoothProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [pairedDevices, setPairedDevices] = useState<IDevices[]>([]);
  const [foundDs, setFoundDs] = useState<any[]>([]);
  const [bleOpend, setBleOpend] = useState(false);
  const [name, setName] = useState('');
  const [boundAddress, setBoundAddress] = useState<string>('');
  const [selectDevice, setSelectDevice] = useState<IDevices>();

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

  const connect = async (row: IDevices) => {
    setLoading(true);
    await BluetoothManager.connect(row.address).then(
      () => {
        setLoading(false);
        setBoundAddress(row.address);
        setName(row.name || 'UNKNOWN');
      },
      error => {
        console.log('connect =>', error);
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
      found: Array<IDevices>;
      paired: [];
    } = JSON.parse(await BluetoothManager.scanDevices());

    return {
      paired,
      found: found.filter(device => Boolean(device.name)),
    };
  }, [foundDs]);

  const scanBluetoothDevice = async () => {
    try {
      setLoading(true);
      const validation = await validationBluetooth();
      if (validation) {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]).then(stattuses => {
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
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('scanBluetoothDevice', error);
    }
  };

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

  const blueTooth = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  const scan = useCallback(() => {
    try {
      blueTooth();
    } catch (err) {
      console.warn(err);
    }
  }, [scanDevices]);

  const unPair = async (row: IDevices) => {
    setTimeout(() => {
      if (selectDevice) {
        BluetoothManager.disconnect(row.address).then(
          () => {
            setLoading(false);
            setBoundAddress('');
            setName('');
          },
          () => {
            ('');
          },
        );
      }
    }, 3000);
  };

  const validationBluetooth = async () => {
    const statusBluetooth = (
      await BluetoothManager.checkBluetoothEnabled()
    ).valueOf();

    if (!statusBluetooth) {
      return !statusBluetooth;
    } else {
      return statusBluetooth;
    }
  };

  const validationDevice = () => {
    if (!selectDevice) {
      return Boolean(!selectDevice);
    } else {
      return Boolean(selectDevice);
    }
  };

  const validationImpress = async () => {
    await validationBluetooth();
    validationDevice();
    return true;
  };

  const BluetoothManagerCheck = async () => {
    try {
      await BluetoothManager.checkBluetoothEnabled().then(
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
    } catch (error) {
      console.log('BluetoothManagerCheck', error);
    }
  };

  const printSenha = async (item: PropsGerarSenhaResponse) => {
    const result = await validationImpress();

    if (!result) {
      return;
    }

    if (selectDevice) {
      console.log('usePrintSenha', selectDevice);
      await connect(selectDevice);

      await BluetoothEscposPrinter.printPic(LogoBase64, {
        width: 150,
        left: 210,
      });
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );
      await BluetoothEscposPrinter.printText('BEM VINDO A PRONUTRIR\r\n', {
        widthtimes: 1,
        fonttype: 2,
      });
      await BluetoothEscposPrinter.printText('\r\n', {});
      await BluetoothEscposPrinter.printText(
        'PACIENTE COM PRIORIDADE NORMAL\r\n\r\n',
        {
          widthtimes: 1,
          fonttype: 1,
        },
      );
      await BluetoothEscposPrinter.printText(
        `${item.dS_LETRA_VERIFICACAO}${item?.cD_SENHA_GERADA}\r\n\r\n`,
        {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 1,
          heigthtimes: 1,
          fonttype: 8,
        },
      );
      await BluetoothEscposPrinter.printText(`${item?.dS_FILA}\r\n\r\n`, {
        encoding: 'CP860',
        codepage: 3,
        fonttype: 3,
        widthtimes: 1,
        heigthtimes: 1,
      });
      await BluetoothEscposPrinter.printText(
        moment(item.dT_GERACAO_SENHA).format('DD/MM/YYYY - H:mm'),
        {
          fonttype: 3,
          widthtimes: 1,
          heigthtimes: 1,
        },
      );
      await BluetoothEscposPrinter.printText('\r\n\r\n\r\n\r\n', {});
      await unPair(selectDevice);
    }
  };

  const saveDevice = async (device: IDevices) => {
    setSelectDevice(device);
    await saveImpressora(device);
  };

  useEffect(() => {
    BluetoothManagerCheck();
    getImpressora().then(item => {
      setSelectDevice(item);
      console.log('useEffect', item);
    });
  }, []);

  return (
    <PrintBluetoothContext.Provider
      value={{
        loading,
        deviceAlreadPaired,
        scanBluetoothDevice,
        bleOpend,
        boundAddress,
        unPair,
        connect,
        pairedDevices,
        name,
        validationBluetooth,
        BluetoothManagerCheck,
        selectDevice,
        setSelectDevice,
        validationImpress,
        printSenha,
        saveDevice,
      }}>
      {children}
    </PrintBluetoothContext.Provider>
  );
};

export default PrintBluetoothContext;
