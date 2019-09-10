import { AsyncStorage } from 'react-native'

export const keyName: string = "TokenKey"

export async function getTokenOnMemory(): Promise<string> {
  const token = await AsyncStorage.getItem(keyName)
  return token ? token : ''
}


export function getTokenLocal(): string {
  const token = localStorage.getItem(keyName)
  return token ? token : ''
}

export function storeTokenOnMemory(token: string): Promise<void> {
  return AsyncStorage.setItem(keyName, token)
}

export function storeTokenLocal(token: string) {
  localStorage.setItem(keyName, token)
}