import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getBanksData, setBanksData} from '../store/actions/bankAction';
import {fetchSavedBankFile} from '../utils/FileHandlingFunctions';

const RenderItem = ({item}) => {
  // console.log('Item=>', item);
  return <Text>{item.name}</Text>;
};

const Banks = () => {
  const [status, changeStatus] = useState(false);
  const dispatch = useDispatch();

  const banksData = useSelector(state => state.banksReducer.data);

  // console.log('banksData=>', banksData);
  useEffect(() => {
    fetchSavedBankFile(dispatch, setBanksData, getBanksData);
  }, []);

  return (
    <View style={styles.container}>
      {status ? (
        <>
          <Button
            title="save"
            onPress={() => {
              changeStatus(!status);
            }}
          />
          <FlatList
            // horizontal
            numColumns={4}
            ListHeaderComponent={() => (
              <Text>{(banksData && banksData.sectionTitle) || ''}</Text>
            )}
            data={(banksData && banksData.data) || []}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.eachItem,
                  {backgroundColor: item.active ? 'lightgreen' : 'white'},
                ]}
                onPress={() => {
                  item.active == 'true'
                    ? (banksData.data[item.id - 1].active = 'false') &&
                      dispatch(setBanksData(banksData))
                    : (banksData.data[item.id - 1].active = 'true') &&
                      dispatch(setBanksData(banksData));
                }}>
                <RenderItem item={item} />
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <>
          <Button
            title="Edit"
            onPress={() => {
              changeStatus(!status);
            }}
          />
          <FlatList
            // horizontal
            numColumns={4}
            ListHeaderComponent={() => (
              <Text>{(banksData && banksData.sectionTitle) || ''}</Text>
            )}
            data={(banksData && banksData.data) || []}
            renderItem={({item}) => {
              return (
                <>
                  {item.active == true && (
                    <TouchableOpacity style={styles.eachItem}>
                      <RenderItem item={item} />
                    </TouchableOpacity>
                  )}
                </>
              );
            }}
          />
        </>
      )}
    </View>
  );
};

export default Banks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  eachItem: {
    borderWidth: 1,
    height: 90,
    width: 90,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    backgroundColor: 'lightgreen',
  },
});
