const path = require('path')
const fs = window.require('fs')
const buffer = window.require('buffer')
const readline = window.require('readline')

import React,{Component} from 'react'

import { Table } from '../../components/'
import { Tree, TreeNode, SimpleTree } from '../../components/tree'
import TimePicker from '../../components/timePicker/TimePicker.js'
import Divider from '../../components/divider/Divider'

import Config from '../../../config.json'

class ExTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editable: false,
            columns: this._constructColumns(),
            datas: this._cosntructDatas()
        }
    }

    componentDidMount() {
        //加载数据（是否会有效率问题，如果有的话，以后再看）
        this._getDataFromTxt()
        
    }

    _constructColumns() {
        let columns = []
        columns.push({
            name: "123",
            render: (index, columnName, data) => {
                console.log("render datas")
                let inputAttr = {
                    value: data,
                    onChange: (e) => {this._tableCellChange.call(this,index,columnName,e.target.value)}
                }

                if(!this.state.editable) {
                    inputAttr.disabled = true
                }
                return (<input {...inputAttr}/>)
            }
        })

        return columns
    }

    _tableCellChange(index, columnName, data) {
        let datas = this.state.datas
        datas[index][columnName] = data
        this.setState({
            datas
        })
    }

    _cosntructDatas() {
        let datas = []
        datas.push({
            123: "123"
        })

        return datas
    }

    /**
     * 从TXT文件当中加载数据
     */
    _getDataFromTxt(filePath) {
        let dataDirPath = Config.STORAGE_PATH
        let finalFilePath = `${dataDirPath}\\data.txt`
        let dataLine = readline.createInterface({
            input: fs.createReadStream(finalFilePath)
        })

        dataLine.on('line', (line) => {
            console.log(line)
        })
    }

    onEditClick() {
        this.setState({
            editable: true
        })
    }

    onStopEditClick() {
        this.setState({
            editable: false
        })
    }

    render() {
        let treeData = [
            {key: 1,parentKey: null,display: '1', data: 1},
            {key: 2,parentKey: 1,display: '2', data: 2},
            {key: 3,parentKey: 2,display: '3', data: 3}
        ]
        return (
            <div>
                <Divider
                    // leftComp={(<Tree>
                    //             <TreeNode data={1}>
                    //                 <TreeNode data={2}>
                    //                     <TreeNode data={3}></TreeNode>
                    //                 </TreeNode>
                    //             </TreeNode>
                    //         </Tree>)}
                    leftComp={(
                        <SimpleTree data={treeData}>
                            <TreeNode display={1}>
                                     <TreeNode display={2}>
                                         <TreeNode display={3}></TreeNode>
                                     </TreeNode>
                                </TreeNode>
                        </SimpleTree>
                    )}
                    rightComp={(
                        <div>
                            <button className='button' onClick={this.onEditClick.bind(this)}>修改</button>
                            <button className='button' onClick={this.onStopEditClick.bind(this)}>取消</button>
                            <Table columns={this.state.columns} datas={this.state.datas} />
                            <TimePicker/>
                        </div>
                    )}
                />
                
                
            </div>
        )
    }
}

export default ExTable