import React, { Component } from "react";
import { View } from "react-native";
 
import firebase from "firebase";
 
import { Header, CustomButton,CardSection,Card,Spinner } from "./components/common";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { createStackNavigator, createAppContainer, createDrawerNavigator  } from "react-navigation";

class App extends Component {
state = { loggedIn: null };
// Life cycle method to init the firebase
componentWillMount() {
    firebase.initializeApp({
        apiKey: "AIzaSyAOzbePGeLk_vV55QS2IZOyaUzp8hOIRPs",
        authDomain: "examslogin-22957.firebaseapp.com",
        databaseURL: "https://examslogin-22957.firebaseio.com",
        projectId: "examslogin-22957",
        storageBucket: "",
        messagingSenderId: "319922041574",
        appId: "1:319922041574:web:b7370f798313bbcc"
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
         <AppContainer/>  
        );
    }
}
const AppNavigator = createStackNavigator({
    Starter: {
        screen:LoginForm,
        navigationOptions: {
            header: null,
        }
    },
    SignUpForm: SignUpForm,
    Dashboard: Dashboard 
});
const AppContainer = createAppContainer(AppNavigator);
export default App;
