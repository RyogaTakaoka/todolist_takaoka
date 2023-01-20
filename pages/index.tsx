import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home(){
  type todo = {
    taskNames: string
    completedFlags: boolean
    details: string
  }

  const [text, setText] = useState("")
  /* ↓state変数「addText」を定義 */
  const [addText, setAddText] = useState("")

  const [detail, setDetail] = useState("")
  const [addDetail, setAddDetail] = useState("")

  const [todoList, setTodoList] = useState<todo[]>()

  // const addTodoList = () =>{
  //   setTodoList([...todoList, ])
  // }

  /* ↓関数onClickAddTextを定義 */
  const onClickAddTask = () => {
    setTodoList([{taskNames:text, completedFlags:false, details:detail}])
    setAddText(text)
    setText("")
    setAddDetail(detail)
    setDetail("")
  }

  //const todoList = todo[]

  return (
    <div　className={styles.body}>
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

      {/* ↓pタグを追加 */}
      {/* <p>追加：{addDetail}</p> */}

      {todoList?.map((todo,index)=>(
        <div  className={styles.todoList} key={index}>
          <div className={styles.todoText}>
            {'タスク名：'}{todo.taskNames}
          </div>
          <div className={styles.todoText}>
            {'状態：'}{todo.completedFlags?"完了":"未完了"}
          </div>
          <div className={styles.todoText}>
            {'詳細：'}{todo.details}
          </div>
        </div>))}
    </div>
  )
}