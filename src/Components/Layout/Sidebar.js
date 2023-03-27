import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const sidebarLinks = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/product',
    label: 'View Product',
  },
  {
    path: '/product/edit',
    label: 'Edit Product',
  },
]

function Sidebar({ fixed }) {
  const config = useSelector((state) => state.config.data)
  const outerClass = fixed ? 'max-md:hidden lg:block' : 'drawer-side'
  const [activePath, setActivePath] = useState(window.location.pathname)

  return (
    <div className={outerClass}>
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <ul className="menu p-4 w-64 bg-base-100">
        {sidebarLinks.map((link) => (
          <li key={link.label}>
            <Link
              onClick={() => {
                setActivePath(link.path)
                if (!fixed) document.getElementById('my-drawer-3').click()
              }}
              to={link.path}
              className={activePath === link.path ? 'active' : ''}
              style={{
                backgroundColor: activePath === link.path ? config?.mainColor : 'white',
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
