import React, {Component} from 'react'

import ExTable from '../exTable/index'
import Divider from '../../components/divider/Divider'
import { Tree, TreeNode, SimpleTree } from '../../components/tree'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: ['start','1','2','3','4'],
            datas: [['1','2','3','4','5']]
        }
    }

    componentDidMount() {
        //加载树

    }

    render() {
        let treeData = [
            {key: 1,parentKey: null,display: '1', data: 1},
            {key: 2,parentKey: 1,display: '2', data: 2},
            {key: 3,parentKey: 2,display: '3', data: 3}
        ]
        return (
            <div className="mainPage">
                <Divider className="mainContent"
                    leftComp={(
                        <SimpleTree className='mainTree' data={treeData}>
                            <TreeNode display={1}>
                                     <TreeNode display={2}>
                                         <TreeNode display={3}></TreeNode>
                                     </TreeNode>
                                </TreeNode>
                        </SimpleTree>
                    )}
                    rightComp={(
                      <ExTable className='mainTable'/>  
                    )}
                />
            </div>
        )
    }
}

export default App