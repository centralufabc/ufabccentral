import { Alert, Linking } from 'react-native';

export function infoAlert(title, message) {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: () => {},
      },
    ],
    { cancelable: false }
  );
}

export function openUrl(url) {
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        infoAlert('Oops', 'Não foi possível abrir o evento no Facebook');
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => {
      infoAlert('Oops', 'Não foi possível abrir o evento no Facebook');
      console.error('An error occurred', err);
    });
}
