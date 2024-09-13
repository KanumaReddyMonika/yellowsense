import React from 'react';
import { View, Text } from 'react-native';

const JobDetailsScreen = ({ route }) => {
  const { job } = route.params;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Title: {job.title}</Text>
      <Text>Location: {job.location}</Text>
      <Text>Salary: {job.salary}</Text>
      <Text>Phone: {job.phone}</Text>
      <Text>Description: {job.description}</Text>
      {/* Add other details as needed */}
    </View>
  );
};

export default JobDetailsScreen;
