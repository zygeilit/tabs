
import React, { Component } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import debounce from 'lodash/debounce'
import classnames from 'classnames'
import Tab from './tab'
import './index.less'

const prefixCls = 'phoenix-nav'

export default class extends Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
    this.containerPlaceholderRef = React.createRef()
  }

  state = {
    activeKey: '1',
    tabs: [ '1', '22', '333333333333333', '444', '5555', '6', '77777777', '888', '999', '101010', '11111111111111', '12', '13', '14', '15', '16', '17', '19' ],
    hasMoreItem: false,
    lastItemIndex: 0,
    showMoreItem: false
  }

  componentDidMount() {
    this.debouncedResize = debounce(() => {
      this.refreshTabNav()
    }, 100)
    this.resizeObserver = new ResizeObserver(this.debouncedResize)
    this.resizeObserver.observe(this.containerRef.current)
  }

  refreshTabNav() {
    const containerWidth = this.containerRef.current.offsetWidth
    const items = this.containerPlaceholderRef.current.querySelectorAll(`.${prefixCls}-tab-item`)

    let hasMoreItem = false
    let lastItemIndex = 0

    for (let i=0; i<items.length; i++) {
      const restWidth = containerWidth - items[i].offsetLeft
      if (restWidth < 160) {
        hasMoreItem = true
        lastItemIndex = i-1
        break
      }
    }

    this.setState({ hasMoreItem, lastItemIndex })
  }

  onMoreBtnClickHandler() {
    this.setState({
      'showMoreItem': !this.state.showMoreItem
    })
  }

  onMoreTabItemClickHandler(text, index) {
    const { tabs, lastItemIndex } = this.state
    const selectedItem = tabs[index]
    tabs[index] = tabs[lastItemIndex]
    tabs[lastItemIndex] = selectedItem
    this.setState({ tabs })
  }

  render() {
    const {
      tabs,
      hasMoreItem,
      lastItemIndex,
      showMoreItem
    } = this.state
    const { } = this.props
    const showItemFn = (text) => <Tab key={text} prefixCls={prefixCls} text={text}></Tab>

    const dropdownTabItems = <span className={classnames({
      [`${prefixCls}-more-dropdown`]: true,
      [`${prefixCls}-more-dropdown-visiable`]: !showMoreItem,
    })}>
      {
        tabs.map((text, index) => {
          if (index < lastItemIndex+1) return null
          return <span key={text} onClick={() => this.onMoreTabItemClickHandler(text, index)}>{text}</span>
        }).filter(i => !!i)
      }
    </span>

    return <div className={`${prefixCls}-tabs-container`} ref={this.containerRef}>
      <div className={`${prefixCls}-tabs`}>
        { tabs.slice(0, lastItemIndex+1).map(showItemFn) }
        <span className={classnames({
            [`${prefixCls}-more`]: true,
            [`${prefixCls}-more-visiable`]: hasMoreItem,
          })}>
          <span className={`${prefixCls}-more-btn`} onClick={this.onMoreBtnClickHandler.bind(this)}>...</span>
          {dropdownTabItems}
        </span>
      </div>
      <div className={`${prefixCls}-tabs-placeholder`} ref={this.containerPlaceholderRef}>{tabs.map(showItemFn)}</div>
    </div>
  }
}
