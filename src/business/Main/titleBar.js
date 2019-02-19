import React, {Component} from 'react'
import IconButton from '../../components/button/icon-button/IconButton'
import octicons from 'octicons'

class TitleBar extends Component {

    constructor(props) {
        super(props)

        this.minimizeClick = this.minimizeClick.bind(this)
    }

    minimizeClick () {
        console.log('minize-click')
    }

    render() {
        let minimizeButton = {__html: octicons['dash'].toSVG()}
        let closeButton = {__html: octicons['x'].toSVG()}
        return (
            <div className='title-bar'>
                <div className='title-main-content'>
                    <div className='icon'>
                    </div>

                    <div className='ope-button'>
                        <button className='minimize-button' dangerouslySetInnerHTML={minimizeButton} onClick={this.minimizeClick}></button>
                        <button className='close-button' dangerouslySetInnerHTML={closeButton} onClick={this.minimizeClick}></button>
                    </div>
                </div>

                <div className='titlebar-divider'/>
            </div>
        )
    }

}

export default TitleBar