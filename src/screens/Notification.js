import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useSelector} from 'react-redux';

const Notification = ({navigation}) => {
  const data = useSelector(state => state.translateReducer.data);

  return (
    <View style={[styles.main]}>
      <Text style={[styles.text]}>Current language</Text>
      <Text style={[styles.text]}>{data && data.choice}</Text>
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
