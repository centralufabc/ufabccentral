import React from 'react';
import { Image, View, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { openUrl } from '../../utils/functions';

const banners = [
  {
    id: '1',
    imgUrl:
      'https://i.imgur.com/Ipph8eP.png',
    link: 'https://www.google.com',
  },
  {
    id: '2',
    imgUrl:
      'https://i.imgur.com/Zc2XFf6.png',
    link: 'https://www.google.com',
  },
];

export default class Banner extends React.Component {

  constructor() {
    super();
    // TODO: Get banners from API
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref={(ref) => {
            this.highlightsListRef = ref;
          }}
          keyExtractor={(item) => item.id}
          snapToInterval={Dimensions.get('window').width - 16}
          decelerationRate={0.88}
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          horizontal
          data={banners}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                {
                  marginLeft: banners.indexOf(item) === 0 ? 8 : 4,
                  marginRight: banners.indexOf(item) === banners.length - 1 ? 8 : 4,
                },
                styles.card,
              ]}
              activeOpacity={0.7}
              onPress={() => {
                // TODO: Contabilizar click
                // Abrir o link
                openUrl(item.link);
              }}
            >
              <Image
                style={styles.image}
                source={{ uri: item.imgUrl }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: 180,
  },
  card: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 24,
    height: 160,
    backgroundColor: '#fff',
    elevation: 4,
    marginHorizontal: 4,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
