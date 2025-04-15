import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUnidade } from './hooks/useEstabelecimentos';
import { IPerfis } from './reducers/UserReducer';
import { IDevices } from './contexts/printBluetoothContext';

export async function getUser() {
  const user = await AsyncStorage.getItem('@User');
  return user != null ? JSON.parse(user) : null;
}

export async function saveRefreshToken(refreshToken: string) {
  await AsyncStorage.setItem('@RefreshToken', JSON.stringify(refreshToken));
}

export async function getRefreshToken() {
  const refreshtoken = await AsyncStorage.getItem('@RefreshToken');
  return refreshtoken != null ? JSON.parse(refreshtoken) : null;
}

export async function mergeRefreshToken(refreshToken: string) {
  if (AsyncStorage.mergeItem)
    await AsyncStorage?.mergeItem(
      '@RefreshToken',
      JSON.stringify(refreshToken),
    );
}

export async function deleteRefreshToken() {
  await AsyncStorage.removeItem('@RefreshToken');
}

export async function saveUser(useToken: string) {
  await AsyncStorage.setItem('@User', JSON.stringify(useToken));
}

export async function store(useToken: string) {
  return await AsyncStorage.setItem('@User', useToken);
}

export async function deleteUser() {
  await AsyncStorage.removeItem('@User');
}

export async function mergeUser(useToken: string) {
  if (AsyncStorage.mergeItem)
    await AsyncStorage?.mergeItem('@User', JSON.stringify(useToken));
}

export async function getUserTasy() {
  const user = await AsyncStorage.getItem('@UserTasy');
  return user != null ? JSON.parse(user) : null;
}

export async function saveUserTasy(useTasy: any) {
  await AsyncStorage.setItem('@UserTasy', JSON.stringify(useTasy));
}

export async function mergerUserTasy(userTasy: any) {
  if (AsyncStorage.mergeItem)
    await AsyncStorage.mergeItem('@UserTasy', JSON.stringify(userTasy));
}

export async function deleteUserTasy() {
  await AsyncStorage.removeItem('@UserTasy');
}

export async function saveUnidade(Unidade: IUnidade) {
  await AsyncStorage.setItem('@Unidade', JSON.stringify(Unidade));
}

export async function getUnidade(): Promise<IUnidade> {
  const user = await AsyncStorage.getItem('@Unidade');
  return user != null ? JSON.parse(user) : null;
}

export async function savePerfil(Perfil: IPerfis) {
  await AsyncStorage.setItem('@Perfil', JSON.stringify(Perfil));
}

export async function getPerfil(): Promise<IPerfis> {
  const user = await AsyncStorage.getItem('@Perfil');
  return user != null ? JSON.parse(user) : null;
}

export async function getImpressora(): Promise<IDevices> {
  const impressora = await AsyncStorage.getItem('@Impressora');
  return impressora != null ? JSON.parse(impressora) : null;
}

export async function saveImpressora(impressora: IDevices) {
  try {
    await AsyncStorage.setItem('@Impressora', JSON.stringify(impressora));
  } catch (error) {
    //console.log('saveImpressora', error);
  }
}

export async function mergeImpressora(impressora: IDevices) {
  if (AsyncStorage.mergeItem)
    await AsyncStorage?.mergeItem('@Impressora', JSON.stringify(impressora));
}
