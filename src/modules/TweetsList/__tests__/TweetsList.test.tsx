import React from 'react'
import { FlatList } from 'react-native'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import TweetsList from '../index'

describe('TweetsList Tests Suit', () => {
  it('TweetsList renders well', () => {
    const tree = renderer.create(<TweetsList />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('TweetsList componentDidMount calls ones', () => {
    TweetsList.prototype.componentDidMount = jest.fn()
    shallow(<TweetsList />)
    expect(TweetsList.prototype.componentDidMount).toHaveBeenCalledTimes(1)
  })

  it('TweetsList render FlatList component', () => {
    const wrapper = shallow(<TweetsList />)
    const list = wrapper.find(FlatList)
    expect(list).toHaveLength(1)
  })
})
