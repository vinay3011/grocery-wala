import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BoxItemCategoryTiles from "../../components/BoxItemCategoryTiles";
import Gap from "../../components/Gap";
import Header from '../../components/Header';
import {
  colors,
  fonts,
} from '../../res';
import { db } from "../../firebase/firebaseConfig/firebase-config";


class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      fruitsAndVeggies: [],
      dairyAndBakeryProducts: []
    });
  }

  componentDidMount() {
    db.ref("FruitsAndVeggies")
      .once("value")
      .then((item) => {
        let data = [];
        item.forEach((childSnapshot) => {
          data.push(childSnapshot.val());
        });
        this.setState({ fruitsAndVeggies: data });
      })

    db.ref("DairyAndBakeryProducts")
      .once("value")
      .then((item) => {
        let dairyData = [];
        item.forEach((childSnapshot) => {
          dairyData.push(childSnapshot.val());
        });
        this.setState({ dairyAndBakeryProducts: dairyData });
      })

  }
  render() {
    return (
      <SafeAreaView style={styles.flex1} >

        <View style={styles.flex1}>
          <Header back cart onPress={() => this.props.navigation.goBack()} navigation={this.props.navigation} />


          <View style={styles.wrapperTittle}>
            <Text style={styles.tittle}>{this.props.route.params}</Text>
          </View>

          <Gap height={10} />

          {/* Content */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.sectionBoxTopProduct}>
              {(this.props.route.params == 'Fruits' || this.props.route.params == 'Vegetables') ?
                this.state.fruitsAndVeggies.map((item, index) => {
                  return (
                    <BoxItemCategoryTiles
                      key={index}
                      bgColor={item.bgColor}
                      icon={item.image}
                      text={item.title}
                      price={item.price}
                      onPress={() => this.props.navigation.navigate('Detail', item)}
                    />
                  );
                })
                :
                this.state.dairyAndBakeryProducts.map((item, index) => {
                  return (
                    <BoxItemCategoryTiles
                      key={index}
                      bgColor={item.bgColor}
                      icon={item.image}
                      text={item.title}
                      price={item.price}
                      onPress={() => this.props.navigation.navigate('Detail', item)}
                    />
                  );
                })

              }
            </View>
          </ScrollView>

        </View>
      </SafeAreaView>
    );
  }
};

export default Categories;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  wrapperTittle: {
    paddingHorizontal: 20,
  },
  tittle: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
  },
  sectionBoxTopProduct: {
    flex1: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
