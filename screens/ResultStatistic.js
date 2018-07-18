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
var nameTinh, soLanQuay;

export default class ResultStatistic extends Component{

    constructor(props){
        super(props);
        arrDataDau = this.props.navigation.state.params.arrDau;
        arrDataDuoi = this.props.navigation.state.params.arrDuoi;
        nameTinh=this.props.navigation.state.params.nameTinh;
        soLanQuay=this.props.navigation.state.params.soLanQuay;
        console.log('MANG TK DAU: ' + JSON.stringify(arrDataDau));
    }

    render(){
        return(
            <SafeAreaView style = {{flex: 1, marginHorizontal: 2, marginTop: Platform.OS === 'ios'? 30 : 0}}>
                <Text style = {{fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: 'black'}}>Đầu số xuất hiện trong {soLanQuay} lần quay xổ số {nameTinh}</Text>
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
                <Text style = {{marginTop: 10, fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: 'black'}}>Đuôi số xuất hiện trong {soLanQuay} lần quay xổ số {nameTinh}</Text>
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