import { AsyncStorage } from 'react-native'

export const keyName: string = "TokenKey"

export async function getToken(): Promise<string> {
    const token = await AsyncStorage.getItem(keyName)
    return token ? token : ''
}


export function localGetToken(): string {
    const token = localStorage.getItem(keyName)
    return token ? token : ''
}

export function storeToken(token: string): Promise<void> {
    return AsyncStorage.setItem(keyName, token)
}

export function localStoreToken(token: string) {
    localStorage.setItem(keyName, token)
}