import React, { Component } from "react";
import { Text } from "react-native";
import firebase from "firebase";
// import { TextInput } from "react-native";
import { CustomButton, Card, CardSection, Input, Spinner } from "./common";

class LoginForm extends Component {
    // To handle the text input we need the state in the action
    state = { email: "", password: "", error: "", loading: false,errorMessage:'' };

    //Helper method onButtonPress() to Login the user
    onButtonPress() {
    const { email, password } = this.state;
    //Firebase mathod to login using userid & password

    //Clear out the Error Message on Every Login Attempt
    this.setState({ error: "", loading: true });

    //Firebase authentication with Email and password
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(this.props.navigation.navigate('Dashboard'))
        .catch(error => this.setState({ errorMessage: error.message }));
    }
    //functions on failed
    onLoginFailed() {
        this.setState({
            error: "Authentication Failed",
            loading: false
        });
    }
    //function on success
    onLoginSuccess() {
        this.setState({
            email: "",
            password: "",
            loading: false,
            error: ""
        });
    }
    //render button 
    renderButton() {
    if (this.state.loading) {
        return <Spinner size="small" />;
    }
    return (
        <CustomButton onPress={this.onButtonPress.bind(this)}>
            Sign Up
        </CustomButton>
    );
    }

    render() {
        return (
            <Card>
                 {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
                <CardSection>
                 
                <Input
                    autoCorrect
                    placeholder="user@email.com"
                    label="Email: "
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                </CardSection>
                {/* For Password */}
                <CardSection>
                <Input
                    secureTextEntry
                    placeholder="password"
                    label="Password"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                </CardSection>
                {/* For the Error Message */}
                <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                {/* For the Login Button */}
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
    );
    }
}

const styles = {
errorTextStyle: {
fontSize: 20,
alignSelf: "center",
color: "red"
}
};
export default LoginForm;