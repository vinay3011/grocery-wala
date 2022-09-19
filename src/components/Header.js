import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';

class Header extends React.Component {

  render() {

    const { productCart } = this.props;
    if (this.props.drawer) {
      return (
        <View style={styles.wrapperHeader}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Image source={require('../res/images/Icons/ic_drawer.png')} />
          </TouchableOpacity>
          <View style={styles.cartCounterView} >
            <Text style={styles.cartCounter} >{productCart.length}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('YourCart');
          }}>
            <Image source={require('../res/images/Icons/ic_cart.png')} />
          </TouchableOpacity>
        </View>
      );
    }
    if (this.props.back && this.props.cart) {
      return (
        <View style={styles.wrapperHeader}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Image source={require('../res/images/Icons/ic_back.png')} />
          </TouchableOpacity>
          <View style={styles.cartCounterView} >
            <Text style={styles.cartCounter} >{productCart.length}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('YourCart');
          }}>
            <Image source={require('../res/images/Icons/ic_cart.png')} />
          </TouchableOpacity>
        </View>
      );
    }
return (
      <View style={styles.wrapperHeader}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image source={require('../res/images/Icons/ic_back.png')} />
        </TouchableOpacity>
        <View style={styles.cartCounterView} >
          <Text style={styles.cartCounter} >{productCart.length}</Text>
        </View>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('YourCart');
        }}>
          <Image source={require('../res/images/Icons/ic_cart.png')} />
        </TouchableOpacity>
      </View>
    );
  }

};
// export default Header;

const styles = StyleSheet.create({
  wrapperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  cartCounterView: {
    position: 'absolute',
    right: 15,
    top: 10,
    borderWidth: 1,
    width: 20,
    borderRadius: 20,
    backgroundColor: 'red',
    borderColor: 'red'
  },
  cartCounter: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white'
  }
});

const mapStateToProps = state => ({
  productCart: state.CartReducer.productCart
})

export default connect(mapStateToProps)(Header)

