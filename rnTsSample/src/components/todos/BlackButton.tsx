import React from 'react';
import { Pressable, Text } from 'react-native';
import { todoStyles } from '../../styles/todos';

const BlackButton = ({
  onPress,
  title,
}: {
  onPress(): void;
  title: string;
}) => {
  return (
    <Pressable
      style={todoStyles.button}
      onPress={onPress}
      android_ripple={{ color: 'white' }}>
      <Text style={todoStyles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default BlackButton;
