import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (user) => {
  try {
    const jsonValue = JSON.stringify(user)
    await AsyncStorage.setItem('@user', jsonValue)
  } catch (e) {
    console.log('error saving data', e)
  }
}

const getData1 = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log('errr reading data', e)
    return null;
  }
}

export const getData = getData1

export const storeDataNull = async () => {
  try {
    await AsyncStorage.removeItem('@user')
  } catch (e) {
    console.log('error saving data', e)
  }
}