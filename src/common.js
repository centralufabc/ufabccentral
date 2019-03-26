import { Dimensions, Platform } from 'react-native';
import moment from 'moment';

function isIphoneXorAbove() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
  );
}

const dayOfTheWeek = moment().day();

const hour = () => moment().hours();

const minutes = () => moment().minutes();

export const pdfFilesLink = 'https://drive.google.com/drive/folders/1A2sBcwvxql6YPFPG_CoMnVxBVjgOYlHx?usp=sharing';

const urlServer = 'http://165.227.124.82';

export const formatHour = (value) => {
  if (value) {
    const text = value.toString();
    let textHour;
    let textMin;
    if (text.length > 3) {
      textHour = text.substring(0, 2);
      textMin = text.substring(2, 4);
    } else {
      textHour = text.substring(0, 1);
      textMin = text.substring(1, 3);
    }
    return (parseInt(textHour) * 60) + parseInt(textMin);
  }
  return 0;
};

export const linesAvaliable = () => {
  if (dayOfTheWeek === 7) {
    return [];
  }
  if (dayOfTheWeek === 6) {
    return [7];
  }
  return [1, 2, 3, 4, 5, 6];
};

export { isIphoneXorAbove, urlServer, dayOfTheWeek, hour, minutes };
