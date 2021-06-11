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
import SplashScreen from 'react-native-splash-screen';

const App: () => Node = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
      SplashScreen.hide();
    }, []);

  useEffect(() => {
    SplashScreen.hide()
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      logoImage={logo}
      backgroundColor={"#0866C6"}
      logoHeight={150}
      logoWidth={150}
    >
      <>
        <StatusBar backgroundColor="#019CD9" />
        <Drawers/>
      </>
    </AnimatedSplash>
  );
};


export default App;
