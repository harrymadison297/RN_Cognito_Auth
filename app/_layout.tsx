import { router, Slot } from "expo-router";
import AuthProvider, { AuthContext } from "../Authentication/authProvider";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { useContext } from "react";
import { AWSLogOut } from "../Authentication/authMethod";

export default function App(): JSX.Element {
    return (
      <AuthProvider>
        <SafeAreaView style={{
          backgroundColor: "#111112", 
          height: "100%"
        }}>
          <NavBar />
          <Slot />
        </SafeAreaView>
      </AuthProvider>
    );
  }

const NavBar = () => {
  const { user, error } = useContext(AuthContext) // Use AuthContext to access current user

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: "#222224"
    }}>
      <Pressable onPress={() => {router.navigate('/')}}>
        <Text style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 20,
          paddingRight: 10,
        }}>
          AWS
        </Text>
      </Pressable>
      {user?.userId ?
      <Pressable onPress={() => {AWSLogOut()}}>
        <Text style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 20,
          paddingRight: 10,
        }}>
          Sign Out
        </Text>
      </Pressable> :
      <Pressable onPress={() => {router.navigate('/login')}}>
        <Text style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 20,
          paddingRight: 10,
        }}>
          Sign In
        </Text>
      </Pressable>
      }
      
    </View>
  )
}