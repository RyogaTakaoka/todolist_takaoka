import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home(){
  //ToDoの型
  type todo = {
    id: number
    taskName: string
    detail: string
    isCompleted: boolean
    isRemoved:boolean
  }

  //Filterの型
  type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

  //taskname
  const [text, setText] = useState("")

  //detail
  const [detail, setDetail] = useState("")

  //todo[] todoList;
  const [todoList, setTodoList] = useState<todo[]>([])

  const [filter, setFilter] = useState<Filter>('all');

  //todo newTodo;
  const newTodo:todo = {
    id:todoList.length,
    taskName:text,
    detail:detail,
    isCompleted:false,
    isRemoved:false
  }

  //Firter処理したToDoリスト
  const filteredTodoList = todoList.filter((todo) => {
    // filter ステートの値に応じて異なる内容の配列を返す
    switch (filter) {
      case 'all':
        //削除していないタスク全て
        return !todo.isRemoved;
      case 'checked':
        //完了かつ削除していないタスク
        return todo.isCompleted && !todo.isRemoved;
      case 'unchecked':
        //未完了かつ削除していないタスク
        return !todo.isCompleted && !todo.isRemoved;
      case 'removed':
        //削除したタスク
        return todo.isRemoved;
      default:
        return todo;
    }
  });

  //タスク追加処理
  const onClickAddTask = () => {
    //空は返す
    if(text === '') return 
    
    //inputの中身リセット
    setText("")
    setDetail("")
    
    //新規タスクを追加
    if(newTodo!=undefined&&todoList!=undefined){
      setTodoList([...todoList,newTodo])
    }
  }

  //タスク完了・未完了処理
  const handleIsCompleted = (id:number, isCompleted:boolean) => {
    //const deepCopy = todoList.map((todo) => ({ ...todo }));
    const newTodos = todoList.map((todo) => {
      if(todo.id === id){
        todo.isCompleted = !isCompleted
      }
      return todo
    })

    setTodoList(newTodos)
  }

  //タスク削除処理
  const handleRemoved = (id:number, isRemoved:boolean) => {
    //const deepCopy = todoList.map((todo) => ({ ...todo }));
    const newTodos = todoList.map((todo) => {
      if(todo.id === id){
        todo.isRemoved = !isRemoved
      }
      return todo
    })
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

      <div className={styles.title}>ToDo List</div>
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

      <div>
        <select
          defaultValue="all"
          onChange={(e) => setFilter(e.target.value as Filter)}
        >
          <option value="all">すべてのタスク</option>
          <option value="unchecked">未完了タスク</option>
          <option value="checked">完了タスク</option>
          <option value="removed">削除したタスク</option>
        </select>
      </div>

      {/* <p>入力中：{text}</p> */}

      {/* 配列の要素を列挙 */}
      {filteredTodoList?.map((todo)=>(
      <div  className={styles.todoList} key={todo.id}>

        <input type={"checkbox"} className={styles.todoText}
          checked={todo.isCompleted}
          onChange={() => handleIsCompleted(todo.id,todo.isCompleted)}
        />

        <div className={styles.todoText}>
          {'タスク名：'}{todo.taskName}
        </div>

        <div className={styles.todoText}>
          {'詳細：'}{todo.detail}
        </div>
        
        <div className={styles.todoText}>
          {'状態：'}{todo.isCompleted?"完了":"未完了"}
        </div>

        <button className={styles.todoText}
          onClick={() => handleRemoved(todo.id,todo.isRemoved)}>{todo.isRemoved?"復元":"削除"}</button>

      </div>))}
      
      {console.log(todoList)}

    </div>
  )
}