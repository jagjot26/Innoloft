import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'

function Base({ children }) {
  const config = useSelector((state) => state.config.data)
  const mainColor = config?.mainColor

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-screen min-h-0">
        {/* <!-- Navbar --> */}
        <div className={`w-full navbar`} style={{ backgroundColor: mainColor }}>
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="h-12 w-12 ml-6">
            <img src={config?.logo} alt="logo" className="object-cover" />
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar fixed={true} />
          <div className="pl-5 w-full h-full">{children}</div>
        </div>
      </div>
      <Sidebar fixed={false} />
    </div>
  )
}

export default Base
