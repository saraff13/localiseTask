import React, {Component} from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import {connect} from 'react-redux';
import {getTranslation} from '../store/actions/translateAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = {
  en: 'https://mocki.io/v1/c7324898-e0d7-48bf-aaf0-50d0ffa845dc',
  it: 'https://mocki.io/v1/0edb5bd3-dec9-4ceb-8c31-c9273d8112d2',
  hn: 'https://mocki.io/v1/b19dccb1-0222-4075-a31b-cc43ae324644',
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
        }
      })
      .catch(error => console.log('Async error => ', error));
  }
  render() {
    const {data} = this.props;
    const {loadedData} = this.state;
    console.log(loadedData);
    // console.log(data);
    return (
      <SafeAreaView>
        <Button
          title="English"
          onPress={() => this.props.getTranslation(API.en)}
        />
        <Button
          title="Hindi"
          onPress={() => this.props.getTranslation(API.hn)}
        />
        <Button
          title="Italian"
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
