import React from 'react';
import warning from 'warning';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import debounce from 'lodash/debounce';
import { isVertical } from './utils';

const lastItemWidth = {
  'base': 160
}

export default class TabBarTabsNode extends React.Component {

  containerPlaceholderRef = React.createRef()

  state = {
    'lastItemIndex': 0,
    'hasMoreItem': false,
  }

  componentDidMount() {
    this.debouncedResize = debounce(() => {
      this.refreshTabNav()
    }, 100);
    this.resizeObserver = new ResizeObserver(this.debouncedResize);
    this.resizeObserver.observe(this.props.getRef('navTabsContainer'));
  }

  refreshTabNav() {
    const { prefixCls, 'panels': children, getRef, tabType } = this.props;
    const containerWidth = getRef('navTabsContainer').offsetWidth;
    const items = this.containerPlaceholderRef.current.querySelectorAll(`.${prefixCls}-base-tab`);
    let hasMoreItem = false;
    let lastItemIndex = children.length;

    for (let i=0; i<items.length; i++) {
      const restWidth = containerWidth - items[i].offsetLeft;
      // 最后一个item必须使用指定的宽度
      if (restWidth < lastItemWidth[tabType]) {
        hasMoreItem = true;
        lastItemIndex = i-1;
        break;
      }
    }
    this.setState({ hasMoreItem, lastItemIndex });
  }

  renderItemMoreBtn() {
    const { 'panels': children } = this.props
    const moreBtn = React.cloneElement(children[0], {
      'key': 99999,
      'disabled': false,
      'tab': '...',
    })
    return this.renderChildItem(moreBtn, children.length, true)
  }

  renderChildItem(child, index, isMoreBtn) {
    const {
      'panels': children,
      activeKey,
      prefixCls,
      tabBarGutter,
      saveRef,
      tabBarPosition,
      renderTabBarNode,
      tabType
    } = this.props;

    if (!child) {
      return;
    }
    const key = child.key;
    let cls = activeKey === key ? `${prefixCls}-${tabType}-tab-active` : '';
    cls += ` ${prefixCls}-${tabType}-tab`;
    let events = {};

    if (!isMoreBtn) {
      if (child.props.disabled) {
        cls += ` ${prefixCls}-${tabType}-tab-disabled`;
      } else {
        events = {
          'onClick': this.props.onTabClick.bind(this, key),
        };
      }
    }

    const ref = {};
    if (activeKey === key) {
      ref.ref = saveRef('activeTab');
    }

    const gutter = tabBarGutter && index === children.length - 1 ? 0 : tabBarGutter;
    const style = {
      [isVertical(tabBarPosition) ? 'marginBottom' : 'marginRight']: gutter,
    };
    warning('tab' in child.props, 'There must be `tab` property on children of Tabs.');

    let node = (
      <div
        role="tab"
        aria-disabled={child.props.disabled ? 'true' : 'false'}
        aria-selected={activeKey === key ? 'true' : 'false'}
        {...events}
        className={cls}
        key={key}
        style={ style }
        {...ref}
      >
        {child.props.tab}
      </div>
    );

    if (renderTabBarNode) {
      node = renderTabBarNode(node);
    }

    return node;
  }

  render() {
    const {
      hasMoreItem,
      lastItemIndex,
    } = this.state;
    const {
      'panels': children,
      prefixCls,
      saveRef,
    } = this.props;
    const rst = [];

    React.Children.forEach(children, (child, index) => rst.push(this.renderChildItem(child, index)));

    return (
      <div className={`${prefixCls}-moreable-nav`} ref={saveRef('navTabsContainer')}>
        <div className={`${prefixCls}-moreable-nav-show`}>
          { rst.slice(0, lastItemIndex+1) }
          { hasMoreItem && this.renderItemMoreBtn() }
        </div>
        <div className={`${prefixCls}-moreable-nav-placeholder`} ref={this.containerPlaceholderRef}>{rst}</div>
      </div>
    );
  }
}

TabBarTabsNode.propTypes = {
  activeKey: PropTypes.string,
  panels: PropTypes.node,
  prefixCls: PropTypes.string,
  tabBarGutter: PropTypes.number,
  onTabClick: PropTypes.func,
  saveRef: PropTypes.func,
  renderTabBarNode: PropTypes.func,
  tabBarPosition: PropTypes.string,
  tabType: PropTypes.string,
};

TabBarTabsNode.defaultProps = {
  panels: [],
  prefixCls: [],
  tabBarGutter: null,
  onTabClick: () => {},
  saveRef: () => {},
};
