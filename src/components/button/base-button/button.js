import React, {Component} from 'react'

class Button extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button className='base-button' onClick={this.props.onClick}>{this.props.buttonName}</button>
        )
    }
}

export default Button