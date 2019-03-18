import { Dimensions, Platform } from 'react-native';
import moment from 'moment';

function isIphoneXorAbove() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
  )
}

const dayOfTheWeek = moment().day();

const hour = moment().hours();

const minutes = moment().minutes();

const urlServer = 'http://165.227.124.82';

export { isIphoneXorAbove, urlServer, dayOfTheWeek, hour, minutes };