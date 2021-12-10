import React, { FC, ReactElement } from 'react'
import { ITodo } from '../typings'
import TdItem from './Item'

//因为没用到redux 所以数据还是得通过props一层层传下来
interface Iprops{
    todoList : ITodo[]
    toggleTodo: (id:number) => void
    removeTodo: (id:number) => void
}
const TdList:FC<Iprops> = ({
    todoList,
    toggleTodo,
    removeTodo
}): ReactElement=>{
    return(
        <div className="td-list">
            {
                todoList && todoList.map((todo: ITodo)=>{
                    return(
                        <TdItem 
                            key={todo.id}
                            todo = {todo}
                            removeTodo={ removeTodo}
                            toggleTodo={ toggleTodo}
                        />
                    )
                 })
            }

        </div>
    )
}

export default TdList
