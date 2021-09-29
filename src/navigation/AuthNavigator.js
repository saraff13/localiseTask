import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Notification from '../screens/Notification';
import Settings from '../screens/Settings';
import {
  getTranslation,
  setTranslationData,
} from '../store/actions/translateAction';
import {useDispatch} from 'react-redux';
import {fetchSavedLangFile} from '../utils/FileHandlingFunctions';
import Help from '../screens/Help';
import Banks from '../screens/Banks';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchSavedLangFile(dispatch, setTranslationData, getTranslation);
    // fetchSavedLang(dispatch, setTranslationData, getTranslation);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Banks" component={Banks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
