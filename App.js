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
import AnimatedSplash from "react-native-animated-splash-screen";
import {logo} from "./src/assets"

const App: () => Node = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
      <>
        <StatusBar backgroundColor="#019CD9" />
        <Drawers/>
      </>
  );
};


export default App;
