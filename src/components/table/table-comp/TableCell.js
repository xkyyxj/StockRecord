import React, {Component} from 'react'

/**
 * props.columns
 *      1. 数组，每个元素包含了一列显示的所有必须信息
 *      2. {
 *              name:
 *              
 *         }
 */
class TableCell extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }

    render() {
        return (
            <td>
                <input disabled={this.props.editable}>{this.state.data}</input>
            </td>
        )
    }
}

export default TableCell