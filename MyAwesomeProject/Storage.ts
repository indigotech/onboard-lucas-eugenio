import { AsyncStorage } from 'react-native'

export const tokenKeyName: string = "TokenKey"

export async function getToken(): Promise<string|null> {
    const token = await AsyncStorage.getItem(tokenKeyName)
    return token ? token : ''
}

export function storeTokenOnStorage(token: string): Promise<void> {
    return AsyncStorage.setItem(tokenKeyName, token)
}