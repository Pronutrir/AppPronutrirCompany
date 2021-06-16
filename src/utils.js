import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getUser() {
    try {
        const user = await AsyncStorage.getItem('@User');
        return user != null ? JSON.parse(user) : null
    } catch (e) {
        throw e;
    }
}

export async function saveUser(useToken) {
    try {
        await AsyncStorage.setItem('@User', JSON.stringify(useToken))
    } catch (e) {
        throw e;
    }
}

export async function store(useToken) {
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

export async function mergeUser(useToken) {
    try {
        await AsyncStorage.mergeItem('@User', JSON.stringify(useToken))
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

export async function saveUserTasy(useTasy) {
    try {
        await AsyncStorage.setItem('@UserTasy', JSON.stringify(useTasy))
    } catch (e) {
        throw e;
    }
}

export async function mergerUserTasy(userTasy) {
    try {
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