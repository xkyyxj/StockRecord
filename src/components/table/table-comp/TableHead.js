import React,{Component} from 'react'

const HeadStyle = {
    'font-weight': 'bold',
    'background-color': '#DDDDDD'
}

class TableHead extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if(this.props.columns && Array.isArray(this.props.columns)) {
            this.hasHead = true
        }
    }

    render() {
        return (
            <thead>
                <tr>
                    {this.props.columns.map(column => {
                        return <th style={HeadStyle}>{column.name}</th>
                    })}
                </tr>
            </thead>
        )
    }
}

export default TableHead