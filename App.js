import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import 'react-native-gesture-handler';
import AuthNavigator from './src/navigation/AuthNavigator';
import CodePush from 'react-native-code-push';

const CODE_PUSH_OPTIONS = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};

const App = () => {
  syncWithCodePush = status => {
    console.log(status);
  };
  useEffect(() => {
    CodePush.sync(
      {installMode: CodePush.InstallMode.IMMEDIATE},
      syncWithCodePush,
      null,
    );
  }, []);

  return (
    <Provider store={store}>
      <AuthNavigator />
    </Provider>
  );
};

export default CodePush(CODE_PUSH_OPTIONS)(App);
