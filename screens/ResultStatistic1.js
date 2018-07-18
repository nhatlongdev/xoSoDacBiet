import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import ItemStatistic from '../components/ItemStatistic';
import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit';
var arrData = [];
var type = '';
var nameTinh, soLanQuay;
export default class ResultStatistic1 extends Component{

    constructor(props){
        super(props);
        arrData = this.props.navigation.state.params.arr;
        type = this.props.navigation.state.params.type;
        nameTinh=this.props.navigation.state.params.nameTinh;
        soLanQuay=this.props.navigation.state.params.soLanQuay;
    }

    render(){
        return(
            <View style = {{flex: 1, marginHorizontal: 2}}>
                <Text style = {{fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: 'black'}}>
                   {type === '0'?
                   'Thống kê tổng hai số cuối xuất hiện trong ' + soLanQuay + ' lần quay xổ số ' + nameTinh:
                   'Thống kê số lần 00 - 99 xuất hiện trong ' + soLanQuay + ' lần quay xổ số ' + nameTinh} 
                </Text>
                <View style={{flexDirection: 'row', backgroundColor: 'red', borderBottomColor: 'grey', borderBottomWidth: 1}}>
                    <Text style={{flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold'}}>{type == '0'?'Tổng': 'Số'}</Text>
                    <Text style={{flex: 3, textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Đặc biệt</Text>
                    <Text style={{flex: 3, textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Lô tô</Text>
                </View>
                <FlatList
                    data = {arrData}
                    renderItem = {({item, index})=>{
                        return(
                            <ItemStatistic
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
            </View>
        );
    }

    clickExit(){
        this.props.navigation.goBack();
    }
}