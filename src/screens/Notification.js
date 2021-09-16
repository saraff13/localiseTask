import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {filterActiveLanguage} from '../databases/schema';

const Notification = ({navigation}) => {
  const [notificationData, setnotificationData] = useState('');
  useEffect(() => {
    filterActiveLanguage()
      .then(language => {
        if (language.length) {
          console.log('profile filter success => ', language);
          setnotificationData(language[0]);
        }
      })
      .catch(error => console.log('filter error => ', error));
  }, []);
  return (
    <View style={[styles.main]}>
      <Text style={[styles.text]}>Current language</Text>
      <Text style={[styles.text]}>
        {notificationData && notificationData.choice}
      </Text>
      <View>
        <Button
          title="go to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
