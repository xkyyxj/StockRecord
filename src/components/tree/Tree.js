import React,{Component, Fragment} from 'react'
import './tree.scss'

/**
 * 树组件：所有的节点监听事件都添加到Tree上，然后在render的时候
 * 通过由父级树节点传递到下级子节点当中去
 */
class Tree extends Component {
    constructor(props) {
        super(props)
        this.onNodeSelected = this.onNodeSelected.bind(this)
    }

    constructChildren() {
        return null
    }

    $_addClickListener(treeNode) {
        return React.cloneElement(treeNode, {onNodeSelected: this.onNodeSelected})
    }

    $_loopChildren(element, callback) {
        let eleStack = [element]

        while(eleStack.length > 0) {
            let ele = eleStack.pop()
            React.children.forEach(ele.props.children, child => {
                ele.push(child)
                callback(child)
            })
        }
    }

    /**
     * 对this.props.children以及constructChildren构建的节点添加监听事件
     * 
     */
    _constructNode() {
        let childNodes = this.constructChildren()
        childNodes = childNodes && Array.isArray(childNodes) ? childNodes : []
        let allChildNodes = childNodes.concat(this.props.children)
        let finalChildren = []
        if(allChildNodes) {
            finalChildren = React.Children.map(allChildNodes, child => {
                return React.cloneElement(child, 
                    {
                        onNodeSelected: this.onNodeSelected,
                        selectedKeys: this.props.selectedKeys
                    }
                )
            })
        }
        return finalChildren
        // let modifiedChildren = React.children ? React.children.map(child => {
        //     return React.cloneElement(child,{onNodeSelected: this.onNodeSelected.bind(this)}) 
        // }) : null

        // let constructedChild = []
        // if(childNodes) {
        //     constructedChild = childNodes.map(child => {
        //         return React.cloneElement(child,{onNodeSelected: this.onNodeSelected.bind(this)}) 
        //     })
        // }

        // return [modifiedChildren,constructedChild]
    }

    onNodeSelected(e) {
        if(this.props.onNodeSelected) {
            this.props.onNodeSelected(e)
        }
        console.log("node selected!")
    }

    render() {
        return (
            <ul className='tree'>
                {this._constructNode()}
            </ul>
        )
    }
}

export default Tree