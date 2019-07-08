import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    )
}

const styles = {
    containerStyle: {
        borderWidth: 0,
        borderRadius: 1,
        borderColor: "#DDD",
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        backgroundColor: "#F8F8F8",
        elevation: 3,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 15,
    }
}

export default Card;