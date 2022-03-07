import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPerfis } from './reducers/UserReducer';

export async function getUser() {
    try {
        const user = await AsyncStorage.getItem('@User');
        return user != null ? JSON.parse(user) : null
    } catch (e) {
        throw e;
    }
}

export async function saveUser(useToken: any) {
    try {
        await AsyncStorage.setItem('@User', JSON.stringify(useToken))
    } catch (e) {
        throw e;
    }
}

export async function store(useToken: any) {
    try {
        return await AsyncStorage.setItem('@User', useToken)
    } catch (e) {
        throw e;
    }
}

export async function deleteUser() {
    try {
        await AsyncStorage.removeItem('@User')
    } catch (e) {
        throw e;
    }
}

export async function mergeUser(useToken: any) {
    try {
        if(AsyncStorage.mergeItem)
        await AsyncStorage?.mergeItem('@User', JSON.stringify(useToken))
    } catch (e) {
        throw e;
    }
}

export async function getUserTasy() {
    try {
        const user = await AsyncStorage.getItem('@UserTasy')
        return user != null ? JSON.parse(user) : null
    } catch (e) {
        throw e;
    }
}

export async function saveUserTasy(useTasy: any) {
    try {
        await AsyncStorage.setItem('@UserTasy', JSON.stringify(useTasy))
    } catch (e) {
        throw e;
    }
}

export async function mergerUserTasy(userTasy: any) {
    try {
        if(AsyncStorage.mergeItem)
        await AsyncStorage.mergeItem('@UserTasy', JSON.stringify(userTasy))
    } catch (e) {
        throw e;
    }
}

export async function deleteUserTasy() {
    try {
        await AsyncStorage.removeItem('@UserTasy')
    } catch (e) {
        throw e;
    }
}

export async function savePerfil(Perfil: IPerfis) {
    try {
        await AsyncStorage.setItem('@Perfil', JSON.stringify(Perfil))
    } catch (e) {
        throw e;
    }
}

export async function getPerfil(): Promise<IPerfis> {
    try {
        const user = await AsyncStorage.getItem('@Perfil');
        return user != null ? JSON.parse(user) : null
    } catch (e) {
        throw e;
    }
}

