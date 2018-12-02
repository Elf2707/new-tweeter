import React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import colors from './colors'
import Heart from './Heart'

interface Props {
  style?: StyleProp<ViewStyle>
  filled?: boolean
  filledColor?: string
}

export default function ToggleHeart({ filled = true, filledColor = colors.$accentColor }: Props) {
  return (
    <View>
      <Heart filledColor={filledColor} />
      {!filled && <Heart style={styles.topHeart} filledColor={colors.$white} />}
    </View>
  )
}

const styles = EStyleSheet.create({
  topHeart: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{ scale: 0.9 }]
  }
})