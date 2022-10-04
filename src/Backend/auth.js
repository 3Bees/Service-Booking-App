import {auth} from './firebaseConfig';
import {saveData, uriToBlob, downloadImage} from './utility';
import Toast from 'react-native-simple-toast';

export async function userSignUp(email, password) {
  let userData = null;
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then(async user => {
      Toast.show(
        'Sign Up Successful! we send a message to the email...To verify your email address, click the link and sign',
      );
      let actions = [user.user.sendEmailVerification()];
      await Promise.all(actions)
        .then(async () => {
          console.log('User', user, 'emailVerified', user.user.emailVerified);
        })
        .catch(error => {
          console.log('#############', error.message);
        });
      userData = user;
    })
    .catch(error => {
      userData = 'error';
      Toast.show(error.code);
    });
  return userData;
}
export async function signInWithEmail(email, password) {
  let success = true;
  await auth
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) {
      success = false;
      Toast.show(error.code);
      // alert(error.code + ': ' + error.message);
    });
  return success;
}
export async function signInWithPhoneNumber(phoneNo, password) {
  let success = true;
  await auth
    .signInWithEmailAndPassword(phoneNo, password)
    .catch(function (error) {
      success = false;
      // alert(error.code + ': ' + error.message);
    });
  return success;
}
export async function getCurrentUserId() {
  var user = auth.currentUser;
  if (user != null) {
    return user.uid;
  }
}
export async function getCurrentUser() {
  var user = auth.currentUser;
  if (user != null) {
    return user;
  }
}
export async function logout() {
  await auth
    .signOut()
    .catch(error => console.log('>>>>>>>>>>>>>>>>', error.message));
}
