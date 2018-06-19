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
export default class ResultStatistic1 extends Component{

    constructor(props){
        super(props);
        arrData = this.props.navigation.state.params.arr;
        type = this.props.navigation.state.params.type;
    }

    render(){
        return(
            <View style = {{flex: 1, marginHorizontal: 2}}>
                <Text>Đầu số xuất hiện trọng 30 lần quay xổ số miền bắc</Text>
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