import { NavLink, Outlet } from 'react-router-dom'

function App(): React.JSX.Element {
  return (
    <>
      <nav className="flex gap-4 p-4 border-b border-gray-700 fixed top-0 mt-8">
        
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-400'}
        >
          Patient List
        </NavLink>
        <NavLink
          to="/patients-input"
          className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-400'}
        >
          Patient Input
        </NavLink>
      </nav>
      
      <Outlet />
    </>
  )
}

export default App
