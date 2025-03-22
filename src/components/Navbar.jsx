import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-900 text-white px-2 py-4 items-center'>
      <div className='logo'>
        <span className='font-bold text-xl mx-7'>iTask</span>
      </div>
        <ul className="flex justify-between mx-4 gap-x-2.5 min-w-37.5">
          <li className='cursor-pointer hover:font-semibold transition-all duration-200'>Home</li>
          <li className='cursor-pointer hover:font-semibold transition-all duration-200'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
