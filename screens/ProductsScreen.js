import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Platform,
    BackHandler
 } from 'react-native';
 import ItemProduct from '../components/ItemProduct';
 import data from '../components/ListProduct';

 export default class ProductsScreen extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

     render() {
         return (
             <View style={{flex:1, marginTop: Platform.OS==='ios'?30:0}}>
                <View style = {styles.header_style}>
                    <Text style = {styles.text_style}>Danh sách gói dịch vụ</Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={({item, index})=>{
                        return(
                            <ItemProduct item={item}
                            /> 
                        );
                    }}
                    keyExtractor={(item, index)=>index.toString()}
                >
                </FlatList>
             </View>
         );
     }
 }

 const styles = ({
    header_style:{
        width: '100%',
        height: 50,
        backgroundColor: '#3F51B5',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        marginTop: 20,
    },
    text_style:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
 });