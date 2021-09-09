import React, {Component} from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import {connect} from 'react-redux';
import {getTranslation} from '../store/actions/translateAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = {
  en: 'https://mocki.io/v1/adb96296-b379-4bde-87cb-5b737c6a46bf',
  it: 'https://mocki.io/v1/125a0f74-2e77-434c-8897-0e2bc974a380',
  hn: 'https://mocki.io/v1/f8e5c307-78b3-4e8c-bc90-9532e670d870',
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
          this.props.getTranslation(API.en);
        }
      })
      .catch(error => {
        console.log('Async error => ', error);
      });
  }
  render() {
    const {data} = this.props;
    const {loadedData} = this.state;
    // console.log(loadedData);
    console.log(data);
    return (
      <SafeAreaView>
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
        <Text>
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
