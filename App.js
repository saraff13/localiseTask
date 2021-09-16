import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import 'react-native-gesture-handler';
import AuthNavigator from './src/navigation/AuthNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <AuthNavigator />
    </Provider>
  );
};

export default App;
