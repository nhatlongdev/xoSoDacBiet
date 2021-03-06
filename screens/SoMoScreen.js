import React, { Component } from 'react';
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
var data = require('../assets/somo.json');
import FloatButtonCompomentExit from '../components/FloatButtonCompomentExit';
import ItemSoMo from '../components/ItemSoMo';
import FlatListSoMoComponent from './FlatListSoMoComponent';
var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;
var dataSearch;

 export default class SoMoScreen extends Component {

    constructor(props){
        super(props);
        dataSearch = JSON.parse(JSON.stringify(data));
        this.state={
            content_search:'',
            dataSearch: dataSearch,
        }
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

     render() {
         return (
            <View style = {{flex: 1, marginTop: Platform.OS==='ios'?30:0}}>
            <View style = {style.header_style}>
                <Text style = {style.text_style}>Xổ số đặc biệt - Sổ mơ</Text>
            </View>
            
                <View style = {{padding: 10, marginBottom: 5}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>Nhập gợi ý tìm kiếm:</Text>
                <TextInput
                    maxLength = {50}   
                    placeholder={'Ví dụ: Rắn hai đầu'}
                    placeholderTextColor = {'grey'}
                    onChangeText = {(text)=>this.setState({content_search: text})}
                    value={this.state.content_search}    
                />
        
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',borderRadius: 2, backgroundColor: '#CCCCCC', height: 50,padding: 5}}
                                onPress = {()=>this.state.content_search.length !== 0? 
                                this.searchData(this.state.content_search):
                                this.refreshAllData()}
                >
                    <Text style={{flex: 1, textAlign: 'center', color: 'black', fontWeight: 'bold'}}>TÌM KIẾM</Text>   
                    <Image
                        source={require('../images/right_arrow31.png')}
                    />
                </TouchableOpacity>
                </View>
                {
                    this.state.dataSearch.length >0?
                    <View style={{flexDirection:'row',marginHorizontal: 5,
                         borderBottomWidth: 1, borderBottomColor: 'grey',
                    }}> 
                        <Text style={{flex:2, fontWeight:'bold', textAlign:'center'}}>Giấc mơ</Text>
                        <Text style={{flex:1,  textAlign:'center', fontWeight:'bold'}}>Số đề</Text>
                    </View>:null
                }
                
                <ScrollView style={{flex:1}}> 
                <FlatListSoMoComponent data={this.state.dataSearch}/>
                  
            </ScrollView>
            <FloatButtonCompomentExit
                 onButtonFloatPress={this.clickExit.bind(this)}
            />

        </View>
         );
     }

      //Sử dụng reg để kiểm tra chuỗi ký tự nhập vào có hợp lệ ko
    checkStringInputLegal(chuoi){
        var str ='ok';
        if(chuoi.length === 0){
            str = 'Bạn chưa nhập nội dung giấc mơ';
        }
        return str;
    }

    //set data full khi nguoi dung ko nhap gi ma nhan tim kiem
    refreshAllData(){
        this.setState({
            dataSearch:JSON.parse(JSON.stringify(data)),
        })
    }
   
    //Hàm tìm kiếm dữ liệu
    searchData(str){
        let dataSoMoTam = JSON.parse(JSON.stringify(data));
        var arr_str = str.split(' ');
        var arr_str_new = arr_str.filter((e) => {
            return e !== '';
        })
        dataSearch = [];
        var dataTam = [];
        if(arr_str_new.length >0){
            for(let i = 0; i< dataSoMoTam.length; i++){
                var sum = 0;
                var arr_title = dataSoMoTam[i].title.split(' ');
                var arr_khong_dau = dataSoMoTam[i].khongDau.split(' ');
                for(let j=0; j<arr_title.length; j++){
                    for(let a =0; a<arr_str_new.length; a++){
                        if(arr_title[j].toLowerCase()=== arr_str_new[a].toLowerCase()){
                            console.log('VAO DK TITLE 1: ')
                            sum = sum + 1;
                        }else if(arr_title[j].toLowerCase().indexOf(arr_str_new[a].toLowerCase()) !== -1){
                            console.log('VAO DK TITLE 2: ')
                            sum = sum + 0.1;
                        }
                    }    
                }

                for(let j=0; j<arr_khong_dau.length; j++){
                    for(let a =0; a<arr_str_new.length; a++){
                        if(arr_khong_dau[j].toLowerCase()=== arr_str_new[a].toLowerCase()){
                            console.log('VAO DK TITLE 1: ')
                            sum = sum + 1;
                        }else if(arr_khong_dau[j].toLowerCase().indexOf(arr_str_new[a].toLowerCase()) !== -1){
                            console.log('VAO DK TITLE 2: ')
                            sum = sum + 0.1;
                        }
                    }    
                }
                if(sum >0){
                    dataSoMoTam[i].priority = sum;
                    dataTam.push(dataSoMoTam[i]);
                }  
            }    
        }

        //Loại bỏ các phần tử trùng nhau
        if(dataTam.length>0){
            //sắp xếp theo thư tự sum giảm dần
            var s = require('underscore');
            var dataTam_ = s.sortBy(dataTam,'priority');
            var dataTam__ = dataTam_.reverse();

            var _ = require('underscore');	
            dataSearch = _.uniq(dataTam__);
        }
        this.setState({
            dataSearch: dataSearch,
        })
        console.log('SEARCH: ' + JSON.stringify(dataSearch))
        if(dataSearch.length === 0){
            alert('Không tìm thấy dữ liệu trùng với giấc mơ của bạn, vui lòng nhập nội dung khác')
        }
    }

    clickExit(){
        this.props.navigation.goBack();
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