import React from 'react'
import { View, Text, Image, GestureResponderEvent } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import moment from 'moment'

import { HeartButton } from '../../../common/ui'
import { TweetData } from '../model'

interface Props {
  tweet: TweetData
  onLikedPress: (e: GestureResponderEvent, id: string) => void
}

export default function Tweet({ tweet, onLikedPress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.infoCont}>
        <Text style={styles.authorText}>{tweet.author}</Text>
        <Text style={styles.dateText}>
          {moment(tweet.createdDate).format('YYYY MMMM DD HH:mm')}
        </Text>

        <Text style={styles.tweetText}>{tweet.about}</Text>

        <HeartButton filled={tweet.liked} onPress={e => onLikedPress(e, tweet.id)} />
      </View>
      <Image style={styles.image} source={{ uri: tweet.imageUrl }} resizeMode="cover" />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16
  },
  infoCont: {
    flex: 1,
    paddingRight: 8
  },
  image: {
    width: 100,
    height: 100
  },
  authorText: {
    color: '$textColor',
    fontSize: 20
  },
  tweetText: {
    marginTop: 8,
    marginBottom: 12,
    color: '$subTextColor',
    fontSize: 18
  },
  dateText: {
    color: '$subTextColor',
    fontSize: 12
  }
})
