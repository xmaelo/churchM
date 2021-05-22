/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Drawer from './src/navigation/Drawer';



const App: () => Node = () => {
  return (
    <>
      <Drawer/>
    </>
  );
};


export default App;
