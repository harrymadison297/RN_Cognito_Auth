import { useState } from "react";
import { View, TextInput, Button, Text, Pressable } from "react-native";
import { AWSConfirmSignUp, AWSSignUp } from "../Authentication/authMethod";
import { router } from "expo-router";

const SignupScreen = () => {
    const [noti, setNoti] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmCode, setConfirmCode] = useState('');
    const [isConfirm, setIsConfirm] = useState(false);

    const handleSignUp = async () => {
        let signUpState = await AWSSignUp(username, password, { "name": name })
        setNoti(signUpState.message)
        if (signUpState.isSuccess) {
            setIsConfirm(true);
        }
    }

    if (isConfirm)
        return (
            <View style={{ marginVertical: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '70%'}}>
                <Text style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 33,
                letterSpacing: 2,
                marginBottom: 20,
            }}>
                Signup</Text>
                <TextInput
                style={{ borderColor: 'white', borderWidth: 2, borderRadius: 7, padding: 15, color: 'white', width: '100%', maxWidth: 500, marginTop: 10 }}
                    placeholder="Enter confirmation code"
                    onChangeText={setConfirmCode}
                    value={confirmCode}
                />
                <Text style={{ color: 'red' }}>{noti}</Text>

                {/* Example for confirm code when sign up successfully */}
                <Pressable onPress={async () => {
                    let confirm = await AWSConfirmSignUp(username, confirmCode); 
                    if (confirm.isSuccess) {router.navigate('/login')}
                    else {setNoti(confirm.message)}
                }}
                style={{borderRadius: 7, padding: 15, width: '100%', maxWidth: 500, marginTop: 10, backgroundColor: "#2836f7" }}>
                <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                paddingRight: 10,
                textAlign: 'center'
                }}>
                Create account
                </Text>
            </Pressable>
            </View>
        );

    if (!isConfirm)
        return (
            <View style={{ marginVertical: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '70%'}}>
                <Text style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 33,
                letterSpacing: 2,
                marginBottom: 20,
            }}>
                Create an account</Text>
                <TextInput
                style={{ borderColor: 'white', borderWidth: 2, borderRadius: 7, padding: 15, color: 'white', width: '100%', maxWidth: 500, marginTop: 10 }}
                    placeholder="Name"
                    onChangeText={setName}
                    value={name}
                />
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

                {/* Example for sign up */}
                <Pressable onPress={() => handleSignUp()}
                style={{borderRadius: 7, padding: 15, width: '100%', maxWidth: 500, marginTop: 10, backgroundColor: "#2836f7" }}>
                <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                paddingRight: 10,
                textAlign: 'center'
                }}>
                Create account
                </Text>
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
            <Pressable onPress={() => router.navigate('/login')}
                style={{padding: 15, width: '50%', maxWidth: 500}}>
                <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                paddingRight: 10,
                textAlign: 'center'
                }}>
                Sign in
                </Text>
            </Pressable>
            </View>
            </View>
        );
};

export default SignupScreen;