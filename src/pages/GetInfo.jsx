export default function GetInfo(){
    const meta = import.meta.env.VITE_SERVER
    return(
        <>
        <div className="absolute bg-gray-500 opacity-30 w-[100vw] h-[100vh] top-0 left-0">

        </div>
        <div className="h-[80vh] m-0 p-0 flex justify-center items-center">
            <p className="bg-green-500 transition-all hover:bg-green-600 z-10 hover:scale-150 hover:shadow-2xl hover:rounded-3xl duration-300">{meta}</p>
        </div>
        </>
    )

}