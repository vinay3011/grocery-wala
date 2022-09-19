import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native";
import { db } from "../../firebase/firebaseConfig/firebase-config";


class FruitsAndVeggies extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            fruitsAndVeggies: []
        });
    }

    componentDidMount() {
        db.ref("FruitsAndVeggies")
            .once("value")
            .then((item) => {
                let user = [];
                item.forEach((childSnapshot) => {
                    user.push(childSnapshot.val());
                });
                this.setState({ fruitsAndVeggies: user });
            })
    }

    render() {
        return (
            <View>
                <Text>
                    Hello
                </Text>
                <FlatList
                    data={this.state.fruitsAndVeggies}
                    renderItem={({ item }) => (
                        <Text>{item.title}</Text>
                    )}
                />
            </View>
        )
    }
}

export default FruitsAndVeggies;