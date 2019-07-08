import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    )
}

const styles = {
    containerStyle : {
        borderBottomWidth: 1,
        padding: 8,
        backgroudColor: "#FFF",
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#DDD',
        position: 'relative'
    }
}

export default CardSection;