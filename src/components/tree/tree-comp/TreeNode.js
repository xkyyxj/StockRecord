import React,{Component} from 'react'
import octicons from 'octicons'

class TreeNode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
        }
    }

    onNodeClick() {
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
        let nodeSVG = {__html: this.state.expanded ? octicons['chevron-down'].toSVG() : octicons['chevron-right'].toSVG()}
        return (
            <li>
                {this.props.children ? (<span className='expandIcon' dangerouslySetInnerHTML={nodeSVG} onClick={this.expandClick.bind(this)}/>) : ''}
                <a className='nodeTitle' onClick={this.onNodeClick.bind(this)}>{this.props.display}</a>
                {this.state.expanded ? (<ul>{this._constructChildren()}</ul>) : null}
            </li>
        )
    }
}

export default TreeNode