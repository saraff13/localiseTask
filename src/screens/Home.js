import React, {useState, useEffect} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getTranslation} from '../store/actions/translateAction';
import {
  addLanguage,
  deleteLanguage,
  filterActiveLanguage,
  updateStatus,
  getLanguageData,
  queryAllLanguages,
} from '../databases/schema';

const API = {
  en: 'https://mocki.io/v1/4b81fc7f-6886-4ca0-8a82-ecdeed8d244e',
  it: 'https://mocki.io/v1/c4a8e3c6-4df5-4924-b82c-a071bcba52a1',
  hn: 'https://mocki.io/v1/d534f590-0456-44d3-a0e8-f5529717e053',
};

const Home = () => {
  const [loadedData, setLoadedData] = useState('');
  const dispatch = useDispatch();
  const data = useSelector(state => state.translateReducer.data);

  useEffect(() => {
    if (data) setLoadedData(data[0]);
  });

  const changeLanguage = (api, id) => {
    console.log('Language id =>', id);
    dispatch(getTranslation(api));
  };

  return (
    <SafeAreaView style={[styles.main]}>
      <View style={[styles.languageBox]}>
        <Button title={'English'} onPress={() => changeLanguage(API.en, 1)} />
        <Button title={'हिंदी'} onPress={() => changeLanguage(API.hn, 2)} />
        <Button title={'italiana'} onPress={() => changeLanguage(API.it, 3)} />
      </View>

      <Text style={[styles.text]}>My Lang: {loadedData && loadedData.how}</Text>
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
  },
});
