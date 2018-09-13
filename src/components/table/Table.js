
import React, {Component} from 'react'

import TableRow from './table-comp/TableRow'
import TableHead from './table-comp/TableHead'

import './table.scss'

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasHead: false,
            hasBody: false, 
            editable: false
        }
    }

    componentDidMount() {
        let stateObj = {}
        //校验一下表头
        if(this.props.columns && Array.isArray(this.props.columns)) {
            stateObj.hasHead = true
        }

        stateObj.hasBody = true
        if(this.props.datas && Array.isArray(this.props.datas)) {
            stateObj.hasBody = true
        }

        this.setState(stateObj)
    }

    setStatus(status,callback) {
        if(status == 'edit') {
            this.setState({editable: true},callback)
        }
    }

    render() {
        let currRowCount = 0
        return (
            <table className='my-table'>
                {this.state.hasHead ? <TableHead columns={this.props.columns}/> : null}
                <tbody>
                    {this.state.hasBody ? this.props.datas.map(data => {
                        return (<TableRow columns={this.props.columns} datas={data} index={currRowCount++}/>)
                    }) : null}
                </tbody>
            </table>
        )
    }
}

export default Table