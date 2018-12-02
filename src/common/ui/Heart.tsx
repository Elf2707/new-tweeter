import React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import colors from './colors'

interface Props {
  style?: StyleProp<ViewStyle>
  filledColor?: string
}

const Heart = ({ filledColor, style }: Props) => {
  const leftStyle = [
    styles.heartHalf,
    styles.leftFilled,
    { backgroundColor: filledColor }
  ]

  const rightStyle = [
    styles.heartHalf,
    styles.rightFilled,
    { backgroundColor: filledColor }
  ]

  return (
    <View style={[styles.container, style]}>
      <View style={leftStyle} />
      <View style={rightStyle} />
    </View>
  )
}

Heart.defaultProps = {
  filledColor: colors.$accentColor
}

export default Heart

const styles = EStyleSheet.create({
  $width: 40,
  $height: 30,
  container: {
    flexDirection: 'row',
    width: '$width',
    height: '$height'
  },
  heartHalf: {
    position: 'absolute',
    width: '$width / 2',
    height: '$height',
    borderTopLeftRadius: '$width / 2',
    borderTopRightRadius: '$width / 2',
    backgroundColor: '$white'
  },
  leftFilled: {
    left: 6,
    backgroundColor: '$accentColor',
    transform: [{ rotate: '-45deg' }]
  },
  rightFilled: {
    right: 6,
    backgroundColor: '$accentColor',
    transform: [{ rotate: '45deg' }]
  },
})
