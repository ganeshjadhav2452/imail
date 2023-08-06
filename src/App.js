import React from 'react'
import AuthPage from './components/pages/AuthPage/AuthPage'
import ComposeMailForm from './components/pages/ComponseMail/ComposeMail'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import RenderMail from './components/pages/RenderMail/RenderMail'
import Viewemail from './components/pages/RenderMail/Viewemail'
import PrivateComponent from './components/PrivateComponent'
const App = () => {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route element={<PrivateComponent/>}>
      <Route exact path='/viewemail/:id/:render' element={<Viewemail/>} />
      <Route exact path='/' element={<RenderMail render={'inbox'}/>} />
      <Route exact path='/sent' element={<RenderMail render={'sent'}/>} />
      <Route exact path='/composemail' element={<ComposeMailForm/>} />

      </Route>
      <Route exact path='/auth' element={<AuthPage/>} />
    </Routes>
    </>
  )
}

export default App