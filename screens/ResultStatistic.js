import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    Platform
} from 'react-native';
import ItemStatistic from '../components/ItemStatistic';
import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit';
var arrDataDau = [], arrDataDuoi = [];

export default class ResultStatistic extends Component{

    constructor(props){
        super(props);
        arrDataDau = this.props.navigation.state.params.arrDau;
        arrDataDuoi = this.props.navigation.state.params.arrDuoi;

        console.log('MANG TK DAU: ' + JSON.stringify(arrDataDau));
    }

    render(){
        return(
            <SafeAreaView style = {{flex: 1, marginHorizontal: 2, marginTop: Platform.OS === 'ios'? 30 : 0}}>
                <Text>Đầu số xuất hiện trọng 30 lần quay xổ số miền bắc</Text>
                <View style={{flexDirection: 'row', backgroundColor: 'red', borderBottomColor: 'grey', borderBottomWidth: 1}}>
                    <Text style={{flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Đầu</Text>
                    <Text style={{flex: 3, textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Đặc biệt</Text>
                    <Text style={{flex: 3, textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Lô tô</Text>
                </View>
                <FlatList
                    data = {arrDataDau}
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
                <Text style = {{marginTop: 10}}>Đuôi số xuất hiện trọng 30 lần quay xổ số miền bắc</Text>
                <View style={{flexDirection: 'row', backgroundColor: 'red', borderBottomColor: 'grey', borderBottomWidth: 1}}>
                    <Text style={{flex: 1, textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Đuôi</Text>
                    <Text style={{flex: 3, textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Đặc biệt</Text>
                    <Text style={{flex: 3, textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Lô tô</Text>
                </View>
                <FlatList
                    data = {arrDataDuoi}
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
            </SafeAreaView>
        );
    }

    clickExit(){
        this.props.navigation.goBack();
    }
}