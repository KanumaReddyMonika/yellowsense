import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JobsScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      setJobs([...jobs, ...response.data]);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const bookmarkJob = async (job) => {
    try {
      const storedBookmarks = await AsyncStorage.getItem('bookmarks');
      const bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
      bookmarks.push(job);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error fetching data.</Text>}
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <Text>{item.title}</Text>
            <Text>{item.location}</Text>
            <Text>{item.salary}</Text>
            <Text>{item.phone}</Text>
            <Button title="View Details" onPress={() => navigation.navigate('JobDetails', { job: item })} />
            <Button title="Bookmark" onPress={() => bookmarkJob(item)} />
          </View>
        )}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default JobsScreen;
