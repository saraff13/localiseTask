import React, {useState, useEffect} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getTranslation} from '../store/actions/translateAction';
import {
  addLanguage,
  filterActiveLanguage,
  updateStatus,
  getLanguageData,
  queryAllLanguages,
} from '../databases/schema';
import {API} from '../utils/api';

const Home = ({navigation}) => {
  const [loadedData, setLoadedData] = useState('');
  const dispatch = useDispatch();
  const data = useSelector(state => state.translateReducer.data);

  useEffect(() => {
    filterActiveLanguage()
      .then(language => {
        if (language.length) {
          console.log('filter success => ', language);
          setLoadedData(language[0]);
        } else {
          dispatch(getTranslation(API.en));
        }
      })
      .catch(error => console.log('filter error => ', error));
  }, []);

  useEffect(() => {
    if (data) {
      const newLanguage = {
        id: data.id,
        name: data.name,
        how: data.how,
        boiledEgg: data.boiledEgg,
        softBoiledEgg: data.softBoiledEgg,
        choice: data.choice,
        active: 'true',
      };
      addLanguage(newLanguage)
        .then(() => console.log('successfully added'))
        .catch(error => console.log('realm addition error => ', error));
      queryAllLanguages()
        .then(languages => {
          console.log('query => ', languages);
        })
        .catch(error => console.log('query realm error => ', error));
      setLoadedData(data);
    }
  }, [data]);

  const changeLanguage = (api, id) => {
    // console.log('Language id =>', id);
    if (loadedData && loadedData.id === id) {
      return;
    }

    getLanguageData(id)
      .then(language => {
        if (language) {
          if (loadedData) {
            console.log('Loaded Data=>', loadedData);
            updateStatus(loadedData.id, 'false')
              .then(() =>
                console.log('successfully disabled => ', loadedData.id),
              )
              .catch(error => console.log('disabled error => ', error));
          }
          updateStatus(id, 'true')
            .then(value => {
              console.log('successfully enabled => ', id);
              setLoadedData(value);
            })
            .catch(error => console.log('enabled error => ', error));
          // console.log('get language data => ', language);
          console.log('Langauge Found');
          setLoadedData(language);
        } else {
          updateStatus(loadedData.id, 'false')
            .then(() => console.log('successfully disabled => ', loadedData.id))
            .catch(error => console.log('disabled error => ', error));
          dispatch(getTranslation(api));
        }
      })
      .catch(error => {
        console.log('Get Language error=>', error);
      });
  };

  return (
    <SafeAreaView style={[styles.main]}>
      <View style={[styles.languageBox]}>
        <Button title={'English'} onPress={() => changeLanguage(API.en, 1)} />
        <Button title={'हिंदी'} onPress={() => changeLanguage(API.hn, 2)} />
        <Button title={'italiana'} onPress={() => changeLanguage(API.it, 3)} />
      </View>

      <Text style={[styles.text]}>My Lang: {loadedData && loadedData.how}</Text>

      <View>
        <Button
          title="go to Profile"
          onPress={() => navigation.navigate('Profile')}
        />
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
