import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    AsyncStorage
 } from 'react-native';
 import {updatePurcharse} from '../networking/Server';
 import InAppBilling from "react-native-billing";
 const defaultState = {
     productDetails: null,
     transactionDetails: null,
     consumed: false,
     error: null
   };
  var jsonListProducts;  

 export default class ItemProduct extends Component {

    constructor(props){
        super(props);
        jsonListProducts = {};
        this.state = {
            productId: "",
            ...defaultState
        };
    }

    resetState = () => {
        this.setState(defaultState);
    };

     render() {
         return (
             <View style={{backgroundColor:'grey', marginVertical: 5, marginHorizontal:5}}>
                <View>
                    <Text style={{textAlign:'center', color:'white', paddingVertical: 5, fontWeight:'bold'}}>{this.props.item.name}</Text>
                </View>
                <Text style={{textAlign:'right', color:'red', paddingVertical:5, paddingHorizontal:5}}>{this.props.item.price}</Text>
                <TouchableOpacity onPress={()=>
                    this.pushIdProductToInAppPursCharge(this.props.item)
                }>
                   <Text style={{textAlign:'right', color:'blue', fontSize:18, paddingVertical: 5, paddingHorizontal:5}}>Mua</Text>
                </TouchableOpacity>
             </View>
         );
     }

      //save and get list product in app purscharse
    async saveListProduct(value) {
        try {
          await AsyncStorage.setItem('key_list_product',value);
        } catch (error) {
          console.log("Error saving data" + error);
        }
      }

    async getListProduct() {
        try {
          const value = await AsyncStorage.getItem('key_list_product');
          console.log('chay den day');
          if(value != null){
            console.log('chay den day 1');
            jsonListProducts = JSON.parse(value);
            if(jsonListProducts !== null && jsonListProducts[this.state.productId] != null ){
              if(jsonListProducts[this.state.productId].consumed === false){
                  this.purchaseProduct();
              }else{
                 //da mua xong nhung chua consumed
                 this.consumePurchase();
              }
            }
          }
          return value;
        } catch (error) {
          console.log("Error retrieving data" + error);
        }
    }


      //get item
      getProductDetails = async () => {
        try {
          this.resetState();
          await InAppBilling.open();
          const details = await InAppBilling.getProductDetails(this.state.productId);
          await InAppBilling.close();
          if(details !== null && details.productId !== null && details.productId !== ''){
            //lay ds sp dang luu trong cake kiem tra xem san pham do nguoi dung da mua chua, neu da mua thi da consume chua
            this.setState({ 
              productDetails: JSON.stringify(details) 
            });
            this.getListProduct();
          }
        } catch (err) {
          this.setState({ error: JSON.stringify(err) });
          await InAppBilling.close();
        }
      };
    
      purchaseProduct = async () => {
        try {
          this.resetState();
          await InAppBilling.open();
          const details = await InAppBilling.purchase(this.state.productId);
          await InAppBilling.close();
          console.log('DU LIEU TRA VE KHI PURCHASE: ' + JSON.stringify(details));
          this.setState({ transactionDetails: JSON.stringify(details) });
          if(details !== null && details.purchaseState === 'PurchasedSuccessfully'){
            console.log('DU LIEU TRA VE KHI PURCHASE TMDK GOI CONSUME');
            jsonListProducts[this.state.productId].consumed = true;
            this.saveListProduct(JSON.stringify(jsonListProducts));
            //thong bao toi server mua thanh cong sp
            console.log('CO CHAY TOI UPDATE')
            this.updatePurcharse(this.state.productId);
          }
          console.log('transactionDetails: ' + JSON.stringify(details));
        } catch (err) {
          this.setState({ error: JSON.stringify(err) });
          await InAppBilling.close();
        }
      };

      consumePurchase = async () => {
        try {
          this.resetState();
          await InAppBilling.open();
          const details = await InAppBilling.consumePurchase(this.state.productId);
          await InAppBilling.close();
          console.log('DU LIEU TRA VE KHI CONSUME: ' + JSON.stringify(details));
          if(details === true){
            jsonListProducts[this.state.productId].consumed = false;
            this.saveListProduct(JSON.stringify(jsonListProducts));
            // alert('CONSUME THANH CONG LUU LAI VAO CAKE');
          }
          this.setState({ consumed: true });
        } catch (err) {
          this.setState({ error: JSON.stringify(err) });
          await InAppBilling.close();
        }
      };
    
      updateProductId = productId => {
        this.setState({ productId });
      };


     //Hàm truyền id product to in app purscharge
     pushIdProductToInAppPursCharge(item){
        this.setState({
            productId: item.id,
        });
        this.getListProduct();
     }

     //ham cap nhat toi server khi mua thanh cong sp
     updatePurcharse(package_id){
      console.log('CHAY HAM UPDATE: ')
      updatePurcharse(package_id).then((data_)=>{
        console.log('UPDATE THAH CONG: ' + JSON.stringify(data_))
          //thuc hien consume
          this.consumePurchase();
      }).catch((error) =>{
          console.log("ERROR KET QUA PUSH TOKEN" + JSON.stringify(error));
      });
  }

 }