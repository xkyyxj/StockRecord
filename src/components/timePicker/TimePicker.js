import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { getDateArrayForDay } from './timepicker-comp/calDate'
import './timepicker.scss'

/**
 * 实现方式：ReactDOM.createPortal创建一个额外div挂载到body标签上
 * document绑定监听事件，如果有点击事件的话，那么就隐藏弹窗层。
 */
class TimePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCalendar: false,
            selectedIndex: -1,
            format: 'yyyy-MM-dd',
            selectedDate: this.props.defaultValue ? this.props.defaultValue : new Date()
        }

        this.onCancelClick = this.onCancelClick.bind(this)
        this.onSelectSure = this.onSelectSure.bind(this)
    }

    componentWillReceiveProps(newProps) {
        if(newProps.defaultValue) {
            this.setState({
                selectedDate: newProps.defaultValue
            })
        }
    }

    componentDidUpdate() {
        if(this.state.showCalendar) {
            window.document.addEventListener('click', this.onCancelClick, false)
        }
        else {
            window.document.removeEventListener('click', this.onCancelClick)
        }
    }

    componentWillUnmount() {
        window.document.removeEventListener('click', this.onCancelClick)
    }

    _constructDatePickTdArr(dayArray,start) {
        let tdArray = []
        let selectedDateStr = `${this.state.selectedDate.getFullYear()}_${this.state.selectedDate.getMonth() + 1}_${this.state.selectedDate.getDate()}`
        for(let i = start;i < start + 7;i++) {
            let className = selectedDateStr == dayArray[i].value ? 'selected' : 'unselected'
            tdArray.push(
                <td>
                    <span className={className} data-datestr={dayArray[i].value} onClick={this.onSelectDate.bind(this)}>{dayArray[i].display}</span>
                </td>
            )
        }

        return tdArray
    }

    _constructDatePickBody() {
        let dayArray = getDateArrayForDay(this.state.selectedDate)
        this.dayArray = dayArray
        let trCount = dayArray.length / 7

        let trArray = []
        for(let i = 0;i < trCount;i++) {
            trArray.push(
                <tr>
                    {this._constructDatePickTdArr(dayArray,i * 7)}
                </tr>
            )
        }
        return trArray
    }

    onSelectSure() {
        if(this.props.onSelectedDate && typeof this.props.onSelectedDate == 'function') {
            this.props.onSelectedDate(this.state.selectedDate)
        }

        this.setState({
            showCalendar: false
        })
    }

    onCancelClick() {
        console.log('cancel Click!!!!!!!!!!!!!!!!!!!!!!')
        this.setState({
            selectedDate: this.props.defaultValue ? this.props.defaultValue : new Date(),
            showCalendar: false
        })
    }

    onSelectDate(e) {
        //构建一下选择的日期
        let dateInfo = e.target.dataset.datestr
        let dayInfoArray = dateInfo.split('_')
        //处理一下月份
        dayInfoArray[1] = dayInfoArray[1] == 0 ? 11 : dayInfoArray[1] -1
        let selectedDate = new Date(dayInfoArray[0],dayInfoArray[1],dayInfoArray[2])
        this.setState({
            selectedDate: selectedDate
        })
        
    }

    onInputClick(e) {
        let top = e.target.style.top
        this.popupX = e.pageX
        this.popupY = e.pageY
        this.setState({
            showCalendar: true
        })
    }

    datePickClick(e) {
        e.nativeEvent.stopImmediatePropagation()
    }

    render() {
        //将日历组件弹出层放置到input组件的位置上
        //改造一下，将日历组件改成弹出层的方式，ReactDOM.createPortal()的形式
        let datePickItemStyle = {
            display: this.state.showCalendar ? 'block' : 'none',
            position: 'absolute',
            left: this.popupX,
            top: this.popupY,
            zIndex: 1234
        }
        let dateValue = this.state.selectedDate ? this.state.selectedDate : new Date()
        let datePickMain = null
        if(this.state.showCalendar) {
            let bodyDevs = document.getElementsByTagName('body')
            let bodyDev = null
            if(bodyDevs && bodyDevs.length > 0) {
                bodyDev = bodyDevs[0]
            }
            let datePickContent = (
                <div className='datetime-picker-modal'>
                    <div className='datetime-picker' style={datePickItemStyle} onClick={this.datePickClick.bind(this)}>
                        <div className='picker-content'>
                            <div className='datePickHeader'>
                                {`${dateValue.getFullYear()}年${dateValue.getMonth() + 1}月${dateValue.getDate()}日`}
                            </div>
                            <div className='divider-line'>
                            </div>
                            <table className='datePickBody'>
                                <thead>
                                    <tr>
                                        {['日','一','二','三','四','五','六'].map(item => {
                                            return (<td><label onClick={this.onSelectDate.bind(this)}>{item}</label></td>)
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this._constructDatePickBody()}
                                </tbody>
                            </table>

                            {/*确认取消按钮*/}
                            <div>
                                <button className='timepick-button' onClick={this.onSelectSure}>确定</button>
                                <button className='timepick-button' onClick={this.onCancelClick}>取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            datePickMain = ReactDOM.createPortal(datePickContent, bodyDev)
        }

        let childContent = (
            <div>
                {
                    this.props.children ? React.cloneElement(this.props.children, {onClick: this.onInputClick.bind(this)}) : (
                        <input value={dateValue.toString()} onClick={this.onInputClick.bind(this)}/>
                    )
                }
            </div>
        )
        return [datePickMain, childContent]
    }
}

export default TimePicker