import { NavLink, Outlet } from "react-router-dom"

// rafce
const Layout = () => {
  return (
    <div>
        <NavLink to='/' className='btn btn-info'>Tasks</NavLink>
        <NavLink to='/users' className='btn btn-info'>Users</NavLink>
        <NavLink to='/comments' className='btn btn-info'>Comments</NavLink>
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout