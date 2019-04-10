
import React, { Component } from 'react'
import classnames from 'classnames'
import ResizeObserver from 'resize-observer-polyfill'
import debounce from 'lodash/debounce'
import NavTabs from './nav-tabs'
import './index.less'

export default class extends Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
  }

  state = {
    activeKey: '1',
    tabs: [ '1', '22', '333333333333333', '444', '5555', '6','77777777', '888', '999', '101010', '11111111111111', '12','13', '14', '15', '16', '17', '19' ],
    showMoreBtn: false,
    tabLastShowIndex: 0
  }

  componentDidMount() {
    // this.debouncedResize = debounce(() => {
    //   console.log('this.debouncedResize() trigger')
    //   this.refreshTabNav()
    // }, 200)
    // this.resizeObserver = new ResizeObserver(this.debouncedResize)
    // this.resizeObserver.observe(this.containerRef.current)
  }

  onMoreBtnClickHandler(e) {
    // alert(1)
  }

  refreshTabNav() {
    // const containerHeight = this.containerRef.current.offsetHeight
    // const tabItemsIsBeyondContainerWith = containerHeight > 30
    // const tabItems = this.containerRef.current.querySelectorAll(`.phoenix-nav-tab-item`)
    // const firstLineLastItemIndex = tabItems.length-1
    // if (tabItemsIsBeyondContainerWith) {
    //   for(let i=tabItems.length-1; i>=0; i--) {
    //     if (tabItems[i].offsetTop < 30) {
    //       firstLineLastItemIndex = i
    //       break
    //     }
    //   }
    // }
    // tabItems[firstLineLastItemIndex].offsetRight
  }

  render() {
    const { showMoreBtn } = this.state
    const { prefixCls = 'phoenix-nav' } = this.props

    return <div className={prefixCls}>
      <NavTabs />
      {/* <div className={`${prefixCls}-tabs`} ref={ this.containerRef }>
        <span
          className={classnames({
            [`${prefixCls}-more`]: true,
            [`${prefixCls}-more-visiable`]: showMoreBtn,
          })}>
          <span className={`${prefixCls}-more-btn`} onClick={ this.onMoreBtnClickHandler.bind(this) }>...</span>
        </span>
        
      </div> */}
    </div>
  }
}
