import React,{Component} from 'react'

class TreeNode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
        }
    }

    onNodeClick() {
        if(this.props.onNodeClick && typeof this.props.onNodeClick == 'function') {
            this.props.onNodeClick(this.props.data)
        }
    }

    expandClick() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        //{this.state.expanded ? '<' : '>'}
        return (
            <li>
                {this.props.children ? (<span className='glyphicon glyphicon-search' onClick={this.expandClick.bind(this)}></span>) : ''}
                <a>{this.props.data}</a>
                {this.state.expanded ? (<ul>{this.props.children}</ul>) : null}
            </li>
        )
    }
}

export default TreeNode