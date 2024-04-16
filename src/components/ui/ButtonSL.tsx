


export default function ButtonSL({ text, callBack }: { text: string, callBack: (() => Promise<void>) | (() => void) }) {
    return (
      <div className="w-full rounded">
        <button
          onClick={callBack}
          className='bg-orange-500 text-white px-4 py-2 rounded text-md font-bold w-full '>
          {text}
        </button>
      </div>
    )
  }
  