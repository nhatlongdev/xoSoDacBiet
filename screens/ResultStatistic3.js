import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    Platform
} from 'react-native';
import ItemStatistic3 from '../components/ItemStatistic3';
import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit';
var arrData = [];
var nameTinh, soLanQuay;
export default class ResultStatistic3 extends Component{

    constructor(props){
        super(props);
        arrData = this.props.navigation.state.params.arr;
        nameTinh=this.props.navigation.state.params.nameTinh;
        soLanQuay=this.props.navigation.state.params.soLanQuay;
    }

    render(){
        return(
            <SafeAreaView style = {{flex: 1, marginHorizontal: 2, marginTop:Platform.OS === 'ios'?30:0}}>
                <Text style = {{fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: 'black'}}>
                    Thống kê các số lâu ra trong {soLanQuay} lần quay xổ số {nameTinh}
                </Text>
                <View style={{flexDirection: 'row', backgroundColor: 'red', borderBottomColor: 'grey', borderBottomWidth: 1, paddingVertical: 2}}>
                    <Text style={{flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Số</Text>
                    <Text style={{flex: 6, textAlign: 'center', justifyContent: 'center' , color: 'white', fontWeight: 'bold'}}>Số ngày chưa ra</Text>
                </View>
                <FlatList
                    data = {arrData}
                    renderItem = {({item, index})=>{
                        return(
                            <ItemStatistic3
                                item = {item} index = {index}
                            />
                        );
                    }}
                    keyExtractor={ (item, index) => index.toString() }
                >
                </FlatList>
               
                <FloatButtonCompomentExit
                     onButtonFloatPress={this.clickExit.bind(this)}
                />
            </SafeAreaView>
        );
    }

    clickExit(){
        this.props.navigation.goBack();
    }
}