import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Tweet from '../components/Tweet'
import { HeartButton } from '../../../common/ui'

describe('Tweet Tests Suit', () => {
  it('Tweet renders well', () => {
    const testTweet = {
      id: 'id',
      imageUrl: 'image',
      author: 'Author Name',
      about: 'Some tweet about something',
      createdDate: '2018-04-13T05:39:06-02:00',
      liked: false
    }

    const tree = renderer.create(<Tweet tweet={testTweet} onLikedPress={jest.fn()} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Tweet simulate press on liked call onLikedPress with id', () => {
    const testTweet = {
      id: 'id',
      imageUrl: 'image',
      author: 'Author Name',
      about: 'Some tweet about something',
      createdDate: '2018-04-13T05:39:06-02:00',
      liked: false
    }

    const mockFn = jest.fn()
    const wrapper = shallow(<Tweet tweet={testTweet} onLikedPress={mockFn} />)
    const likedBtn = wrapper.find(HeartButton)

    expect(likedBtn).toHaveLength(1)
    likedBtn.simulate('press')

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith(undefined, testTweet.id)
  })
})
