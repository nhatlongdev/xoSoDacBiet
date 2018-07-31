// packages
// packages
import {BackHandler} from 'react-native';
import {Alert} from 'react-native';
import RNExitApp from 'react-native-exit-app';
const exitAlert = () => {
  Alert.alert(
    'Thoát Khỏi Ứng Dụng',
    'Bạn có muốn thoát không?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
    }, {
        text: 'OK',
        onPress: () => RNExitApp.exitApp()
    }, ], {
        cancelable: false
    }
 )
 return true;
};
export {exitAlert};