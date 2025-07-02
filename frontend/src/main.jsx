import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/home/page.jsx'
import Carrinho from './pages/carrinho/page.jsx'
import Perfil from './pages/perfil/page.jsx'
import Roupas from './pages/roupas/page.jsx'
import Auth from './pages/auth/page.jsx'


const pages = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/carrinho', element: <Carrinho /> },
      { path: '/perfil', element: <Perfil /> },
      { path: '/roupas', element: <Roupas /> },
      { path: '/auth', element: <Auth /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={pages}></RouterProvider>
  </StrictMode>,
)
