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
import {
  fetchSavedBankFile,
  writeBankFile,
} from '../utils/FileHandlingFunctions';

const RenderItem = ({item}) => {
  return <Text>{item.name}</Text>;
};

const Banks = () => {
  const [edit, toggleEditing] = useState(false);
  const [render, reRender] = useState(false);

  const dispatch = useDispatch();
  const banksData = useSelector(state => state.banksReducer.data);

  useEffect(() => {
    fetchSavedBankFile(dispatch, setBanksData, getBanksData);
  }, []);

  const save = () => {
    writeBankFile(banksData);
    toggleEditing(!edit);
    fetchSavedBankFile(dispatch, setBanksData, getBanksData);
    alert('saved successfully');
  };

  const cancel = () => {
    toggleEditing(!edit);
    fetchSavedBankFile(dispatch, setBanksData, getBanksData);
  };

  return (
    <View style={styles.container}>
      {edit ? (
        <>
          <FlatList
            numColumns={4}
            ListHeaderComponent={() => (
              <Text>{(banksData && banksData.sectionTitle) || ''}</Text>
            )}
            data={(banksData && banksData.data) || []}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.eachItem,
                  {
                    backgroundColor:
                      item.active == 'true' ? 'lightgreen' : 'white',
                  },
                ]}
                onPress={() => {
                  item.active == 'true'
                    ? (banksData.data[item.id - 1].active = 'false') &&
                      reRender(!render)
                    : (banksData.data[item.id - 1].active = 'true') &&
                      reRender(!render);
                }}>
                <RenderItem item={item} />
              </TouchableOpacity>
            )}
          />
          <Button title="save" onPress={() => save()} />
          <Button title="cancel" onPress={() => cancel()} />
        </>
      ) : (
        <>
          <Button
            title="Edit"
            onPress={() => {
              toggleEditing(!edit);
            }}
          />
          <FlatList
            numColumns={4}
            ListHeaderComponent={() => (
              <Text>{(banksData && banksData.sectionTitle) || ''}</Text>
            )}
            data={
              (banksData &&
                banksData.data.filter(item => item.active == 'true')) ||
              []
            }
            renderItem={({item}) => {
              return (
                <>
                  {item.active == 'true' && (
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
    padding: 10,
    marginVertical: 20,
  },
  eachItem: {
    borderWidth: 1,
    height: 90,
    width: 90,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
});
