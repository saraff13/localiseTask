import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Notification from '../screens/Notification';
import {fetchSavedLanguage} from '../databases/schema';
import {
  getTranslation,
  setTranslationData,
} from '../store/actions/translateAction';
import {useDispatch} from 'react-redux';
import {API} from '../utils/api';
import {readLangFile} from '../utils/FileHandlingFunctions';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    readLangFile(dispatch, setTranslationData, getTranslation);
    // fetchSavedLanguage()
    //   .then(language => {
    //     if (language.length) dispatch(setTranslationData(language[0]));
    //     else dispatch(getTranslation(API.en));
    //   })
    //   .catch(error => console.log('query realm error => ', error));
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
