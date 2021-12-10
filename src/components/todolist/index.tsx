import React,{FC,ReactElement,useCallback,useEffect,useReducer,} from 'react'
import TdList from './list'
import TdInput from './input'
import { ACTION_TYPE, IState, ITodo } from './typings'
import { todoReducer } from './reducer'

const TodoList:FC = ():ReactElement=>{

    // const [todoList, setTodoList] = useState<Itodo[]>([])

    // 当多个方法操作一个state，且方法逻辑相对复杂时 使用useReducer
    
    //初始化
    // const initialState:IState = {
    //     todoList: [] 
    // }
    
    //惰性初始化，创建一个函数作为useReducer的第三个参数，回调函数，不执行的话是没有state的
    function init (initTodoList: ITodo[]):IState{  //useReducer调用时，把第二个参数[] 给到initTodoList
        return {
            todoList : initTodoList
        }
    }

    // useReducer会返回一个状态和dispatch  参数：reducer，初始状态对象，
    // const [state,dispatch] = useReducer(todoReducer,initialState)
    const [state,dispatch] = useReducer(todoReducer,[],init) //惰性初始化写法

    useEffect(() => {
        //从本地获取到todoList
        const todoList = JSON.parse(localStorage.getItem('todoList') || '[]')
        //初始化
        dispatch({
            type: ACTION_TYPE.INIT_TODOLIST,
            payload : todoList
        })
    }, [])

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(state.todoList))
    }, [state.todoList])

    //addTodo要传给子组件 useCallback
    const addTodo = useCallback((todo:ITodo):void=>{
        // setTodoList((todoList)=> [...todoList,todo])
        //这时候更改的是reducer中的state
        dispatch({
            type : ACTION_TYPE.ADD_TODO,
            payload : todo
        })
    },[])

    const removeTodo = useCallback((id:number):void=>{
        dispatch({
            type : ACTION_TYPE.REMOVE_TODO,
            payload : id
        })
    },[])

    const toggleTodo = useCallback((id:number):void=>{
        dispatch({
            type : ACTION_TYPE.TOGGLE_TODO,
            payload : id
        })
    },[])

    return(
        <div className='todo-list'>
            <TdInput
            addTodo= {addTodo}
            todoList = {state.todoList}
            />
            <TdList 
                todoList={state.todoList}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
            />
        </div>
    )
}
export default TodoList
