import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface CommentFormProps {
  visible: boolean;
  onClose(): void;
  onSubmit(message: string): void;
  initialMessage?: string;
}
const CommentModal = ({
  visible,
  onClose,
  onSubmit,
  initialMessage,
}: CommentFormProps) => {
  const {bottom} = useSafeAreaInsets(); // 하단 필수 여백 - iOS 홈버튼 없는 것 대응
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(initialMessage ?? '');
  }, [initialMessage]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      transparent>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.select({ios: 'padding'})}
        keyboardVerticalOffset={Platform.select({ios: -bottom})}>
        <View style={styles.block}>
          <Pressable style={styles.dismissArea} onTouchStart={onClose} />
          <View style={[styles.whiteBox, {paddingBottom: 24 + bottom}]}>
            <TextInput
              style={styles.input}
              autoFocus
              returnKeyType="send"
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={() => {
                onSubmit(message);
                setMessage('');
              }}
              placeholder="댓글을 입력하세요"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    flex: 1,
  },
  dismissArea: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  whiteBox: {
    backgroundColor: 'white',
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  input: {
    paddingHorizontal: 16,
    height: 48,
    fontSize: 12,
    borderColor: '#ababab',
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default CommentModal;
