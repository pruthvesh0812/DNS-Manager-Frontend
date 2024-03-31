import React from 'react'
import { buttonType } from '../../types/componentTypes'

export default function Button(props: buttonType) {
  return (
    <div>
      <button className='bg-orange-500 text-white px-2 py-1 rounded-sm ml-2 text-sm font-bold'>{props.text}</button>
    </div>
  )
}
