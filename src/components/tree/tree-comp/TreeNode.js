import React,{Component} from 'react'

class TreeNode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
        }
    }

    onNodeClick() {
        console.log("node clicked?")
        if(this.props.onNodeSelected && typeof this.props.onNodeSelected == 'function') {
            this.props.onNodeSelected(this.props.data)
        }
    }

    expandClick() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    //子节点添加相关事件
    _constructChildren() {
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {onNodeSelected: this.props.onNodeSelected})
        })
    }

    render() {
        return (
            <li>
                {this.props.children ? (<span className='glyphicon glyphicon-search' onClick={this.expandClick.bind(this)}>{this.state.expanded ? '<' : '>'}</span>) : ''}
                <a onClick={this.onNodeClick.bind(this)}>{this.props.display}</a>
                {this.state.expanded ? (<ul>{this._constructChildren()}</ul>) : null}
            </li>
        )
    }
}

export default TreeNode