import React, {Component} from 'react'

import ExTable from '../exTable/index'

class App extends Component {
    constructor(props) {
        super(props)
        console.log("?????????????????????")
        this.state = {
            columns: ['start','1','2','3','4'],
            datas: [['1','2','3','4','5']]
        }
    }

    componentDidMount() {
        //加载数

    }

    render() {
        return (
            <div>
                
                <ExTable columns={this.state.columns} datas={this.state.datas}/>
            </div>
        )
    }
}

export default App