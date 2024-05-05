import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useQuery, gql } from '@apollo/client';
import { ScrollView } from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import CardDetail from "./CardDetail";

const GET_POST_BY_ID = gql`
query Query($id: ID) {
  getPostById(_id: $id) {
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

export default function DetailScreen({ navigation, route }) {
    const {loading, error, data} = useQuery(GET_POST_BY_ID, {
        variables: {
            id: route.params._id
        }
    })
    console.log(loading, error, data)
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
    return (
        <>
           <SafeAreaProvider>
          <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
              <ScrollView>
              {data.getPostById.map((el, idx) => {
                  return <CardDetail key={idx} data={el}/>
                })}
              </ScrollView>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
        </>
    )
}