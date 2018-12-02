import React from 'react'
import { FlatList, GestureResponderEvent } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import uuid from 'uuid'

import tweetsData from './data/tweetList.json'
import { FloatedHeartsEffect, colors } from '../../common/ui'
import { TweetData } from './model'
import { datesDesc } from '../../common/utils/sortPredicates'
import Tweet from './components/Tweet'

interface State {
  tweets: TweetData[]
  showHeartsEffect: boolean
  likedTweet: TweetData | null
  touchX: number
  touchY: number
}

export default class TweetsList extends React.Component<any, State> {
  static navigationOptions = {
    title: 'Tweets'
  }

  state: Readonly<State> = {
    tweets: [],
    showHeartsEffect: false,
    likedTweet: null,
    touchX: 0,
    touchY: 0
  }

  componentDidMount() {
    this.setState({
      tweets: tweetsData
        .map(t => ({
          ...t,
          id: uuid.v4(),
          liked: false,
          createdDate: t.createdDate.split(' ').join('')
        }))
        .sort((a, b) => datesDesc(a.createdDate, b.createdDate))
    })
  }

  onTweetLikedPress = ({ nativeEvent }: GestureResponderEvent, tweetId: string) => {
    const likedTweet = this.state.tweets.find(t => t.id === tweetId)
    if (likedTweet) {
      const updatedTweet = { ...likedTweet, liked: !likedTweet.liked }
      this.setState(state => ({
        likedTweet: updatedTweet,
        tweets: state.tweets.map(t => (t !== likedTweet ? t : updatedTweet)),
        showHeartsEffect: true,
        touchX: nativeEvent.pageX,
        touchY: nativeEvent.pageY
      }))
    }
  }

  onHeartsEffectEnd = () => this.setState({ showHeartsEffect: false })

  renderItem = ({ item }: { item: TweetData }) => (
    <Tweet tweet={item} onLikedPress={this.onTweetLikedPress} />
  )

  render() {
    const { likedTweet, touchX, touchY } = this.state

    return (
      <>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.tweets}
          renderItem={this.renderItem}
          keyExtractor={t => t.id}
          showsVerticalScrollIndicator={false}
        />

        {this.state.showHeartsEffect && (
          <FloatedHeartsEffect
            onComplete={this.onHeartsEffectEnd}
            filledColor={
              likedTweet && likedTweet.liked ? colors.$accentColor : colors.$subTextColor
            }
            posX={touchX}
            posY={touchY}
          />
        )}
      </>
    )
  }
}

const styles = EStyleSheet.create({
  listContent: {
    paddingTop: 8,
    paddingBottom: 32
  }
})
