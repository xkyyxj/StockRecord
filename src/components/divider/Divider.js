import React,{Component} from 'react'

class Divider extends Component {
    constructor(props) {
        super(props)
        this.isMouseDown = false
    }

    onMouseDown(e) {
        e.stopPropagation()
        this.isMouseDown = true
        this.beginX = this.leftDom.clientWidth;

        document.documentElement.onmousemove = (e) => {
            if(this.isMouseDown) {
                e.stopPropagation()
                let width = e.x - this.beginX
                let currLeftWidth = this.leftDom.clientWidth
                currLeftWidth += width
                this.leftDom.style.width = e.x + 'px'
                //console.log(`beginX: ${this.beginX}; width: ${width}; currLeftWidth: ${currLeftWidth}`)
            }
        }

        document.documentElement.onmouseup = (e) => {
            e.stopPropagation()
            this.isMouseDown = false
        }
    }

    render() {
        let leftWidth = this.props.leftWidth ? this.props.leftWidth : "250px"
        return (
            <div className='divider'>
                <div className='left-comp' style={{width: leftWidth}}
                    ref={(dom) => {this.leftDom = dom}}
                >
                    {this.props.leftComp}
                </div>

                <div className='line' onMouseDown={this.onMouseDown.bind(this)}>
                </div>

                <div className='right-comp'>
                    {this.props.rightComp}
                </div>
            </div>
        )
    }
}

export default Divider