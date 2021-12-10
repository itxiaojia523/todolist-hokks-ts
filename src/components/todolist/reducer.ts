import { ACTION_TYPE, IACTION, IState, ITodo } from "./typings";

//目前IState接口 里面就一个todoList
export function todoReducer(state: IState,action: IACTION):IState{
    const { type, payload} = action
    switch (type) {
        case ACTION_TYPE.ADD_TODO:
            return {
                ...state, //平铺state 防止还有其他属性
                todoList: [...state.todoList, payload as ITodo]
            }
        case ACTION_TYPE.REMOVE_TODO:
            return{
                ...state,
                todoList: state.todoList.filter((todo)=> todo.id !== payload)
            }    
        case ACTION_TYPE.TOGGLE_TODO:
            return{
                ...state,
                todoList: state.todoList.map(todo => {
                    // 如果匹配上了，更改改todo的completed
                    return todo.id === payload ? {
                        ...todo,
                        completed : !todo.completed
                    }:
                    {
                        ...todo
                    }
                })
            }
        case ACTION_TYPE.INIT_TODOLIST:
            return {
                ...state,
                todoList : payload as ITodo[]
            }
        default:
            return state    
    }
}

