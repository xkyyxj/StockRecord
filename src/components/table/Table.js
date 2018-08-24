import React, {Component} from 'react'

import TableRow from './table-comp/TableRow'

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: null,
            datas: null
        }
    }

    render() {
        return (
            <table>
                {this.state.datas.map(data => {
                    return (<TableRow editable={this.props.editable} datas={data} columns={this.state.columns}/>)
                })}
            </table>
        )
    }
}

export default Table