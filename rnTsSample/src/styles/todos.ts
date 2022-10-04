import { StyleSheet } from 'react-native';

export const todoStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
  todo: {
    flexDirection: 'row',
  },
  toggle: {
    justifyContent: 'center',
    flex: 1,
  },
  doneText: {
    textDecorationLine: 'line-through',
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
  },
});
