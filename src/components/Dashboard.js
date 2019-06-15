
import React, {Component} from 'react';
import { CustomButton, Card, CardSection, Input, Spinner } from "./common";

export default class Dashboard extends Component {
  render() {
    return (
        <Card>
            <CardSection>
                <CustomButton onPress={() => firebase.auth().signOut()}>
                Logout
                </CustomButton>
            </CardSection>
        </Card>
    );
  }
}

 
