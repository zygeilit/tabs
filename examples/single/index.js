
import React, { Component } from 'react'
import Tabs, { TabPane } from '../../src/index'
import update from 'immutability-helper';
import {
	DragSource,
  DropTarget,
} from 'react-dnd';

class TabNode extends React.Component {
  render() {
		const {
			connectDragSource,
      connectDropTarget,
      children,
		} = this.props

		return connectDragSource(
			connectDropTarget(children),
    );
	}
}

const cardTarget = {
  drop(props, monitor) {
    const dragKey = monitor.getItem().index;
    const hoverKey = props.index;

    if (dragKey === hoverKey) {
      return;
    }

    props.moveTabNode(dragKey, hoverKey);
    monitor.getItem().index = hoverKey;
  },
};

const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
		}
	},
};

const WrapTabNode = DropTarget(
	'DND_NODE',
	cardTarget,
	(connect) => ({
		connectDropTarget: connect.dropTarget(),
	}),
)(
	DragSource(
		'DND_NODE',
		cardSource,
		(connect, monitor) => ({
			connectDragSource: connect.dragSource(),
			isDragging: monitor.isDragging(),
		}),
	)(TabNode),
);

// Demo
class Demo extends React.Component {
  state = {
    activeKey: '0',
    tabs: [ '页签1', '页签2', '页签3', '页签4', '页签5', '页签6', '页签7', '页签8', '页签9', '页签10', '页签11', '页签12', '页签13', '页签14', '页签15', '页签16', '页签17' ],
  };

  onChange = (activeKey) => {
    console.log(`onChange ${activeKey}`);
    this.setState({
      activeKey,
    });
  }

  onTabClick = (key) => {
    console.log(`onTabClick ${key}`);
    if (key === this.state.activeKey) {
      this.setState({
        activeKey: '',
      });
    }
  }

  moveTabNode = (dragKey, hoverKey) => {
    const { tabs } = this.state;
    const dragIndex = tabs.indexOf(dragKey);
    const hoverIndex = tabs.indexOf(hoverKey);
    const dragTab = this.state.tabs[dragIndex];
    this.setState(
			update(this.state, {
				tabs: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragTab]],
				},
			}),
		);
  };

  renderTabBarNode = (node) => {
    return (node
      // <WrapTabNode key={node.key} index={node.key} moveTabNode={this.moveTabNode}>{}</WrapTabNode>
    );
  };

  render() {
    return (
        <div style={{ margin: 20 }}>
          <Tabs
            tabType={'base'}
            activeKey={this.state.activeKey}
            onChange={this.onChange}
          >
            {this.state.tabs.map((id, index) => (
              <TabPane tab={`${id}`} key={index}>
                我是内容 {id}
              </TabPane>
            ))}
          </Tabs>
        </div>
    );
  }
}

export default class extends Component {
  render () {
    return <div>
      <Demo />
    </div>
  }
}
