import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { loginUser } from './reducer/userSlice';
import firebase from './firebase.js';

import Header from './components/layout/Header'
import Main from './components/layout/Main'
import Footer from './components/layout/Footer'

import PostWrite from './components/post/PostWrite'
import PostList from './components/post/PostList'
import PostDetail from './components/post/PostDetail'
import PostModify from './components/post/PostModify'
import Home from './pages/Home'
import Login from './components/user/Login'
import Join from './components/user/Join'

const App = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      console.log("userInfo : ", userInfo);
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      }
    })
  }, [dispatch]);

  // useEffect(() => {}, [])

  // useEffect(() => {
  //   firebase.auth().signOut();
  // }, []);

  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/write' element={<PostWrite />}></Route>
          <Route path='/list' element={<PostList />}></Route>
          <Route path='/detail/:postNum' element={<PostDetail />}></Route>
          <Route path='/modify/:postNum' element={<PostModify />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/join' element={<Join />}></Route>
        </Routes>
      </Main>
      <Footer />
    </>
  )
}

export default App