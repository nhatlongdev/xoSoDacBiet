import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Picker,
    Item,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    BackHandler,
    Platform
} from 'react-native';
import data from '../components/TinhThanh';
import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit';
import ItemNumDetector from '../components/ItemNumDetector';
import {filterArrDetector} from '../components/FilterArrDetector';
import Color from '../src/color';
import dataLottery_detector_statistic from '../components/DataLottery';
import ItemFlatListDoSo from '../components/ItemFLatListDoSo';
import dataBong from '../components/BongDoSo';

var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;
var item_;
var data_detector = [];
var objResultDoSo = {};
var dataResultLottery = {};
var soDo = '';
var soLanQuay = 30;
export default class NumberDetectorScreen extends Component {
    
    constructor(props){
        super(props);
        data_detector = [];
        this.state= {
            selected: data[0],
            data_detector: data_detector,
            textSoDo: '',
            textSoLanQuay: '30',
            soDoTraCuu: '',
        }
        item_ = data[0];

        dataResultLottery = dataLottery_detector_statistic.data;
        console.log('HHHHNEw=====>>>>' + JSON.stringify(dataResultLottery));
        console.log('HHHHNEw0000=====>>>>' + JSON.stringify(dataBong));
        console.log('HHHHNEw98=====>>>>' + JSON.stringify(dataBong[98].length));
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    renderItem(){
        items = [];
        for(let item of data){
            items.push(<Picker.Item key = {item.code} label={item.name} value={item.code}/>)
        }
        return items
    }

    render(){
        return(
            <View style = {{flex: 1, marginTop: Platform.OS==='ios'?30:0}}>
                <View style = {style.header_style}>
                    <Text style = {style.text_style}>Xổ số đặc biệt - Dò số</Text>
                </View>
                <ScrollView style={{flex:1}}>
                    <View style = {{padding: 10, marginBottom: 5}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>Chọn tỉnh/thành phố:</Text>
                    <Picker 
                        selectedValue = {this.state.selected}
                        onValueChange={
                            (itemValue, itemIndex, item) => {
                                this.setState({
                                    selected: itemValue
                                })
                                item_ = data[itemIndex];
                            }
                            }
                    mode={'dropdown'}
                    > 
                        {this.renderItem()}
                    </Picker>
                    <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>Chọn số lần quay:</Text>
                    <TextInput
                        maxLength = {2}   
                        placeholder={'Số lần quay'}
                        placeholderTextColor = {'grey'}
                        onChangeText = {(text)=>this.setState({textSoLanQuay: text})}
                        keyboardType='numeric'
                        value={this.state.textSoLanQuay}    
                    />
                    <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>Số dò (ví dụ: 66 hoặc 68,86):</Text>
                    <TextInput
                        maxLength = {2} 
                        placeholder={'Nhập số cần dò'}
                        placeholderTextColor = {'grey'}
                        onChangeText = {(text)=>this.setState({textSoDo: text})}
                        keyboardType='numeric'
                        value = {this.state.textSoDo}
                    />
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',borderRadius: 2, backgroundColor: '#CCCCCC', height: 50,padding: 5}}
                                    onPress = {()=>this.state.textSoDo.length == 2?this.numberDetector(item_, this.state.textSoDo, this.state.textSoLanQuay) : 
                                        this.state.textSoDo.length == 0? alert('Vui lòng nhập số cần dò') : alert('Số dò phải gồm 2 số!')}
                    >
                        <Text style={{flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold'}}>TRA CỨU LÔ TÔ, DÒ SỐ</Text>   
                        <Image
                        source={require('../images/right_arrow31.png')}
                        />
                    </TouchableOpacity>
                    </View>

                    <ItemFlatListDoSo soTraCuu={this.state.soDoTraCuu} data={data_detector}/>

                </ScrollView>
                <FloatButtonCompomentExit
                     onButtonFloatPress={this.clickExit.bind(this)}
                />

            </View>
        );
    }

    clickExit(){
        this.props.navigation.goBack();
    }

    numberDetector(_item, soDo, soLanQuay){
       //Tách chuỗi nhập vào ra thành mảng number
       var arrSoDo = [];
       var arrSoDoTam  = [];
       var arrNumber = soDo.split(','); 
       for(let i =0;i<arrNumber.length;i++){
            if(arrNumber[i].length !== 2) break;
            if(dataBong[arrNumber[i]] != null){
                arrSoDoTam = arrSoDoTam.concat(dataBong[arrNumber[i]]);
            }
       } 
       
       //Loại bỏ phần tử trùng nhau trong mảng
       if(arrSoDo.length >0){
            // set min count db, loto
            var _ = require('underscore');	
            arrSoDo = _.uniq(arrSoDo);
       }


        this.setState({
            soDoTraCuu: soDo +"",
        })
        var arrLotteryOfProvinces = {};
        arrLotteryOfProvinces = dataResultLottery[_item.code];
        console.log('Data dua vao: ' + JSON.stringify(arrLotteryOfProvinces) + " -----" + arrLotteryOfProvinces.length)

        data_detector = filterArrDetector(arrLotteryOfProvinces,soDo,soLanQuay);
        this.setState({
            data_detector: data_detector
        })
        console.log('RESULT:  ' + JSON.stringify(data_detector));
    }

}

var style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'yellow'
    },
    header_style:{
        width: '100%',
        height: 50,
        backgroundColor: '#3F51B5',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    text_style:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    }
})