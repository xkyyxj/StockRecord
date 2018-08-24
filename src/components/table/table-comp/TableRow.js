import React, {Component} from 'react'

import TableCell from './TableCell'

/**
 * props.columns
 *      1. 数组，每个元素包含了一列显示的所有必须信息
 *      2. {
 *              name:
 *              
 *         }
 */
class TableRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datas: null
        }
    }

    render() {
        let columns = this.props.columns
        return (
            <tr>
                {columns.map(column => {
                    return (<TableCell editable={this.props.editable} data={this.state.datas.filter(data => data.colName == column.name).value} />)
                })}
            </tr>
        )
    }
}

export default TableRow