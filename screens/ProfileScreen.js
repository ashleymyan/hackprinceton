import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Switch} from 'react-native'

const ProfileScreen = () => {

    // const [isAvaliable, setIsAvaliable] = useState(false);
    // const userName = 'hardCode';

    return (
        <View>
            <Text> 
                Profile screen lalalala
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundcolor: 'white',
        },
    topContainer: {
        flex: 1,
        backgroundcolor: 'd3d3d3',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    bottomContainer: {
        flex: 2,
        padding: 16,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 16,
    }
})

export default ProfileScreen;