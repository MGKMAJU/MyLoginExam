import React, { Component } from "react";
import { View } from "react-native";
// import the firebase third party lib
import firebase from "firebase";
// Custom Components to be used in the app
import {
Header,
CustomButton,
CardSection,
Card,
Spinner
} from "./components/common";
// Import our LoginForm component to be displayed on the screen
import LoginForm from "./components/LoginForm";

class App extends Component {
state = { loggedIn: null };
// Life cycle method to init the firebase
componentWillMount() {
firebase.initializeApp({
apiKey: "AIzaSyDV-EREF0SeH1iSM2DYNsaCpzjZayCGWNo",
authDomain: "rnapp-auth-class-mad.firebaseapp.com",
databaseURL: "https://rnapp-auth-class-mad.firebaseio.com",
projectId: "rnapp-auth-class-mad",
storageBucket: "rnapp-auth-class-mad.appspot.com",
messagingSenderId: "561918213506"
});

//Handle the Application when it's logged in or logged out
firebase.auth().onAuthStateChanged(user => {
if (user) {
this.setState({ loggedIn: true });
} else {
this.setState({ loggedIn: false });
}
});
}

renderContent() {
switch (this.state.loggedIn) {
case true:
return (
<Card>
<CardSection>
<CustomButton onPress={() => firebase.auth().signOut()}>
Logout
</CustomButton>
</CardSection>
</Card>
);
case false:
return <LoginForm />;
default:
return <Spinner size="large" />;
}
}
render() {
return (
<View>
<Header headerText="Authentication" />
{this.renderContent()}
{/* 
Before the renderContent Handling
<LoginForm /> */}
</View>
);
}
}

export default App;
