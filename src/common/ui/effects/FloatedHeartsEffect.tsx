import React from 'react'

import { getRandomNumber } from '../../utils/mathUtils'
import FloatedHeart from '../FloatedHeart'

interface HeartData {
  id: number
  right: number
  delay: number
  forwardPhase: boolean
}

const HEARTS_COUNT = 4

function getInitHearts(): HeartData[] {
  return Array(HEARTS_COUNT)
    .fill(0)
    .map((_, idx) => ({
      id: idx,
      right: getRandomNumber(50, 60),
      delay: idx * 200,
      forwardPhase: getRandomNumber(0, 100) > 50
    }))
}

interface Props {
  onComplete: () => void
  filledColor: string
  posX: number
  posY: number
}

interface State {
  hearts: HeartData[]
}

export default class FloatedHeartsEffect extends React.Component<Props, State> {
  state: Readonly<State> = {
    hearts: getInitHearts()
  }

  removeHeart(id: number) {
    this.setState(
      state => ({
        hearts: state.hearts.filter(h => h.id !== id)
      }),
      () => {
        if (this.state.hearts.length === 0) {
          this.props.onComplete()
        }
      }
    )
  }

  render() {
    return this.state.hearts.map((h, idx) => (
      <FloatedHeart
        style={{ right: this.state.hearts[idx].right }}
        key={h.id}
        delay={h.delay}
        forwardPhase={h.forwardPhase}
        filledColor={this.props.filledColor}
        onComplete={() => this.removeHeart(h.id)}
        posX={this.props.posX}
        posY={this.props.posY}
      />
    ))
  }
}
