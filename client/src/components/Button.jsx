import React from 'react'
import '../Styles/button.css'
import {BiSolidChevronRight} from 'react-icons/bi'

const RedButton = ({text, btnVisibility}) => {
  return (
    <button className='buttonComp'>
        {text}<i><BiSolidChevronRight size={"1.1rem"} /></i>
    </button>
  )
}

export default RedButton