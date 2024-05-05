import { View, Text, ActivityIndicator } from "react-native";
import { useQuery, gql } from '@apollo/client';
import { ScrollView } from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Card from "./Card";

export const GET_POSTS = gql`
query GetPosts {
  getPosts {
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
`;

export default function HomeScreen({navigation}) {
    const {loading, error, data} = useQuery(GET_POSTS)
    if(loading)
        return (
            <>
            <View
            
            style= {{
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

        if(error)
          return (
              <>
              <View
              
              style= {{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
              }}
              >
              <Text>Something went wrong</Text>
              </View>
              </>
          )
        console.log({loading, error, data})
    return (
        <>
         <SafeAreaProvider>
          <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
              <ScrollView>
                {data.getPosts.map((el, idx) => {
                  return <Card key={idx} data={el}/>
                })}
              </ScrollView>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
        </>
    )
}