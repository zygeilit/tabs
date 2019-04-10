/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import InkTabBarNode from './InkTabBarNode';
import MoreableTabBarTabsNode from './MoreableTabBarTabsNode';
import TabBarRootNode from './TabBarRootNode';
import SaveRef from './SaveRef';

export default class ScrollableInkTabBar extends React.Component {
  render() {
    const { children: renderTabBarNode, ...restProps } = this.props;
    return (
      <SaveRef>
        {(saveRef, getRef) => (
          <TabBarRootNode saveRef={saveRef} {...restProps}>
            <MoreableTabBarTabsNode saveRef={saveRef} getRef={getRef} renderTabBarNode={renderTabBarNode} {...restProps} />
            <InkTabBarNode saveRef={saveRef} getRef={getRef} {...restProps} />
          </TabBarRootNode>
        )}
      </SaveRef>
    );
  }
}

ScrollableInkTabBar.propTypes = {
  children: PropTypes.func,
};
