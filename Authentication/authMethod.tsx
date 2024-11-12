import { confirmSignUp, signIn, signInWithRedirect, signOut, signUp, UserAttributeKey } from "aws-amplify/auth"

interface SignUpUserAttributes {
    address?: string | undefined;
    birthdate?: string | undefined;
    email_verified?: string | undefined;
    family_name?: string | undefined;
    gender?: string | undefined;
    given_name?: string | undefined;
    locale?: string | undefined;
    middle_name?: string | undefined;
    name?: string | undefined;
    nickname?: string | undefined;
    phone_number_verified?: string | undefined;
    picture?: string | undefined;
    preferred_username?: string | undefined;
    profile?: string | undefined;
    sub?: string | undefined;
    updated_at?: string | undefined;
    website?: string | undefined;
    zoneinfo?: string | undefined;
}

/**
 * Signin function =================================================================
 * @param {String} username: The username input to sign in
 * @param {String} password: The password input to sign in
 * @return {Promise} Promise: Message 'User signed in successfully' or 'error message'
 * @example AWSSignInWithUsernameAndPassword('username', 'password');
*/
const AWSSignInWithUsernameAndPassword = async (username: string, password: string): Promise<string> => {
    try {
        await signIn({ username, password })
        return 'User signed in successfully'
    } catch (error: any) {
        return error.message
    }
}

/** 
 * Signin with third party function =====================================================
 * @param {String} provider: The third party provider ('Google'|'Facebook'|'Amazon'|'Apple')
 * @return {Promise} Promise: Message 'User signed in successfully' or 'error message'
 * @example AWSSignInWithThirdParty('Google');
 * @example AWSSignInWithThirdParty('Facebook');
 * @example AWSSignInWithThirdParty('Amazon');
 * @example AWSSignInWithThirdParty('Apple');
*/
const AWSSignInWithThirdParty = async (provider: 'Google'|'Facebook'|'Amazon'|'Apple'): Promise<string> => {
    try {
        await signInWithRedirect({ provider: provider })
        return 'User signed in successfully'
    } catch (error: any) {
        return error.message
    }
}

/**
 * Signup function ==================================================================
 * @param {String} username: The username input to sign up
 * @param {String} password: The password input to sign up
 * @param {Object} userAttributes: Additional user attributes
 * @return {Promise} Promise: Message 'User signed up successfully' or 'error message'
*/
const AWSSignUp = async (username: string, password: string, userAttributes?: SignUpUserAttributes | undefined): Promise<{isSuccess: boolean, message: string}> => {
    try {
        await signUp({
            username: username,
            password: password,
            options: {
              userAttributes: {
                // address:  userAttributes?.address ?? undefined,
                // birthdate: userAttributes?.birthdate ?? undefined,
                // email_verified: userAttributes?.email_verified ?? undefined,
                // family_name: userAttributes?.family_name ?? undefined,
                // gender: userAttributes?.gender ?? undefined,
                // given_name: userAttributes?.given_name ?? undefined,
                // locale: userAttributes?.locale ?? undefined,
                // middle_name: userAttributes?.middle_name ?? undefined,
                name: userAttributes?.name ?? undefined,
                // nickname: userAttributes?.nickname ?? undefined,
                // phone_number_verified: userAttributes?.phone_number_verified ?? undefined,
                // picture: userAttributes?.picture ?? undefined,
                // preferred_username: userAttributes?.preferred_username ?? undefined,
                // profile: userAttributes?.profile ?? undefined,
                // sub: userAttributes?.sub ?? undefined,
                // updated_at: userAttributes?.updated_at ?? undefined,
                // website: userAttributes?.website ?? undefined,
                // zoneinfo: userAttributes?.zoneinfo ?? undefined,
              }
            }
          });
        return {
            isSuccess: true,
            message: 'User signed up successfully! Please enter your confirm code!'
        }
    } catch (error: any) {
        return {
            isSuccess: false,
            message: error?.message.toString()
        }
    }
}

/**
 * Confirm sign up
 * @param {String} username: The username input to sign up
 * @param {String} confirmCode: 6-digits verify code has been sent
 * @return {Promise} Promise: Message 'User confirmed successfully!' or 'error message'
 */
const AWSConfirmSignUp = async (username: string, confirmCode: string): Promise<{isSuccess: boolean, message: string}> => {
    try {
        await confirmSignUp({
            username: username,
            confirmationCode: confirmCode
        });
        return {
            isSuccess: true,
            message: 'User confirmed successfully!'
        }
    } catch (error: any) {
        return {
            isSuccess: false,
            message: error?.message.toString()
        }
    }
}

const AWSLogOut = async () => {
    try {
        await signOut()
        console.log('User logged out successfully')
    } catch (error: any) {
        console.log('Error logging out:', error.message)
    }
}

export { AWSSignInWithUsernameAndPassword, AWSSignInWithThirdParty, AWSSignUp, AWSConfirmSignUp, AWSLogOut }