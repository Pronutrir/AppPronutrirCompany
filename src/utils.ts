import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPerfis } from './reducers/UserReducer';

export async function getUser() {
    const user = await AsyncStorage.getItem('@User');
    return user != null ? JSON.parse(user) : null;
}

export async function saveUser(useToken: any) {
    await AsyncStorage.setItem('@User', JSON.stringify(useToken));
}

export async function store(useToken: any) {
    return await AsyncStorage.setItem('@User', useToken);
}

export async function deleteUser() {
    await AsyncStorage.removeItem('@User');
}

export async function mergeUser(useToken: any) {
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

export async function savePerfil(Perfil: IPerfis) {
    await AsyncStorage.setItem('@Perfil', JSON.stringify(Perfil));
}

export async function getPerfil(): Promise<IPerfis> {
    const user = await AsyncStorage.getItem('@Perfil');
    return user != null ? JSON.parse(user) : null;
}
