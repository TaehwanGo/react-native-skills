import React from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostsApp = () => {
  const data = [
    { id: 1, title: 'title1', body: 'body1' },
    { id: 2, title: 'title2', body: 'body2' },
  ];
  return (
    <SafeAreaView style={styles.container}>
      {data ? (
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.title}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}
      <Button title="새로고침" onPress={() => {}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  loading: {
    flex: 1,
  },
  item: {
    padding: 8,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
  },
});

export default PostsApp;
