  import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import './index.css'
import Auth from './pages/Auth'
import Channel from './pages/Channel'
import ServerDialogue from './components/ServerDialogue'

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/channel/:id",
    element: <Channel />
  },
  {
    path:"/dialogue/",
    element:<ServerDialogue/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
