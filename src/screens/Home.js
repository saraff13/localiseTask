import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getTranslation} from '../store/actions/translateAction';
import {API} from '../utils/api';
import {deleteLang} from '../utils/RealmFunctions';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.translateReducer.data);

  const changeLanguage = (api, id) => {
    if (data && data.id === id) return;
    if (data) deleteLang(data);
    dispatch(getTranslation(api));
  };

  return (
    <SafeAreaView style={[styles.main]}>
      <View style={[styles.languageBox]}>
        <Button title={'English'} onPress={() => changeLanguage(API.en, 1)} />
        <Button title={'हिंदी'} onPress={() => changeLanguage(API.hn, 2)} />
        <Button title={'italiana'} onPress={() => changeLanguage(API.it, 3)} />
      </View>

      <Text style={[styles.text]}>My Lang: {data && data.how}</Text>

      <View>
        <Button
          title="Profile"
          onPress={() => navigation.navigate('Profile')}
        />
        <Button title="Help" onPress={() => navigation.navigate('Help')} />
        <Button title="Banks" onPress={() => navigation.navigate('Banks')} />
      </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  languageBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
    marginBottom: 150,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});
