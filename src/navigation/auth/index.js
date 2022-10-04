import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Splash,
  Onboarding,
  Signup,
  Login,
  ForgetPassword,
  CodeVerification,
  NewPassword,
  PasswordChanged,
  CreateProfile,
  CreateProfile1,
  CreateProfile2,
  AddPortfolio,
  AddPortfolio1,
  BankToken,
} from '../../screens/auth/index';
const AuthStack = createStackNavigator();
const AuthScreens = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false, animationEnabled: false}}
      initialRouteName="Splash">
      <AuthStack.Screen name="Splash" component={Splash} />
      <AuthStack.Screen name="onBoarding" component={Onboarding} />
      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
      <AuthStack.Screen name="CodeVerification" component={CodeVerification} />
      <AuthStack.Screen name="NewPassword" component={NewPassword} />
      <AuthStack.Screen name="PasswordChanged" component={PasswordChanged} />
      <AuthStack.Screen name="CreateProfile" component={CreateProfile} />
      <AuthStack.Screen name="CreateProfile1" component={CreateProfile1} />
      <AuthStack.Screen name="CreateProfile2" component={CreateProfile2} />
      <AuthStack.Screen name="AddPortfolio" component={AddPortfolio} />
      <AuthStack.Screen name="AddPortfolio1" component={AddPortfolio1} />
      <AuthStack.Screen name="BankToken" component={BankToken} />
    </AuthStack.Navigator>
  );
};
export default AuthScreens;
