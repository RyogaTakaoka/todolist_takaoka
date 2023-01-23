import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home(){
  type todo = {
    id: number
    taskName: string
    isCompleted: boolean
    detail: string
  }

  //taskname
  const [text, setText] = useState("")

  //detail
  const [detail, setDetail] = useState("")

  //todo[] todoList;
  const [todoList, setTodoList] = useState<todo[]>([])

  //todo newTodo;
  const newTodo:todo = {
    id:todoList.length,
    taskName:text,
    isCompleted:false,
    detail:detail
  }

  const onClickAddTask = () => {
    if(text === '') return 
    
    setText("")
    setDetail("")
    
    if(newTodo!=undefined&&todoList!=undefined){
      setTodoList([...todoList,newTodo])
    }
  }

  const handleIsCompleted = (id:number, isCompleted:boolean) => {
    const newTodos = todoList.map((todo) => {
      if(todo.id === id){
        todo.isCompleted = !isCompleted
      }
      return todo
    })

    setTodoList(newTodos)
  }

  const handleDeleted = (id:number) => {
    const newTodos = todoList.filter((todo) => todo.id !== id)
    setTodoList(newTodos)
  }

  //Enter入力
  const [composing, setComposition] = useState(false)
  const startComposition = () => setComposition(true)
  const endComposition = () => setComposition(false)

  const onKeydown = (key: string) => {
    switch (key) {
      case "Enter":
        if(composing) break;
        onClickAddTask()
        break;
    }
  };
  

  return (
    <div className={styles.body}>

      <h1>ToDo List</h1>
      <div className={styles.inputField}>

        <div>
          <p>タスク名</p>
          <p>タスク詳細</p>
        </div>

        <div>
          <input type={"text"}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="タスク名を入力"
          /> 
          <br/>
          
          <input type={"text"}
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
            placeholder="タスク詳細を入力"
            onKeyDown={(e) => onKeydown(e.key)}
          />
        </div>
        <button onClick={onClickAddTask}>追加</button>
      </div>

      {/* <p>入力中：{text}</p> */}

      {/* 配列の要素を列挙 */}
      {todoList?.map((todo,index)=>(
      <div  className={styles.todoList} key={index}>

        <div className={styles.todoText}>
          {'タスク名：'}{todo.taskName}
        </div>

        <div className={styles.todoText}>
          {'状態：'}{todo.isCompleted?"完了":"未完了"}
        </div>

        <div className={styles.todoText}>
          {'詳細：'}{todo.detail}
        </div>

        <input type={"checkbox"} className={styles.todoText}
          onChange={(e) => handleIsCompleted(index,todo.isCompleted)}
        />

        <button className={styles.todoText}
          onClick={() => handleDeleted(todo.id)}>Delete</button>

      </div>))}
      
      {console.log(todoList)}

    </div>
  )
}