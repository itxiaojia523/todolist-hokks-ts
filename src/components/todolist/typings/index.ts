export interface ITodo{
    id:number;
    content:string;
    completed: boolean
}

export interface IState {
    todoList: ITodo[]
}

export enum ACTION_TYPE{
    ADD_TODO = 'addTodo',
    REMOVE_TODO = 'removeTodo',
    TOGGLE_TODO = 'toggleTodo',
    INIT_TODOLIST = 'init_todoList'
}

export interface IACTION{
    type: ACTION_TYPE,
    //其实就是data，有可能是对象 也有可能是id 还可能是todolist
    payload: ITodo | number | ITodo[]
}