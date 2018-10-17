import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Platform,
    BackHandler,
    Image
 } from 'react-native';
 import ItemProduct from '../components/ItemProduct';
 import GlobalValue from '../components/GlobalValue';

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
            <View style = {{flex: 1, marginTop: Platform.OS==='ios'?30:0}}>
                <View style = {styles.header_style}>
                    <TouchableOpacity onPress = {()=>
                        this.handleBackButtonClick()
                    }>
                        <Image
                            style={{width:30, height: 30, tintColor:'white'}}
                            source = {require('../images/arrow_back.png')}
                        />
                    </TouchableOpacity>
                    <Text style = {styles.text_style}>Danh sách gói dịch vụ</Text>
                </View> 
                
                <FlatList
                    data={GlobalValue.dataProduct}
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
    container:{
        flex:1,
        backgroundColor: 'yellow'
    },
    header_style:{
        width: '100%',
        height: 50,
        backgroundColor: '#3F51B5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    text_style:{
        flex:1,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    }
 });