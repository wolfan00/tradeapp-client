export default function Button({ text = "Text", onClick = () => {} ,className=""}) {
  return (
    <button 
      className={`bg-blue-600 hover:bg-blue-700 text-white 
      font-semibold py-2 px-4 rounded-xl transition-transform 
      duration-300 ease-in-out hover:scale-105 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
