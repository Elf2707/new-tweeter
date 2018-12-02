import React from 'react'
import { StyleProp, ViewStyle, Animated, StyleSheet } from 'react-native'

import Heart from './Heart'
import colors from './colors'

const NEGATIVE_END_Y = -30
const ANIMATION_END_Y = 30

interface Props {
  style?: StyleProp<ViewStyle>
  onComplete?: () => void
  delay?: number
  forwardPhase?: boolean
  filledColor?: string
  posX: number
  posY: number
}

interface State {
  position: Animated.Value
}

export default class FloatedHeart extends React.Component<Props, State> {
  static defaultPros = {
    onComplete: () => ({}),
    delay: 0,
    forwardPhase: true,
    filledColor: colors.$accentColor
  }

  yAnim: any
  xAnim: any
  opacityAnim: any
  scaleAnim: any
  rotateAnim: any

  constructor(props: Props) {
    super(props)

    const position = new Animated.Value(0)
    this.yAnim = position.interpolate({
      inputRange: [NEGATIVE_END_Y, 0],
      outputRange: [ANIMATION_END_Y, 0]
    })

    this.opacityAnim = this.yAnim.interpolate({
      inputRange: [0, ANIMATION_END_Y / 8, ANIMATION_END_Y],
      outputRange: [0, 1, 0]
    })

    this.scaleAnim = this.yAnim.interpolate({
      inputRange: [0, ANIMATION_END_Y / 2, ANIMATION_END_Y],
      outputRange: [0, 1.1, 1],
      extrapolate: 'clamp'
    })

    this.xAnim = this.yAnim.interpolate({
      inputRange: [0, ANIMATION_END_Y / 2, ANIMATION_END_Y],
      outputRange: [0, props.forwardPhase ? 15 : -15, 0]
    })

    this.rotateAnim = this.yAnim.interpolate({
      inputRange: [
        0,
        ANIMATION_END_Y / 4,
        ANIMATION_END_Y / 3,
        ANIMATION_END_Y / 2,
        ANIMATION_END_Y
      ],
      outputRange: ['0deg', '-2deg', '0deg', '2deg', '0deg']
    })

    this.state = { position }
  }

  componentDidMount() {
    const { onComplete, delay } = this.props
    Animated.timing(this.state.position, {
      delay,
      duration: 1500,
      toValue: NEGATIVE_END_Y,
      useNativeDriver: true
    }).start(onComplete)
  }

  getHeartAnimationStyle(): Partial<ViewStyle> | any {
    return {
      transform: [
        { translateY: this.state.position },
        { translateX: this.xAnim },
        { scale: this.scaleAnim },
        { rotate: this.rotateAnim }
      ],
      opacity: this.opacityAnim
    }
  }

  render() {
    const posStyle = { top: this.props.posY - 100, left: this.props.posX - 16 }

    return (
      <Animated.View
        style={[styles.container, posStyle, this.getHeartAnimationStyle(), this.props.style]}
      >
        <Heart filledColor={this.props.filledColor} />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 30,
    position: 'absolute'
  }
})
