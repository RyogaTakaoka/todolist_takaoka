import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home(){
  type todo = {
    taskNames: string
    isCompleted: boolean
    details: string
  }

  const name: number= 1
  //taskname
  const [text, setText] = useState("")
  const [addText, setAddText] = useState("")

  //detail
  const [detail, setDetail] = useState("")
  const [addDetail, setAddDetail] = useState("")

  //todo todoTask;
  //const [todoTask, setTodoList] = useState<todo>()

  //todo[] todoList;
  const [todoList, addTodoList] = useState<todo[]>([])

  // const addTodoList = () =>{
  //   setTodoList([...todoList,todoTask])
  // }

  const onClickAddTask = () => {
    if(text === '') return 
    
    setText("")
    setDetail("")

    const todoTask:todo = {taskNames:text, isCompleted:false, details:detail}
    
    if(todoTask!=undefined&&todoList!=undefined){
      addTodoList([...todoList,todoTask])
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.inputField}>
        <div className={styles.inputGenre}>
          <p>タスク名</p>
          <p>タスク詳細</p>
        </div>
        <div>
          <input type={"text"}
            value={text}
            onChange={(event) => setText(event.target.value)}
          /> 
          <br/>
          <input type={"text"}
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
          />
        </div>
      </div>
      
      <button onClick={onClickAddTask}>追加</button>

      {/* <p>入力中：{text}</p> */}
      {/* <p>追加：{todoList![0].taskNames}</p> */}

      {/* 配列の要素を列挙 */}
      {todoList?.map((todo,index)=>(
      <div  className={styles.todoList} key={index}>
        <div className={styles.todoText}>
          {'タスク名：'}{todo.taskNames}
        </div>
        <div className={styles.todoText}>
          {'状態：'}{todo.isCompleted?"完了":"未完了"}
        </div>
        <div className={styles.todoText}>
          {'詳細：'}{todo.details}
        </div>
      </div>))}
      
      {console.log(todoList)}

    </div>
  )
}