/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import InkTabBarNode from './InkTabBarNode';
import MoreableTabBarTabsNode from './MoreableTabBarTabsNode';
import MoreableTabBarNode from './MoreableTabBarNode'
import TabBarRootNode from './TabBarRootNode';
import SaveRef from './SaveRef';

export default class ScrollableInkTabBar extends React.Component {
  render() {
    const { children: renderTabBarNode, ...restProps } = this.props;

    return (
      <SaveRef>
        {(saveRef, getRef) => (
          <TabBarRootNode saveRef={saveRef} {...restProps}>
            <MoreableTabBarNode saveRef={saveRef} getRef={getRef} {...restProps}>
              <MoreableTabBarTabsNode saveRef={saveRef} renderTabBarNode={renderTabBarNode} {...restProps} />
              <InkTabBarNode saveRef={saveRef} getRef={getRef} {...restProps} />
            </MoreableTabBarNode>
          </TabBarRootNode>
        )}
      </SaveRef>
    );
  }
}

ScrollableInkTabBar.propTypes = {
  children: PropTypes.func,
};
