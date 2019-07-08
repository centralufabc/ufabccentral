import React from 'react';
import { View, Text } from 'react-native'

import {
    WIFI_SA,
    WIFI_SBC,
    ACESSO_EDORUAM,
    ATENDIMENTO_CAE,
    HORARIO_ACHADOS_E_PERDIDOS,
    HORARIO_BIBLIOTECA,
    HORARIO_RU
} from '../../utils/strings'

import { Divider } from '@shoutem/ui/'

const OutrasInformacoes = () => {
    const { viewStyle, textStyle, dividerStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{WIFI_SA}</Text>
            <Divider style={dividerStyle} styleName="line" />
            <Text style={textStyle}>{WIFI_SBC}</Text>
            <Divider style={dividerStyle} styleName="line" />
            <Text style={textStyle}>{ACESSO_EDORUAM}</Text>
            <Divider style={dividerStyle} styleName="line" />
            <Text style={textStyle}>{ATENDIMENTO_CAE}</Text>
            <Divider style={dividerStyle} styleName="line" />
            <Text style={textStyle}>{HORARIO_ACHADOS_E_PERDIDOS}</Text>
            <Divider style={dividerStyle} styleName="line" />
            <Text style={textStyle}>{HORARIO_BIBLIOTECA}</Text>
            <Divider style={dividerStyle} styleName="line" />
            <Text style={textStyle}>{HORARIO_RU}</Text>
        </View>
    )
}

const styles = {
    viewStyle: {
        padding: 10
    },
    textStyle: {
        fontSize: 16,
        lineHeight: 25,
    },
    dividerStyle: {
        marginTop: 10,
        marginBottom: 10,
    }
}

export default OutrasInformacoes;