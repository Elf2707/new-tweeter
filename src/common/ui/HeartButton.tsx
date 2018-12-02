import React from 'react'
import { TouchableWithoutFeedbackProps, TouchableWithoutFeedback, View } from 'react-native'

import ToggleHeart from './ToggleHeart'

interface Props extends TouchableWithoutFeedbackProps {
  filled?: boolean
}

const HeartButton = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View>
        <ToggleHeart filled={props.filled} />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default HeartButton
