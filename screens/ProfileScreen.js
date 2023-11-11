import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Switch} from 'react-native'


const ProfileScreen = ({ isAvailable, setIsAvailableInTabs, tags, setTags, handleTagToggle }) => {

    const userName = '[Name]';


    const renderActiveTags = () => {
        return (
            <View style={styles.tagContainer}> 
            <Text style={styles.tagText}> Currently: {tags.filter((tag) => tag.active).map((tag) => tag.label).join(', ')}</Text>
            </View>
        );
    };

    const renderAvailableSettings = () => {
        if (isAvailable) {
            return (
                <View style={styles.availableSettings}>

                    {renderActiveTags()}

                    <TouchableOpacity 
                        style={styles.button} 
                        onPress = {() => handleTagToggle('studying')}
                        activeOpacity={0.8}
                    >
                        <Text>Studying</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress = {() => handleTagToggle('eating')}>
                        <Text>Eating</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress = {() => handleTagToggle('workingOut')}>
                        <Text>Working Out</Text>
                    </TouchableOpacity>

                </View>
            );
        }
    };



    return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.greetingText}>
                        Hi, { userName }!
                    </Text>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.profileText}> 
                            Status: {isAvailable ? 'Available 😎' : 'Busy 😴'}
                    </Text>
                    <Switch
                        value={isAvailable}
                        onValueChange={(value) => setIsAvailableInTabs(value)}
                        style={styles.statusToggle}
                    />
                
                    {isAvailable && 
                        renderAvailableSettings()
                    }
                </View>
            </View>   
    
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3',
        },
    topContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    bottomContainer: {
        flex: 2,
        padding: 16,
        alignItems: 'center',
        marginTop: 20,

    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 16,
    },
    greetingText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 8,
    },
    profileText: {
        fontSize: 20,
    },
    statusToggle: {
        marginTop: 16,
        marginBottom: 16,
        transform: [{ scaleX: 1.3 }, { scaleY: 1.25}],
    },

    availableSettings: {
        marginTop: 16, 
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 8,
        marginVertical: 4,
    },
    activeButton: {
        backgroundColor: 'blue',
    },
    tagContainer: {
        backgroundColor: 'lightgreen',
        padding: 8,
        marginVertical: 4,
    },
    tagText: {
        fontSize: 16,
    },
});

export default ProfileScreen;