import { Amplify } from 'aws-amplify';
import amplifyconfig from '../amplifyconfiguration.json';
import AuthProvider, { AuthContext } from "../Authentication/authProvider";
import { useContext } from 'react';
import { SafeAreaView, Button, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
Amplify.configure(amplifyconfig);

// Here is where you start build your app ============================================================
const Home = () => {
  const { user, error } = useContext(AuthContext) // Use AuthContext to access current user
  return (
      <SafeAreaView style={{backgroundColor: "#111112", height: "100%"}}>
        
          <Text style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
              paddingRight: 10,
            }}>Username: {user?.username}</Text>
          <Text style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
              paddingRight: 10,
            }}>UserID: {user?.userId}</Text>
          <Text style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
              paddingRight: 10,
            }}>Err: {error}</Text>
      </SafeAreaView>
  )
}

export default Home;