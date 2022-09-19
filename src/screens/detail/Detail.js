import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share
} from 'react-native';
import { connect } from 'react-redux';
import BoxRelatedItems from '../../components/BoxRelatedItem';
import Button from '../../components/Button';
import Gap from '../../components/Gap'
import Header from '../../components/Header';

import {
  colors,
  fonts,
} from '../../res';
import { IC_Share } from '../../res';
import { addToCart, removeFromCart } from '../../redux/actions/Action';
import { db } from '../../firebase/firebaseConfig/firebase-config';
import { Rating } from 'react-native-elements';


class Detail extends React.Component {
  // const[totalItem, setTotalItem] = useState(1);
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

    const dataParams = this.props.route.params;
    const bgColor = this.props.route.params.bgColor;



    const addProductToCart = (product) => {
      this.props.dispatchAddToFav(product);
    }

    const removeProductFromCart = (product) => {
      this.props.dispatchRemoveFromFav(product);
    }

    const shareMessage = () => {
      const shareMessage = 'Product : ' + dataParams.title + ', Price : ' + dataParams.price + '/kg';
      Share.share({
        message: shareMessage.toString(),
      })
    }


    return (
      <SafeAreaView style={styles.flex1(bgColor)} >

        <View>
          <Header onPress={() => this.props.navigation.goBack()} navigation={this.props.navigation} />
          <View style={styles.wrapperImg}>
            {!dataParams.image ? <Image source={dataParams.icon} style={styles.image} /> : <Image source={{ uri: dataParams.image }} style={styles.image} />}
          </View>
          <View style={styles.content}>
            <View style={styles.wrapperTopContent}>
              <View style={styles.rowTopContent}>
                <Text style={styles.name}>{dataParams.title}</Text>
                <View style={styles.star}>
                  <Rating />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    shareMessage();
                  }}
                >
                  <Image style={styles.shareIcon} source={IC_Share} />
                </TouchableOpacity>
              </View>
              <Text style={styles.price}>{dataParams.price} / kg</Text>
            </View>
            <Text style={styles.desc}>{dataParams.description}</Text>
            <View style={styles.wrapperRelatedItems}>
              <Text style={styles.titleRelatedItems}>Related Items</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.wrapperBoxRelatedItems}>
                  {(dataParams.type == 'vegetable' || dataParams.type == 'fruit') ?
                    this.state.fruitsAndVeggies.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('Detail', item)
                          }}
                        >
                          <BoxRelatedItems
                            key={index}
                            image={item.image}
                            name={item.title}
                            price={item.price}
                            bgColor={item.bgColor}
                            item={item}
                          />
                        </TouchableOpacity>
                      );
                    }) :
                    this.state.dairyAndBakeryProducts.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('Detail', item)
                          }}
                        >
                          <BoxRelatedItems
                            key={index}
                            image={item.image}
                            name={item.title}
                            price={item.price}
                            bgColor={item.bgColor}
                            item={item}
                          />
                        </TouchableOpacity>

                      );
                    })}
                </View>
              </ScrollView>
            </View>
            {/* button add to cart */}
            <Gap height={50} />
            <Button
              onPress={() => addProductToCart(dataParams)}
              text="Add to cart" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  flex1: bgColor => ({
    flex: 1,
    backgroundColor: bgColor,
  }),
  
  shareIcon: {
    height: 30,
    width: 30
  },
  wrapperImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    borderRadius: 20
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 30,
    paddingTop: 34,
  },
  wrapperTopContent: {
    marginBottom: 28,
    paddingHorizontal: 20,
  },
  rowTopContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: fonts.SemiBold,
    fontSize: 20,
  },
  price: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: colors.black,
  },
  desc: {
    paddingHorizontal: 20,
  },
  wrapperRelatedItems: {
    marginTop: 25,
  },
  titleRelatedItems: {
    fontFamily: fonts.SemiBold,
    fontSize: 14,
    color: colors.primary,
    paddingHorizontal: 20,
  },
  wrapperBoxRelatedItems: {
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 20,
  },
});

const mapDispatchToProps = {
  dispatchAddToFav: product => addToCart(product),
  dispatchRemoveFromFav: product => removeFromCart(product)
}

const mapStateToProps = state => ({
  productCart: state.CartReducer.productCart,
})

// export default connect(mapStateToProps, mapDispatchToProps)(Detail);
export default connect(mapStateToProps, mapDispatchToProps)(Detail)

