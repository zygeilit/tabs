
import React, { Component } from 'react'

export default class extends Component {
  constructor(props) {
    super(props)
    this.tabRootRef = React.createRef()
    this.tabItemRef = React.createRef()
  }

  componentDidMount() {
    // const marginRight = `-${this.tabRootRef.current.offsetWidth - this.tabItemRef.current.offsetWidth}px`
    // this.tabRootRef.current.style['marginRight'] = marginRight
  }

  render() {
    const {
      prefixCls = 'phoenix-nav',
      text
    } = this.props

    return <span key={text} className={`${prefixCls}-tab-item`} ref={this.tabRootRef}>
      <span className={`${prefixCls}-tab-item-content`} ref={this.tabItemRef}>{text}</span>
    </span>
  }
}
