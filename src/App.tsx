import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import TasksList from './components/TaskList'
import UserList from './components/UserList'
import CommentList from './components/CommentList'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchComments } from './redux/commentSlice'
import { AppDispatch } from './redux/store'
import { fetchTodos } from './redux/taskSlice'
import { fetchUsers } from './redux/userSlice'

function App() {
  const dispatch: AppDispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchComments());
    dispatch(fetchTodos());
    dispatch(fetchUsers());
  }, [dispatch])
  
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<TasksList />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/comments' element={<CommentList />} />
      </Route>
    </Routes>
  )
}

export default App
