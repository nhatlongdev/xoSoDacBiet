import React, { PureComponent } from 'react';
import { 
    View,
    Text,
    StyleSheet
 } from 'react-native';

 // import propgress
import * as Progress from 'react-native-progress';

 class ProgressReact extends PureComponent {
     state = {  }
     render() {
         return (
            this.props.show? 
            <View style = {styles.container}>
                <Progress.CircleSnail style={{margin: 10,}} />
            </View>
            : null
         );
     }
 }

 const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom : 200,
        right: 150,
        borderRadius: 50,
        width: 50,
        height: 50
    },
})
 
 export default ProgressReact;