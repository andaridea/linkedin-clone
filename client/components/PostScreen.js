import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { GET_POSTS } from './HomeScreen';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

const MUTATION_ADDPOST = gql`
  mutation Mutation($newPost: newPost) {
  addPost(newPost: $newPost) {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      _id
      content
      username
      createdAt
      updatedAt
    }
    likes {
      _id
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    author {
      _id
      username
      name
      email
      profilePic
    }
  }
}
  `

export default function PostScreen (){
    const [postContent, setPostContent] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(''); 
    const navigate = useNavigation()
    const [addpost, { loading, error, data }] = useMutation(MUTATION_ADDPOST, {reFetchQueries: [
            GET_POSTS
    ]})

    if (loading)
        return (
          <>
            <View
      
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator sezi="large" />
              <Text>Loading...</Text>
            </View>
          </>
        )
      
      if (error)
        return (
          <>
            <View
      
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>Something went wrong</Text>
            </View>
          </>
        )
  
    async function handlePost() {
      try {
            const result = await addpost({
              variables: {
                newPost: {
                  content: postContent,
                  tag: tags,
                  imgUrl: image,
                }
              }
            })
            navigate.navigate("Home")
      } catch (error) {
        console.log(error.message)
      }
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="What's on your mind?"
          multiline
          numberOfLines={4}
          value={postContent}
          onChangeText={setPostContent}
          style={styles.input}
        />
        <TextInput
          placeholder="Add tags (optional)"
          value={tags}
          onChangeText={setTags}
          style={styles.input}
        />
         <TextInput
          placeholder="Add image url (optional)"
          value={image}
          onChangeText={setImage}
          style={styles.input}
        />
        <Button title="Post" onPress={handlePost} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
});


