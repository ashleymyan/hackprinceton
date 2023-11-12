import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';



const AddFriends = () => {
  const [people, setPeople] = useState([
    // { id: '1', name: 'John Doe', profileImage: 'https://images.squarespace-cdn.com/content/v1/6204821bfe06b76898b431c5/1660858625934-ZVWEMZYZHLWTVCXC19E3/Brandon+Andre+-+Headshot+Los+Angeles+na4-3.jpg' },
    // { id: '2', name: 'Jane Smith', profileImage: 'https://www.unh.edu/unhtoday/sites/default/files/styles/article_huge/public/article/2019/professional_woman_headshot.jpg?itok=3itzxHXh' },
    // { id: '3', name: 'Alice Johnson', profileImage: 'https://images.squarespace-cdn.com/content/v1/5cfb0f8783523500013c5639/f8715acd-a389-4d3f-8b8d-b5c6041ced87/Professional-Headshot-Vancouver?format=500w' },
    // // Add more people as needed
  ]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        
        const usersData = usersSnapshot.docs.map(doc => doc.data());
        setPeople(usersData);
      } catch (error) {
        console.error('Error fetching people', error);
      }
    };
  
    fetchPeople();
  }, []);
  

  useEffect(() => {
    const filtered = people.filter((person) => 
      person.email.toLowerCase() === searchQuery.toLowerCase()
    );
    setFilteredPeople(filtered);
  }, [searchQuery, people]);
  

  const [friendRequests, setFriendRequests] = useState([
    { id: '4', name: 'Bob Johnson', profileImage: 'https://www.cityheadshots.com/uploads/5/1/2/1/5121840/editor/mjb-2465.jpg?1643119031' },
    { id: '5', name: 'Emily White', profileImage: 'https://headshots-inc.com/wp-content/uploads/2023/03/professional-Headshot-Example-2-1.jpg' },
    // Add more friend requests as needed
  ]);

  const handleAddFriend = (personId) => {
    // Add your logic for adding friends here
    console.log(`Added friend with ID: ${personId}`);
  };


  // Filter the people based on the search query


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add Friends</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Email"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredPeople}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.personContainer}>
            {/* <Image
              source={{ uri: item.profileImage }}
              style={styles.profileImage}
            /> */}
            <Text style={styles.personName}>{item.name}</Text>
            <Text style={styles.personEmail}>{item.email}</Text>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => handleAddFriend(item.id)}
            >
              <Text style={styles.buttonText}>Request</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.headerText}>Friend Requests</Text>
      <FlatList
        data={friendRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.personContainer}>
            <Image
              source={{ uri: item.profileImage }}
              style={styles.profileImage}
            />
            <Text style={styles.personName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => handleAddFriend(item.id)}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#1C9BF5',
  },
  searchInput: {
    height: 40,
    borderColor: '#CDCDCD',
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  personContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Assuming a circular profile picture
    marginRight: 10,
  },
  personName: {
    fontSize: 16,
    textAlign: 'left',
  },
  personEmail: {
    fontSize: 10,
  },
  customButton: {
    backgroundColor: '#1C9BF5',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddFriends;
