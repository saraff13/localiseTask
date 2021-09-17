import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Notification from '../screens/Notification';
import {
  getTranslation,
  setTranslationData,
} from '../store/actions/translateAction';
import {useDispatch} from 'react-redux';
import {fetchSavedLangFile} from '../utils/FileHandlingFunctions';
import {fetchSavedLang} from '../utils/RealmFunctions';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
