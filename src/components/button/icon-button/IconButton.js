import React,{Component} from 'react'

class IconButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button>{this.props.children}</button>
        )
    }

}

IconButton.STYLE = {
    IMPORTANT: 1,
    NOMRAL: 2
}

export default IconButton