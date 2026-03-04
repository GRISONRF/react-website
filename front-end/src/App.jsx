import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ArticlePage, { loader as articleLoader} from './pages/ArticlePage'
import ArticlesListPage from './pages/ArticlesListPage'
import Layout from './Layout'
import NotFoundPage from './pages/NotFoundPage'
import axios from 'axios'
import CreateAccountPage from './pages/CreateAccountPage'
import LoginPage from './pages/LoginPage'

const routes = [{
  path: '/',
  element: <Layout />,
  errorElement: <NotFoundPage />,
  children: [{
    path: '/',
    element: <HomePage />
  }, {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/articles',
    element: <ArticlesListPage />
  },
  {
    path: '/articles/:name',
    element: <ArticlePage />,
    loader: articleLoader
  },
  {
    path:'/login',
    element: <LoginPage />  
  },
  {
    path:'/create-account',
    element: <CreateAccountPage />  
  }]
}]



const router = createBrowserRouter(routes)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>

  )
}

export default App
