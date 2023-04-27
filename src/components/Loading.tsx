import { InfinitySpin } from "react-loader-spinner"

function Loading() {
    return (
        <div className='fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-slate-500/[.8]'>
            <InfinitySpin
                width='200'
                color="#0000ff"
            />
        </div>
    )
}

export default Loading