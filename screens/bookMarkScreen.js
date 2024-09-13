import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarksScreen = () => {
  const [bookmarks, setBookmarks] = useState([]);

  const getBookmarks = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem('bookmarks');
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <Text>{item.title}</Text>
            <Text>{item.location}</Text>
            <Text>{item.salary}</Text>
            <Text>{item.phone}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default BookmarksScreen;
