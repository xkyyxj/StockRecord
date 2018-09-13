import React, {Component} from 'react'

import TableCell from './TableCell'

/**
 * props.columns
 *      1. 数组，每个元素包含了一列显示的所有必须信息
 *      2. columns数组当中的每个元素都是一个Object，样式如下：{
 *              name: 'name1',
 *              render: (data) => {
 *                  return (<span>{data}</span>)
 *              }
 *         }
 *      3. 数据datas样式，datas是一个数组，数组当中每个元素的样式如下：
 *         {
 *              name: 'name', //同column的name属性相同
 *              value: ''
 *         }
 */
class TableRow extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {datas, columns, index} = this.props
        return (
            <tr>
                {datas ? columns.map(column => {
                    let tableCellAttr = {
                        ...column,
                        index: index,
                        data: datas[column.name]
                    }
                    return (<TableCell {...tableCellAttr} />)
                }) : ""}
            </tr>
        )
    }
}

export default TableRow