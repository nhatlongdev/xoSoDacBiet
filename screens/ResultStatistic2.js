import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import ItemStatistic2 from '../components/ItemStatistic2';
import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit';
var arrData = [];
export default class ResultStatistic2 extends Component{

    constructor(props){
        super(props);
        arrData = this.props.navigation.state.params.arr;
    }

    render(){
        return(
            <View style = {{flex: 1, marginHorizontal: 2}}>
                <Text>Đầu số xuất hiện nhiều trong 30 lần quay xổ số miền bắc</Text>
                <View style={{flexDirection: 'row', backgroundColor: 'red', borderBottomColor: 'grey', borderBottomWidth: 1}}>
                    <Text style={{flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Số</Text>
                    <Text style={{flex: 6, textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Số lượt</Text>
                </View>
                <FlatList
                    data = {arrData}
                    renderItem = {({item, index})=>{
                        return(
                            <ItemStatistic2
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