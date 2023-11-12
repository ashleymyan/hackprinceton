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
import { db, auth } from '../firebaseConfig';



const AddFriends = () => {
const [name, setName] = useState('')
const [friendsArray, setFriendsArray] = useState([]);
const [people, setPeople] = useState([]);
const [filteredPeople, setFilteredPeople] = useState([]);
const [searchQuery, setSearchQuery] = useState('');



useEffect(() => {
  const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              setName(userData.name);
              setFriendsArray(userData.friends || []);
          } else {
              console.log("No such document!");
          }
      }
  };

  fetchUserName();
}, []);


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
      <Text style={styles.headerText}>My Friends</Text>
      <FlatList
        data={friendsArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.friendContainer}>
            <Text style={styles.personName}>{item.name}</Text>
            
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
