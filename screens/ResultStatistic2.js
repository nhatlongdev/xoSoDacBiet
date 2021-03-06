import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    Platform
} from 'react-native';
import ItemStatistic2 from '../components/ItemStatistic2';
import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit';
var arrData = [];
var nameTinh, soLanQuay;
export default class ResultStatistic2 extends Component{

    constructor(props){
        super(props);
        arrData = this.props.navigation.state.params.arr;
        nameTinh=this.props.navigation.state.params.nameTinh;
        soLanQuay=this.props.navigation.state.params.soLanQuay;
    }

    render(){
        return(
            <View style = {{flex: 1, marginHorizontal: 2, marginTop: Platform.OS==='ios'?30:0}}>
                <Text style = {{fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: 'black', paddingVertical: 2}}>
                    Số xuất hiện nhiều trong {soLanQuay} lần quay xổ số {nameTinh}
                </Text>
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