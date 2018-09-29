import React from 'react'
import Tree from './Tree'
import TreeNode from './tree-comp/TreeNode'

/**
 * 接收一个数组，数组当中每个元素都是一个对象，形式如下：
 * {key, parentKey,display,data}
 * key: 当前树节点的唯一标志，应当在整棵树当中唯一
 * parentKey: 标识改节点的父节点是什么，值为父节点的key, 如果没有父节点可谓null
 * display: 节点名称，展示在界面上
 * data: 节点的自定义数据，可在点击事件等回调函数当中获取
 */
class SimpleTree extends Tree {
    constructor(props) {
        super(props)
    }

    /**
     * 传入一个数组，而后在此处构建树形结构
     * 数组每个元素为一个对象，起码包含四个字段
     * key,parentKey,display,data
     */
    _constructTreeNodeLayer(data) {
        if(data && Array.isArray(data) && data.length > 0) {
            let totalObj = {}
            data.forEach((item) => {
                totalObj[item.key] = item
            }) 

            let dataListObj = {}
            data.forEach(item => {
                if(item.parentKey && dataListObj[item.parentKey]) {
                    dataListObj[item.parentKey].child.push(item)
                }
                else if(item.parentKey) {
                    dataListObj[item.parentKey] = {item: totalObj[item.parentKey], child: [item]}
                }
                else {
                    dataListObj[item.key] = {item, child: []}
                }
            })

            return dataListObj
        }
    }

    constructChildren() {
        let treeLayer = this._constructTreeNodeLayer(this.props.data)
        return this._constructTreeNode(treeLayer)
    }

    _constructTreeNode(dataLayer) {
        let treeNodeList = []
        let loopChildren = (children) => {
            if(children && children.length > 0) {
                return children.map(child => {
                    return (
                        <TreeNode display={child.display}>
                            {loopChildren(dataLayer[child.key] && dataLayer[child.key].child)}
                        </TreeNode>
                    )
                })
            }
        }
        for(let key in dataLayer) {
            if(dataLayer[dataLayer[key].item.parentKey] == null) {
                treeNodeList.push(
                    <TreeNode display={dataLayer[key].item.display}>
                        {loopChildren(dataLayer[key].child)}
                    </TreeNode>
                )
            }
        }
        return treeNodeList
    }

}

export default SimpleTree