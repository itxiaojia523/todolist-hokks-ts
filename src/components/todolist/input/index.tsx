import React,{useRef, FC, ReactElement} from 'react'
import {ITodo} from '../typings'

// 父组件传来的props接口写在这里
interface Iprops {
    addTodo: (todo:ITodo) => void
    todoList: ITodo[]
}
// 函数组件固定写法，本身是FC类型,返回ReactElement
// 写{} 直接解构了
const TdInput: FC<Iprops> = ({
    addTodo,todoList
}): ReactElement => {

    const inputRef = useRef<HTMLInputElement>(null)
    //ref其实是html节点 指定泛型 usestate useref都要写个泛型 默认null
    const addItem = ():void=>{
        // inputRef.current可能是null 加！表断言，肯定有值
        const val: string = inputRef.current!.value.trim()
        if (val.length){ //true 表有值
            // 查重
            const isExist = todoList.find((todo)=> todo.content === val) 
            // isExist 有值了 就提示
            if(isExist) {
                alert('已存在该项')
                return
            }

            addTodo({
                id: new Date().getTime(),
                content: val,
                completed: false
            });

            inputRef.current!.value = ''

        }
    }
    return (
        <div className='todo-input'>
            <input type="text" placeholder='请输入待办事项' ref={inputRef}/>
            <button onClick={addItem}>增加</button>
        </div>
    )

}

export default TdInput

// 这是一个接口 即todo的类型 结构如下
// id:number newdate().getTime()
// content:string
// completed: boolean