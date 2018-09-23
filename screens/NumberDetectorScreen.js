import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Picker,
    TextInput,
    Image,
    TouchableOpacity,
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
import ResultDoSoComponent from './ResultDoSoComponent';
import GlobalValue from '../components/GlobalValue';

import {
    GoogleAnalyticsTracker,
    GoogleAnalyticsSettings,
    GoogleTagManager
  } from "react-native-google-analytics-bridge";

var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;
var item_;
var data_detector = [];
var objResultDoSo = {};
var dataResultLottery = {};
var soDo = '';
var soLanQuay = 30;
var arrSoDo;
export default class NumberDetectorScreen extends Component {
    
    constructor(props){
        super(props);
        arrSoDo = [];
        data_detector = [];
        this.state= {
            selected: data[0],
            data_detector: data_detector,
            textSoDo: '',
            textSoLanQuay: '30',
            soDoTraCuu: '',
            msg_progress:''
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

    shouldComponentUpdate(){
        return true;
    }

    componentWillUpdate(){
        console.log('CO RENDER LAI')
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

        // Recommend you set this much higher in real app! 30 seconds+
        // GoogleAnalyticsSettings has static methods and is applied
        // for all trackers
        GoogleAnalyticsSettings.setDispatchInterval(2);
        //GoogleAnalyticsSettings.setDryRun(true);
        //GoogleAnalyticsSettings.setOptOut(true);

        // The tracker is constructed
        let tracker = new GoogleAnalyticsTracker("UA-124642701-1");
        // You can have multiple trackers
        //let tracker2 = new GoogleAnalyticsTracker("UA-12345-3", { demo: 1 });
        tracker.trackScreenView("Detector_Screen");

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
                        maxLength = {5} 
                        placeholder={'Nhập số cần dò'}
                        placeholderTextColor = {'grey'}
                        onChangeText = {(text)=>this.setState({textSoDo: text})}
                        keyboardType='numeric'
                        value = {this.state.textSoDo}
                    />
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',borderRadius: 2, backgroundColor: '#CCCCCC', height: 50,padding: 5}}
                                    onPress = {()=>this.checkStringInputLegal(this.state.textSoLanQuay, this.state.textSoDo) === 'ok'? 
                                    this.numberDetector(item_, this.state.textSoDo, this.state.textSoLanQuay):
                                    null}
                    >
                        <Text style={{flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold'}}>TRA CỨU LÔ TÔ, DÒ SỐ</Text>   
                        <Image
                        source={require('../images/right_arrow31.png')}
                        />
                    </TouchableOpacity>
                    </View>

                    <ResultDoSoComponent arrSoDo={GlobalValue.arrSoDo} objResultDoSo={GlobalValue.objResultDoSo}/> 

                </ScrollView>
                <FloatButtonCompomentExit
                     onButtonFloatPress={this.clickExit.bind(this)}
                />

            </View>
        );
    }

    //Sử dụng reg để kiểm tra chuỗi ký tự nhập vào có hợp lệ ko
    checkStringInputLegal(soLanQuay, chuoiDo){
        var str ='ok';
        if(soLanQuay.length === 0){
            str = 'Bạn chưa nhập số lần quay';
        }else if(chuoiDo.length === 0){
            str = 'Bạn chưa nhập số cần dò';
        }else{
            var pattern_1 = /^[0-9]{1,2}$/;
            var pattern_2 = /^[0-9]{2},[0-9]{2}$/;
            if(pattern_1.test(soLanQuay) === false){
                str = 'Số lần quay không đúng định dạng, vui lòng nhập lại';
            }else if(pattern_1.test(chuoiDo)=== false && pattern_2.test(chuoiDo) === false) {
                 str= 'Số dò nhập không đúng định dạng, vui lòng kiểm tra lại';
            }
        }
        arrSoDo=[];
        this.setState({
            msg_progress:str,
        })
        return str;
    }

    //hàm for để sét list kết quả dò số
    showListResultDetector(arr){
        if(arr.length>0){
            for(let i=0; i<arr.length; i++){

            }
        }
    }

    clickExit(){
        this.props.navigation.goBack();
    }

    numberDetector(_item, soDo, soLanQuay){
        this.setState({
            msg_progress:'Đang xử lý, vui lòng đợi...'
        })
       //Tách chuỗi nhập vào ra thành mảng number
       arrSoDo = [];
       var arrSoDoTam  = [];
       var arrNumber = soDo.split(','); 
        console.log("SO DO: " + arrNumber.length)
       for(let i =0;i<arrNumber.length;i++){
            if(arrNumber[i].length !== 2) break;
            if(dataBong[arrNumber[i]] != null){
                console.log("CHAY VAO DK khac null ")
                arrSoDoTam = arrSoDoTam.concat(dataBong[arrNumber[i]]);
            }
       } 
       
       //Loại bỏ phần tử trùng nhau trong mảng
       if(arrSoDoTam.length >0){
            // set min count db, loto
            var _ = require('underscore');	
            arrSoDo = _.uniq(arrSoDoTam);
            // alert(arrSoDo.length)
       }

        this.setState({
            soDoTraCuu: soDo +"",
        })

        //Lấy mảng kết quả của tỉnh được chọn
        var arrLotteryOfProvinces = {};
        arrLotteryOfProvinces = dataResultLottery[_item.code];
        console.log('Data dua vao: ' + JSON.stringify(arrLotteryOfProvinces) + " -----" + arrLotteryOfProvinces.length)


        for(let n=0; n<arrSoDo.length; n++){
            let arr_kq = filterArrDetector(arrLotteryOfProvinces,arrSoDo[n],soLanQuay);
            objResultDoSo[arrSoDo[n]] = arr_kq;
        }

        GlobalValue.arrSoDo = arrSoDo;
        GlobalValue.objResultDoSo = objResultDoSo;

        console.log('KET QUA: ' + JSON.stringify(objResultDoSo))

        // chỗ này ko để làm gì nhưng tạm để lại để render lại giao diện
        data_detector = filterArrDetector(arrLotteryOfProvinces,soDo,soLanQuay);
        this.setState({
            data_detector: data_detector
        })
        if(arrSoDo.length>0){
            this.setState({
                msg_progress:''
            })
        }else{
            this.setState({
                msg_progress:'Số dò không hợp lệ vui lòng kiểm tra lại!'
            })
        }
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