import React from 'react';
import {View, StyleSheet, TextInput, Button, Text} from 'react-native';

function MessageForm() {
  const [text, setText] = React.useState('');
  const [lastMessage, setLastMessage] = React.useState<{
    message: string;
    date: Date;
  } | null>(null);
  const onPress = () => {
    setLastMessage({message: text, date: new Date()});
    setText('');
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type a message"
      />
      <Button title="Press me" onPress={onPress} />
      {lastMessage && (
        <View>
          <Text>
            마지막 메세지: {lastMessage.message} (
            {lastMessage.date.toLocaleString()})
          </Text>
        </View>
      )}
    </View>
  );
}

export default MessageForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
