import React, { useContext } from 'react';
import { Text, ScrollView, StyleSheet, StatusBar, View } from 'react-native';
import { HistoryContext } from '../context/HistoryContext';

export default function ListScreen() {
  const { historyArray } = useContext(HistoryContext);
  console.log(historyArray);
  return (
    <ScrollView style={styles.scrollView}>
      {historyArray?.map((history) => {
        return (
          <Text style={styles.text} key={history.id}>
            {history?.name}
          </Text>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
