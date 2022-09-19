import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { Radio, } from 'native-base';
import { addToCart, removeFromCart, removeOneItemFromCart, totalCost } from '../../redux/actions/Action';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { makePayment } from '../../components/PaymentCheckout';

const shippingMethod = 'Normal';

class ProductCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingMethod: ''
    }
  }


  render() {

    const { productCart } = this.props;

    const addItemToCart = (product) => {
      this.props.dispatchAddToCart(product)
    }

    const removeItemFromCart = (product) => {
      this.props.dispatchRemoveFromCart(product)
    }

    const removeOneItemFromCart = (product) => {
      this.props.dispatchRemoveOneItem(product)
    }


    return (
      <View style={styles.container}>
        <Header onPress={() => this.props.navigation.goBack()} />
        <Text style={styles.paymentTitle}>Payment Grocery Wala</Text>
        <View style={styles.cartContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.cartTitleView}>
              <Image style={styles.cartIcon} source={{ uri: 'https://img.icons8.com/pastel-glyph/344/shopping-cart--v2.png' }} />
              <Text style={styles.cartTitle}>My Cart</Text>
            </View>
            {productCart.length > 0 ? (
              <View>
                {productCart
                  .map((product) => (
                    <View style={styles.productView}>
                      <Image
                        style={styles.productImage}
                        source={{
                          uri: product.image,
                        }}
                      />
                      <View style={styles.productMiddleView}>
                        <Text style={styles.productTitle}>{product.title}</Text>
                        <Text style={styles.productCompanyTitle}>
                          {product.type}
                        </Text>
                      </View>
                      <View style={styles.productRightView}>
                        <Text
                          style={styles.productPriceText}
                        >{`₹${product.price}`}</Text>
                        <View style={styles.productItemCounterView}>
                          <TouchableOpacity
                            onPress={() => {
                              removeItemFromCart(product);
                            }}
                          >
                            <Image
                              style={styles.toggleCounterButton}
                              source={{ uri: 'https://img.icons8.com/ios/344/minus.png' }}
                            />
                          </TouchableOpacity>
                          <Text style={styles.counterValue}>
                            {product.qty}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              addItemToCart(product);
                            }}
                          >
                            <Image
                              style={styles.toggleCounterButton}
                              source={{ uri: 'https://img.icons8.com/ios/344/plus--v1.png' }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                <View style={styles.couponInputView}>
                  <TextInput
                    placeholder='Coupon Code'
                    style={styles.couponInput}
                  />
                  <TouchableOpacity style={styles.couponButton}>
                    <Text style={styles.couponButtonText}>Apply Coupon</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.subtotalView}>
                  <Text style={styles.subtotalText}></Text>
                  <Text style={styles.subtotalPrice}>
                    ₹{Number(productCart.reduce((acc, val) => val.price + acc, 0)).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.shippingView}>
                  <Text style={styles.shippingText}>Shipping -</Text>
                  <View style={styles.shippingItemsView}>
                    <TouchableOpacity
                      style={styles.shippingItem}
                      onPress={() => {
                        this.setState({ shippingMethod: 'Normal' })
                      }}
                    >
                      <Text style={styles.shippingItemText}>Normal (Free)</Text>
                      <Radio selected={shippingMethod === 'Normal'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.shippingItem}
                      onPress={() => {
                        this.setState({ shippingMethod: 'Express' })
                      }}
                    >
                      <Text style={styles.shippingItemText}>Express (₹60)</Text>
                      <Radio selected={shippingMethod === 'Express'} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.totalView}>
                  <Text style={styles.totalText}>Total -</Text>
                  {this.state.shippingMethod === 'Normal' ? (
                    <Text style={styles.totalPrice}>
                      ₹{Number(productCart.reduce((acc, val) => val.price + acc, 0)).toFixed(2)}
                    </Text>
                  ) : (
                    <Text style={styles.totalPrice}>
                      ₹{productCart.reduce((acc, val) => val.price + acc, 0) + 60}
                    </Text>
                  )}
                </View>
                <TouchableOpacity style={styles.checkoutButton} onPress={()=>{makePayment()}}>
                  <Text style={styles.checkoutButtonText}>
                    Proceed to Checkout
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.emptyCartView}>
                <Text style={styles.emptyCartViewText}>Your cart is empty.</Text>
              </View>
            )}

            <View style={{ height: 100 }}></View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(148, 156, 255, .5)',
    paddingTop: 40,
  },
  header: {
    alignItems: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  paymentTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fff',
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  cartContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 30,
    paddingHorizontal: 16,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  cartTitleView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginLeft: 10,
  },
  productView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(140, 250, 145,0.2)',
    paddingVertical: 6,
    paddingHorizontal: 8,
    // borderRadius: 10,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    // shadowRadius: 2,
    elevation: 2,
    marginTop: 14,
  },
  productImage: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  productMiddleView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  productCompanyTitle: {
    fontSize: 16,
    fontWeight: '300',
  },
  productRightView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productItemCounterView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 4,
  },
  counterValue: {
    fontSize: 20,
    fontWeight: '500',
    padding: 2
  },
  productPriceText: {
    alignSelf: 'flex-end',
    paddingRight: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  toggleCounterButton: {
    // paddingHorizontal: 10,
    height: 20,
    width: 20
  },
  couponInputView: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#333',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  couponInput: {
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  couponButton: {
    backgroundColor: 'rgba(148, 156, 255, 1.0)',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  couponButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  subtotalView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: '500',
  },
  subtotalPrice: {
    fontSize: 18,
    fontWeight: '300',
  },
  shippingView: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    paddingBottom: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  shippingItemsView: {
    marginTop: 10,
  },
  shippingText: {
    fontSize: 18,
    fontWeight: '500',
  },
  shippingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shippingItemText: {
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: '300',
  },
  totalView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '300',
    fontWeight: 'bold',
    // color: 'blue'
  },
  checkoutButton: {
    backgroundColor: 'rgba(148, 156, 255, 1.0)',
    paddingVertical: 14,
    marginTop: 30,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  emptyCartView: {
    flex: 1,
    marginTop: 140,
  },
  emptyCartViewText: {
    fontSize: 20,
    fontWeight: '300',
    alignSelf: 'center',
  },
  cartIcon: {
    height: 28,
    width: 28
  }
});


const mapDispatchToProps = {
  dispatchAddToCart: product => addToCart(product),
  dispatchRemoveFromCart: product => removeFromCart(product),
  dispatchRemoveOneItem: product => removeOneItemFromCart(product)
}

const mapStateToProps = state => ({
  productCart: state.CartReducer.productCart,
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductCart);

