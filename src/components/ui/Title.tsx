
import { textType } from '../../types/componentTypes'


export default function Title({ text }: textType) {
  return (
    <div>
      <h4 className='text-xl font-normal'>{text}</h4>
    </div>
  )
}
