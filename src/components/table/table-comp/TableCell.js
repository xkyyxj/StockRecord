import React, {Component} from 'react'
import classnames from 'classnames'

import './table-cell.scss'

/**
 * render函数：
 *  index: 当前行号（从0开始）
 *  name: 当前列名
 *  data: 修改后的值
 */
class TableCell extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {render, data} = this.props
        return (
            <td>
                {render && typeof render == 'function' ? render(this.props.index,this.props.name,data) : data}
            </td>
        )
    }
}

export default TableCell