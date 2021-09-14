import React, {Component} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
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

class Home extends Component {
  state = {
    loadedData: '',
  };
  componentDidMount() {
    filterActiveLanguage()
      .then(language => {
        if (language) {
          console.log('filter success => ', language);
          this.setState({loadedData: language[0]});
        } else {
          this.props.getTranslation(API.en);
        }
      })
      .catch(error => console.log('filter error => ', error));
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data != this.props.data) {
      const newData = this.props.data && this.props.data[0];
      // console.log(newData);
      const newLanguage = {
        id: newData.id,
        name: newData.name,
        how: newData.how,
        boiledEgg: newData.boiledEgg,
        softBoiledEgg: newData.softBoiledEgg,
        choice: newData.choice,
        active: 'true',
      };
      if (prevProps.data) {
        updateStatus(prevProps.data[0].id, 'false')
          .then(() =>
            console.log('successfully disabled => ', prevProps.data[0].id),
          )
          .catch(error => console.log('disabled error => ', error));
      }
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
      this.setState({loadedData: this.props.data[0]});
      return true;
    }
    return false;
  }
  changeLanguage = (api, id) => {
    // console.log(this.state.loadedData);
    if (this.state.loadedData && this.state.loadedData.id === id) {
      return;
    }
    getLanguageData(id)
      .then(language => {
        if (language) {
          if (this.state.loadedData) {
            updateStatus(this.state.loadedData.id, 'false')
              .then(() =>
                console.log(
                  'successfully disabled => ',
                  this.state.loadedData.id,
                ),
              )
              .catch(error => console.log('disabled error => ', error));
          }
          updateStatus(id, 'true')
            .then(value => {
              console.log('successfully enabled => ', id);
              this.setState({loadedData: value});
            })
            .catch(error => console.log('enabled error => ', error));
          // console.log('get language data => ', language);
        } else {
          this.props.getTranslation(api);
        }
      })
      .catch(error => {
        console.log('get language data error => ', error);
      });
  };
  render() {
    const {data} = this.props;
    const {loadedData} = this.state;
    return (
      <SafeAreaView style={[styles.main]}>
        <View style={[styles.languageBox]}>
          <Button
            title={'English'}
            onPress={() => this.changeLanguage(API.en, 1)}
          />
          <Button
            title={'हिंदी'}
            onPress={() => this.changeLanguage(API.hn, 2)}
          />
          <Button
            title={'italiana'}
            onPress={() => this.changeLanguage(API.it, 3)}
          />
        </View>

        <Text style={[styles.text]}>
          My Lang: {loadedData && loadedData.how}
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
