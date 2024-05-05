import React from 'react';
import { Text, View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

export default function CardDetail({ data }) {
    // const navigation = useNavigation();

    return (
        <View style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.authorInfo}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: data.author.profilePic }}
                        />
                        <Text style={styles.name}>{data.author.name}</Text>
                        <Ionicons
                            name="ellipsis-vertical-sharp"
                            size={24}
                            color="black"
                            style={styles.options}
                        />
                    </View>
                    <Text style={styles.content}>{data.content}</Text>
                    <Text style={styles.tag}>
                        {data.tags.map((tag, index) => (
                            <Text key={index}>#{tag} </Text>
                        ))}
                    </Text>
                    <Image
                        style={styles.image}
                        source={{ uri: data.imgUrl + data._id}}
                    />
                    <View style={styles.likeCommentInfo}>
                        <Text style={styles.infoText}>120 likes</Text>
                        <Text style={styles.infoText}>30 comments</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.actions}>
                        <View style={styles.action}>
                            <AntDesign
                                name="like2"
                                size={18}
                                color="black"
                            />
                            <Text style={styles.actionText}>Like</Text>
                        </View>
                        <View style={styles.action}>
                            <Ionicons
                                name="chatbubble-outline"
                                size={18}
                                color="black"
                            />
                            <Text style={styles.actionText}>Comment</Text>
                        </View>
                        <View style={styles.action}>
                            <Ionicons
                                name="git-compare-outline"
                                size={18}
                                color="black"
                            />
                            <Text style={styles.actionText}>Repost</Text>
                        </View>
                        <View style={styles.action}>
                            <Ionicons
                                name="send-outline"
                                size={18}
                                color="black"
                            />
                            <Text style={styles.actionText}>Send</Text>
                        </View>
                    </View>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardContent: {
        padding: 10,
    },
    tag: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1E90FF",
        marginBottom: 10
    },
    authorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    content: {
        marginTop: 5,
        textAlign: 'justify',
        marginBottom: 10,
        fontSize: 14
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
    },
    options: {
        marginLeft: 'auto',
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 10,
    },
    likeCommentInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    infoText: {
        color: '#666',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    action: {
        // flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        marginLeft: 5,
        color: 'black',
        fontSize: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
});
