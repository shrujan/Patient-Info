import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import App from './App'
import PatientInput from './components/PatientInput/PatientInput'
import PatientList from './components/PatientLIst/PatientList'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'patients-input',        element: <PatientInput /> },
      { path: 'patients-input/:id',    element: <PatientInput /> },
      { index: true,                   element: <PatientList />  }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
