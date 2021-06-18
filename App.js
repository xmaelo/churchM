/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Drawers from './src/navigation/Drawer';
import SplashScreen from "react-native-lottie-splash-screen";
import {logo} from "./src/assets"
import ConnectyCube from "react-native-connectycube";
import { Provider } from 'react-redux'
import store from './src/store'

const CONFIG = {
  debug: { mode: 1 }
};
const CREDENTIALS = {
  appId: 5002,
  authKey: "9mmUxO58paU7NAq",
  authSecret: "zLxuDxJhTqKE6eD"
};

const App: () => Node = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
      SplashScreen.hide();
      ConnectyCube.init(CREDENTIALS, CONFIG);
    }, []);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#019CD9" />
      <Drawers/>
    </Provider>
  );
};


export default App;
