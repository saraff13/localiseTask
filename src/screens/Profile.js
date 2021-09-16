import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {filterActiveLanguage} from '../databases/schema';

const Profile = ({navigation}) => {
  const [profileData, setProfileData] = useState('');
  useEffect(() => {
    filterActiveLanguage()
      .then(language => {
        if (language.length) {
          console.log('profile filter success => ', language);
          setProfileData(language[0]);
        }
      })
      .catch(error => console.log('filter error => ', error));
  }, []);
  return (
    <View style={[styles.main]}>
      <Text style={[styles.text]}>Current language</Text>
      <Text style={[styles.text]}>{profileData && profileData.boiledEgg}</Text>
      <View>
        <Button
          title="go to Notifications"
          onPress={() => navigation.navigate('Notification')}
        />
      </View>
    </View>
  );
};

export default Profile;

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
