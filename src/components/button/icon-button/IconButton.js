import React,{Component} from 'react'

class IconButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let className = {}
        return (<button src={this.props.iconPath}/>)
    }

}

IconButton.STYLE = {
    IMPORTANT: 1,
    NOMRAL: 2
}

export default IconButton