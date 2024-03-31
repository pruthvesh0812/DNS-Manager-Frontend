import React from 'react'
import { textType } from '../../types/componentTypes'


export default function Title({ text }: textType) {
  return (
    <div>
      <h4 className='text-sm font-semibold'>{text}</h4>
    </div>
  )
}
