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
    TouchableOpacity
} from 'react-native';
var item_;
import data from '../components/TinhThanh';
import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit';
import {thongKeDau_} from '../components/ThongKeDau';
import {thongKeDuoi_} from '../components/ThongKeDuoi';
import {thongKeTongHaiSoCuoi_} from '../components/ThongKeTong2SoCuoi';
import {thongKe_00_99} from '../components/ThongKe_00_99';
import {ThongKeLoKhan} from '../components/ThongKeLoKhan';
var dataResultLottery = {};

var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;
export default class StatisticalScreen extends Component {

    constructor(props){
        super(props);
        this.state= {
            selected: data[0],
            textSoLanQuay: '30'
        }
        item_ = data[0];
        dataResultLottery = this.props.navigation.state.params.data;
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
            <View style = {{flex: 1}}>
                <View style = {style.header_style}>
                    <Text style = {style.text_style}>Thống kê xổ số</Text>
                </View>
                <View style = {{padding: 10}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>Chọn tỉnh/thành phố:</Text>
                    <Picker 
                        selectedValue = {this.state.selected}
                        onValueChange={
                            (itemValue, itemIndex, item) => {
                                this.setState({
                                    selected: itemValue
                                })
                                item_ = data[itemIndex];
                                // console.log('CHECKCKCK: ' + JSON.stringify(item_))
                            }
                            }
                       mode={'dropdown'}
                    > 
                        {this.renderItem()}
                    </Picker>
                    <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>Chọn số lần quay:</Text>
                    <TextInput
                        placeholder={'Số lần quay'}
                        placeholderTextColor={'grey'}
                        keyboardType='numeric'
                        maxLength={2}
                        onChangeText={(text)=>this.setState({
                            textSoLanQuay: text
                        })}
                        value={this.state.textSoLanQuay}
                    />
                    
                    <TouchableOpacity style={style.style_button}
                                    onPress = {()=>this.thongKeDauDuoi(item_, this.state.textSoLanQuay)}
                    >
                         <Text style={{flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold'}}>THỐNG KÊ ĐẦU, ĐUÔI LÔ TÔ</Text>   
                         <Image
                           source={require('../images/right_arrow31.png')}
                         />
                    </TouchableOpacity>

                    <TouchableOpacity style={style.style_button}
                        onPress = {()=>this.thongKeHaiSoCuoi(item_, this.state.textSoLanQuay)}
                    >
                        <Text style={{flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold'}}>THỐNG KÊ TỔNG 2 SỐ CUỐI</Text>   
                        <Image
                        source={require('../images/right_arrow31.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={style.style_button}
                        onPress = {()=>this.thongKe0099(item_, this.state.textSoLanQuay)}
                    >
                        <Text style={{flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold'}}>THỐNG KÊ 00-99</Text>   
                        <Image
                        source={require('../images/right_arrow31.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={style.style_button}
                        onPress = {()=>this.thongKeCacSoVeNhieu(item_, this.state.textSoLanQuay)}
                    >
                        <Text style={{flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold'}}>THỐNG KÊ CÁC SỐ VỀ NHIỀU</Text>   
                        <Image
                        source={require('../images/right_arrow31.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={style.style_button}
                        onPress = {()=>this.thongKeCacSoLauRa(item_, this.state.textSoLanQuay)}
                    >
                        <Text style={{flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold'}}>THỐNG KÊ CÁC SỐ LÂU RA</Text>   
                        <Image
                        source={require('../images/right_arrow31.png')}
                        />
                    </TouchableOpacity>
                </View>

                <FloatButtonCompomentExit
                     onButtonFloatPress={this.clickExit.bind(this)}
                />

            </View>
        );
    }

    clickExit(){
        this.props.navigation.goBack();
    }

    thongKeDauDuoi(_item, soLanQuay){
        var arrLotteryOfProvinces = arrLotteryOfProvinces = dataResultLottery[_item.code];
        console.log('MANG TRUOC KHI GUIhhhhhh: ' + JSON.stringify(arrLotteryOfProvinces))
        var arrTKDau = thongKeDau_(arrLotteryOfProvinces,_item, soLanQuay);
        var arrTKDuoi = thongKeDuoi_(arrLotteryOfProvinces,_item, soLanQuay);
        this.props.navigation.navigate('ResultStatistic', {arrDau: arrTKDau, arrDuoi: arrTKDuoi, nameTinh:_item.name, soLanQuay:this.state.textSoLanQuay});
    }

    thongKeHaiSoCuoi(_item, soLanQuay){
        var arrLotteryOfProvinces = arrLotteryOfProvinces = dataResultLottery[_item.code];
        var arrTongHaiSoCuoi = thongKeTongHaiSoCuoi_(arrLotteryOfProvinces, soLanQuay);
        console.log('MANG TRUOC KHI GUI: ' + JSON.stringify(arrTongHaiSoCuoi))
        this.props.navigation.navigate('ResultStatistic1', {arr: arrTongHaiSoCuoi, type: '0', nameTinh:_item.name, soLanQuay:this.state.textSoLanQuay});
    }
    
    thongKe0099(_item, soLanQuay){
        var arrLotteryOfProvinces = arrLotteryOfProvinces = dataResultLottery[_item.code];
        var arr_00_99 = thongKe_00_99(arrLotteryOfProvinces, soLanQuay);
        console.log('DATA BAN DAU: ' + JSON.stringify(arrLotteryOfProvinces))
        console.log('MANG TRUOC KHI GUI: ' + JSON.stringify(arr_00_99))
        this.props.navigation.navigate('ResultStatistic1', {arr: arr_00_99, type: '1', nameTinh:_item.name, soLanQuay:this.state.textSoLanQuay});
    }

    thongKeCacSoVeNhieu(_item, soLanQuay){
        var arrLotteryOfProvinces = arrLotteryOfProvinces = dataResultLottery[_item.code];
        var arr_00_99 = thongKe_00_99(arrLotteryOfProvinces, soLanQuay);
        var _ = require('underscore');
        var arrVeNhieuTam = _.sortBy(arr_00_99, 'countLoTo');
        var arrVeNhieu_ = arrVeNhieuTam.reverse();
        var arrVeNhieu = arrVeNhieu_.slice(0, 20);    
        this.props.navigation.navigate('ResultStatistic2', {arr: arrVeNhieu, nameTinh:_item.name, soLanQuay:this.state.textSoLanQuay});
    }

    thongKeCacSoLauRa(_item, soLanQuay){
        var arrLotteryOfProvinces = arrLotteryOfProvinces = dataResultLottery[_item.code];
        var arr_lo_khan = ThongKeLoKhan(arrLotteryOfProvinces, soLanQuay);
        console.log('DS LÔT GAN: ' + JSON.stringify(arr_lo_khan))
        var _ = require('underscore');
        var arrLoKhan = _.sortBy(arr_lo_khan, 'soNgayLoKhan');
        var arrLoKhan_ = arrLoKhan.reverse(); 
        this.props.navigation.navigate('ResultStatistic3', {arr: arrLoKhan_, nameTinh:_item.name, soLanQuay:this.state.textSoLanQuay});
    }
}

var style = StyleSheet.create({
    container:{
        flex:1
    },
    header_style:{
        width: widthScreen,
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
    },
    style_button:{
        flexDirection: 'row', 
        alignItems: 'center',
        borderRadius: 2, 
        backgroundColor: '#CCCCCC', 
        height: 50,padding: 5,
        marginBottom: 10,
    }
})