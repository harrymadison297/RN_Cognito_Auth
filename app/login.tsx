import { useContext, useEffect, useState } from "react";
import { View, TextInput, Button, Text, Pressable, Image } from "react-native";
import { AWSSignInWithThirdParty, AWSSignInWithUsernameAndPassword } from "../Authentication/authMethod";
import { AuthContext } from "../Authentication/authProvider";
import { router } from "expo-router";

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [noti, setNoti] = useState("");
    const { user, error } = useContext(AuthContext) // Use AuthContext to access current user

    useEffect(() => {
        if (user?.userId) {
            // Navigate to the HomeScreen or wherever you want
            router.navigate('/');
        }
    }, [user])

    return (
        <View style={{ marginVertical: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '70%'}}>
            <Text style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 33,
                letterSpacing: 2,
                marginBottom: 20,
            }}>
                Sign in your account
            </Text>
            <TextInput
                style={{ borderColor: 'white', borderWidth: 2, borderRadius: 7, padding: 15, color: 'white', width: '100%', maxWidth: 500, marginTop: 10 }}
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                style={{ borderColor: 'white', borderWidth: 2, borderRadius: 7, padding: 15, color: 'white', width: '100%', maxWidth: 500, marginTop: 10 }}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry />
            <Text style={{ color: 'red' }}>{noti}</Text>

            {/* Example for Signin User with Email and Password */}
            <Pressable onPress={async () => setNoti(await AWSSignInWithUsernameAndPassword(username, password))}
                style={{borderRadius: 7, padding: 15, width: '100%', maxWidth: 500, marginTop: 10, backgroundColor: "#2836f7" }}>
                <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                paddingRight: 10,
                textAlign: 'center'
                }}>
                Sign in to your account
                </Text>
            </Pressable>
            {/* Example for Signin User with Google */}
            <Pressable onPress={async () => setNoti(await AWSSignInWithThirdParty('Google'))}
                style={{borderWidth: 1, borderColor: "#2a2a2a", borderRadius: 7, padding: 10, width: '100%', maxWidth: 500, marginTop: 10, backgroundColor: "#222", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                paddingRight: 10,
                textAlign: 'center'
                }}>
                Login with Google
                </Text>
                <Image source={{uri: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"}} style={{width: 40, height: 40}}></Image>
            </Pressable>
            <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: "100%",
                maxWidth: 500,
                borderRadius: 7,
                backgroundColor: "#1a1a1a",
                marginTop: 10
            }}>
            <Pressable onPress={() => router.navigate('/')}
                style={{ padding: 15, width: '50%', maxWidth: 500 }}>
                <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                paddingRight: 10,
                textAlign: 'center'
                }}>
                Back
                </Text>
            </Pressable>
            <Pressable onPress={() => router.navigate('/signup')}
                style={{padding: 15, width: '50%', maxWidth: 500}}>
                <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                paddingRight: 10,
                textAlign: 'center'
                }}>
                Sign up
                </Text>
            </Pressable>
            </View>
        </View>
    );
};

export default LoginScreen