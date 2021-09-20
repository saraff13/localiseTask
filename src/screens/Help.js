import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useSelector} from 'react-redux';

const Help = ({navigation}) => {
  const data = useSelector(state => state.translateReducer.data);

  return (
    <View style={[styles.main]}>
      <Text style={[styles.text]}>Current language</Text>
      <Text style={[styles.text]}>{data && data.softBoiledEgg}</Text>
      <View>
        <Button title="Home" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default Help;

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
