import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes/route'




const App = () => {
  const routings = createBrowserRouter(routes)
  return (
    <div>
      <RouterProvider router={routings}></RouterProvider>
    </div>
  )
}

export default App