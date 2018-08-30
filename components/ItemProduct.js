import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity
 } from 'react-native';

 import InAppBilling from "react-native-billing";
 const defaultState = {
     productDetails: null,
     transactionDetails: null,
     consumed: false,
     error: null
   };

 export default class ItemProduct extends Component {

    constructor(props){
        super(props);
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

      //get item
      getProductDetails = async () => {
        try {
          this.resetState();
          await InAppBilling.open();
          const details = await InAppBilling.getProductDetails(this.state.productId);
          alert(JSON.stringify(details))
          await InAppBilling.close();
          this.setState({ productDetails: JSON.stringify(details) });
        } catch (err) {
            alert(err)
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
          this.setState({ transactionDetails: JSON.stringify(details) });
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
        this.purchaseProduct();
     }
 }