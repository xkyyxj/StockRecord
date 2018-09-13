import React,{Component} from 'react'
import './tree.scss'

class Tree extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul className='tree'>
                {this.props.children}
            </ul>
        )
    }
}

export default Tree