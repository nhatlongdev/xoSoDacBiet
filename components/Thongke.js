import React, { PureComponent } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'native-base';

class Thongke extends PureComponent {
    state = {  }
    render() {
        return (
            <TouchableOpacity 
            style={this.props.style} 
            onPress={this.props.onPress}>
                <View style={{width: 50, height: 50, borderRadius:  50/2, backgroundColor: 'green',justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name={this.props.nameIcon} style={{fontSize: 40, color: 'white'}}/>
                </View>
                <Text style={{color: 'black'}}>{this.props.title}</Text>
            </TouchableOpacity>

        );
    }
}

export default Thongke;

//imrpc, imrn, pcs