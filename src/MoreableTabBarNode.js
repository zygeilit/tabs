import React from 'react';

export default class SwipeableTabBarNode extends React.Component {
  render() {
    let { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-moreable-nav`}>
        {this.props.children}
      </div>
    );
  }
}
