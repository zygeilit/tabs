/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import MoreableTabBarNode from './MoreableTabBarNode';
import MoreableTabBarTabsNode from './MoreableTabBarTabsNode';
import MoreableTabBarRootNode from './MoreableTabBarRootNode';
import SaveRef from './SaveRef';

export default class ScrollableInkTabBar extends React.Component {
  render() {
    const { children: renderTabBarNode, ...restProps } = this.props;
    return (
      <SaveRef>
        {(saveRef, getRef) => (
          <MoreableTabBarRootNode saveRef={saveRef} {...restProps}>
            <MoreableTabBarTabsNode saveRef={saveRef} getRef={getRef} renderTabBarNode={renderTabBarNode} {...restProps} />
            <MoreableTabBarNode saveRef={saveRef} getRef={getRef} {...restProps} />
          </MoreableTabBarRootNode>
        )}
      </SaveRef>
    );
  }
}

ScrollableInkTabBar.propTypes = {
  children: PropTypes.func,
};
