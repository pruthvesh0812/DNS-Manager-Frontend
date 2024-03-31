


export default function Button({ text, callBack }: { text: string, callBack: (() => Promise<void>) | (() => void) }) {
  return (
    <div>
      <button
        onClick={callBack}
        className='bg-orange-500 text-white px-2 py-1 rounded ml-2 text-md font-bold '>
        {text}
      </button>
    </div>
  )
}
