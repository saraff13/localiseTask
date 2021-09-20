import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useSelector} from 'react-redux';

const Profile = ({navigation}) => {
  const data = useSelector(state => state.translateReducer.data);

  return (
    <View style={[styles.main]}>
      <Text style={[styles.text]}>Current language</Text>
      <Text style={[styles.text]}>{data && data.boiledEgg}</Text>
      <View>
        <Button
          title="Notifications"
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
