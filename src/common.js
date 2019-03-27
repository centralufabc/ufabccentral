import { Dimensions, Platform } from 'react-native';
import moment from 'moment';

export function isIphoneXorAbove() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
  );
}

export const dayOfTheWeek = () => moment().day();

export const nameOfDayOfTheWeek = (day) => {
  switch (day) {
    case 1:
      return 'Segunda';
    case 2:
      return 'Terça';
    case 3:
      return 'Quarta';
    case 4:
      return 'Quinta';
    case 5:
      return 'Sexta';
    case 6:
      return 'Sabado';
    case 7:
      return 'Domingo';
    default:
      return '';
  }
};

const year = () => moment().year();

const day = () => moment().date();

const month = () => moment().month() + 1;

export const dateFormated = () => year().toString() + (month() >= 10 ? month() : '0' + month()) + (day() >= 10 ? day() : '0' + day());

export const hour = () => moment().hours();

export const minutes = () => moment().minutes();

export const pdfFilesLink = 'https://drive.google.com/drive/folders/1A2sBcwvxql6YPFPG_CoMnVxBVjgOYlHx?usp=sharing';

export const urlServer = 'http://165.227.124.82';

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
  if (dayOfTheWeek() === 7) {
    return [];
  }
  if (dayOfTheWeek() === 6) {
    return [7];
  }
  return [1, 2, 3, 4, 5, 6];
};

export const dynamicSort = (property) => {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
};

