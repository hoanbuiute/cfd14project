import React from 'react'
import { useMainContext } from '../Context/MainContext'

const Overplay = () => {
  const  {handleShowNavbar} = useMainContext() 
  return (
    <div>
          <div className="overlay" onClick={()=> handleShowNavbar(false) } />
    </div>
  )
}

export default Overplay