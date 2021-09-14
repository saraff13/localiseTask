import React, {Component} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {getTranslation} from '../store/actions/translateAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addLanguage,
  deleteLanguage,
  queryAllLanguages,
} from '../databases/schema';

const API = {
  en: 'https://mocki.io/v1/4b81fc7f-6886-4ca0-8a82-ecdeed8d244e',
  it: 'https://mocki.io/v1/c4a8e3c6-4df5-4924-b82c-a071bcba52a1',
  hn: 'https://mocki.io/v1/d534f590-0456-44d3-a0e8-f5529717e053',
};

class Home extends Component {
  state = {
    loadedData: '',
  };
  componentDidMount() {
    AsyncStorage.getItem('Lang')
      .then(data => {
        if (data) {
          this.setState({loadedData: JSON.parse(data)});
        } else {
          // this.props.getTranslation(API.en);
        }
      })
      .catch(error => {
        console.log('Async error => ', error);
      });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data != this.props.data) {
      const newData = this.props.data && this.props.data[0];
      // console.log(newData);
      const newLanguage = {
        _id: newData.id,
        name: newData.name,
        how: newData.how,
        boiledEgg: newData.boiledEgg,
        softBoiledEgg: newData.softBoiledEgg,
        choice: newData.choice,
      };
      // if (prevProps.data) {
      //   // console.log('Previous Props => ', prevProps.data);
      //   deleteLanguage(prevProps.data[0].id)
      //     .then(() => console.log('successfully deleted'))
      //     .catch(error => console.log('deletion error => ', error));
      // }
      // console.log(newLanguage);
      addLanguage(newLanguage)
        .then(() => console.log('successfully added'))
        .catch(error => console.log('realm addition error => ', error));
      queryAllLanguages()
        .then(languages => {
          console.log('query => ', languages);
        })
        .catch(error => console.log('query realm error => ', error));
      return true;
    }
    return false;
  }
  render() {
    const {data} = this.props;
    const {loadedData} = this.state;
    return (
      <SafeAreaView style={[styles.main]}>
        <View style={[styles.languageBox]}>
          <Button
            title={'English'}
            onPress={() => this.props.getTranslation(API.en)}
          />
          <Button
            title={'हिंदी'}
            onPress={() => this.props.getTranslation(API.hn)}
          />
          <Button
            title={'italiana'}
            onPress={() => this.props.getTranslation(API.it)}
          />
        </View>

        <Text style={[styles.text]}>
          My Lang: {data ? data[0].how : loadedData && loadedData[0].how}
        </Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  data: state.translateReducer.data,
});

export default connect(mapStateToProps, {getTranslation})(Home);

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
