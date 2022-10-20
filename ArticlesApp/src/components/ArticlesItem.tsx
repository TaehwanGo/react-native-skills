import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';

export interface ArticleItemProps {
  id: number;
  title: string;
  publishedAt: string;
  username: string;
}

function ArticleItem({id, title, publishedAt, username}: ArticleItemProps) {
  const onPress = () => {
    // BUG: onPress가 실행되지 않음
    // TODO: 눌렀을 때 게시글 열기
    console.log('onPress', id);
  };

  const formattedDate = new Date(publishedAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Pressable
      style={({pressed}) => [
        // 뭘까?
        styles.block,
        Platform.OS === 'ios' && pressed && styles.pressed,
      ]}
      onPress={onPress}
      android_ripple={{color: '#eeeeee'}}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.footer}>
        <Text style={styles.smallText}>{username}</Text>
        <Text style={styles.smallText}>{formattedDate}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  pressed: {
    backgroundColor: '#eeeeee',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 16,
  },
  smallText: {
    fontSize: 10,
    color: '#546e7a',
  },
});

export default ArticleItem;
