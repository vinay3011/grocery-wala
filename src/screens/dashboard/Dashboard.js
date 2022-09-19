import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,

} from "react-native";
import Carousel from '../../components/Carousel';
import BoxItemCategories from "../../components/BoxItemCategories";
import BoxItemTrendingProduct from "../../components/BoxItemTrending";
import Gap from "../../components/Gap";
import {
    colors,
    fonts,
    IC_Bakery,
    IC_Bakery2,
    IC_Drinks,

    IC_Vegetables,
    IL_Cauliflawer_PNG,
    IL_Grapes_PNG,
    IL_Greentea_PNG,
    IL_Tomato_PNG,
} from '../../res';
import VideoCom from '../../components/Video';


const dataTrendingProducts = [
    {
        title: 'Grapes',
        icon: IL_Grapes_PNG,
        bgColor: 'rgba(227,206,243,0.5)',
        price: 1.53,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        title: 'Tometo',
        icon: IL_Tomato_PNG,
        bgColor: 'rgba(255, 234, 232, 0.5)',
        price: 1.53,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        title: 'Drinks',
        icon: IL_Greentea_PNG,
        bgColor: 'rgba(187, 208, 136, 0.5)',
        price: 1.53,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        title: 'Cauliflower',
        icon: IL_Cauliflawer_PNG,
        bgColor: 'rgba(140, 250, 145,0.5)',
        price: 1.53,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        title: 'Grapes',
        icon: IL_Grapes_PNG,
        bgColor: 'rgba(227,206,243,0.5)',
        price: 1.53,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        title: 'Tometo',
        icon: IL_Tomato_PNG,
        bgColor: 'rgba(255, 234, 232, 0.5)',
        price: 1.53,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        title: 'Drinks',
        icon: IL_Greentea_PNG,
        bgColor: 'rgba(187, 208, 136, 0.5)',
        price: 1.53,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        title: 'Cauliflower',
        icon: IL_Cauliflawer_PNG,
        bgColor: 'rgba(140, 250, 145,0.5)',
        price: 1.53,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
];
const fruits = require('../../res/images/Icons/ic_fruits.png')
const Vegetables = require('../../res/images/Icons/ic_vegetables.png')
const bakery = require('../../res/images/Icons/ic_bakery.png')
const bakery1 = require('../../res/images/Icons/ic_bakery2.png')

class Dashboard extends React.Component {

    render() {
        return (
            <View style={styles.DashboardView}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Carousel />
                    <Gap height={15} />
                    <VideoCom />
                    <View>
                        <Text style={styles.titleCategories}>Categories</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.scrollViewCategories}>
                            <BoxItemCategories
                                imageuri={fruits}
                                color="rgba(169, 178, 169, 0.5)"
                                text="Fruits"
                                onPress={() => this.props.navigation.navigate('Categories', 'Fruits')}
                            />
                            <BoxItemCategories
                                imageuri={Vegetables}
                                color="rgba(233, 255, 210, 0.5)"
                                text="Vegetables"
                                onPress={() => this.props.navigation.navigate('Categories', 'Vegetables')}
                            />
                            <BoxItemCategories
                                imageuri={bakery1}
                                color="rgba(214, 255, 218, 0.5)"
                                text="Bakery"
                                onPress={() => this.props.navigation.navigate('Categories', 'Bakery')}
                            />
                            <BoxItemCategories
                                imageuri={fruits}
                                color="rgba(169, 178, 169, 0.5)"
                                text="Fruits"
                                onPress={() => this.props.navigation.navigate('Categories', 'Fruits')}
                            />
                            <BoxItemCategories
                                imageuri={Vegetables}
                                color="rgba(233, 255, 210, 0.5)"
                                text="Vegetables"
                                onPress={() => this.props.navigation.navigate('Categories', 'Vegetables')}
                            />
                            <BoxItemCategories
                                imageuri={bakery1}
                                color="rgba(214, 255, 218, 0.5)"
                                text="Bakery"
                                onPress={() => this.props.navigation.navigate('Categories', 'Bakery')}
                            />

                        </ScrollView>
                    </View>
                    <Gap height={24} />
                    {/* Trending products */}
                    <View>
                        <View style={styles.wrapperHeadTopProducts}>
                            <Text style={styles.tittleTopProducts}>Trending Products</Text>
                        </View>
                        <View style={styles.sectionBoxTopProduct}>
                            {dataTrendingProducts.map((item, index) => {
                                return (
                                    <BoxItemTrendingProduct
                                        key={index}
                                        bgColor={item.bgColor}
                                        icon={item.icon}
                                        text={item.title}
                                        price={item.price}
                                        onPress={() => this.props.navigation.navigate('Detail', item)}
                                    />
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

}
export default Dashboard;

const styles = StyleSheet.create({
    flex1: {
        flex: 1
    },

    titleCategories: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
        color: colors.primary,
        padding: 20,
    },
    scrollViewCategories: {
        paddingLeft: 20,
    },
    wrapperHeadTopProducts: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    tittleTopProducts: {
        color: colors.primary,
        fontFamily: fonts.SemiBold,
        fontSize: 20,
    },
    textSeeAll: {
        color: colors.black,
        fontFamily: fonts.Medium,
        fontSize: 12,
    },
    sectionBoxTopProduct: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    DashboardView:{
        flex: 1, justifyContent: 'center', alignItems: 'center' 
    }

});

