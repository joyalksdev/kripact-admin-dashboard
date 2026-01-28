import React, { useState, useRef, useEffect } from 'react'
import { HiOutlinePlus } from 'react-icons/hi2'
import { NavLink } from 'react-router-dom'

const DropDownProfile = () => {

  const [openDropdown, setOpenDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])



  return (
    <div className="relative" ref={dropdownRef}>
      
    <button className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 transition px-3 py-1.5 rounded-lg text-sm text-white"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <HiOutlinePlus />
        New
      </button>


      
      {openDropdown && (
        <div className="absolute right-0 mt-3 w-36 bg-neutral-900 border border-neutral-700 rounded-xl shadow-xl overflow-hidden">
         <ul className='p-2 flex flex-col items-center'>
          <h2 className='cursor-pointer hover:bg-neutral-800 w-full px-3 py-2 rounded-lg'>Admission</h2>
          <h2 className='cursor-pointer hover:bg-neutral-800 w-full px-3 py-2 rounded-lg'>Task</h2>
          <h2 className='cursor-pointer hover:bg-neutral-800 w-full px-3 py-2 rounded-lg'>Appointment</h2>
         </ul>
        </div>
      )}
    </div>
  )
}

export default DropDownProfile
