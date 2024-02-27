function InfiniteList(){
    return(
        <div className='flex flex-row  p-5 justify-center  text-white items-center animate-pulse'>
              <div className='flex items-center bg-slate-300 text-black p-4 rounded-lg w-[26rem] animate-pulse'>
                <div className='p-2 animate-pulse'>
                  <div className='w-28 h-28 flex align-middle justify-center rounded-xl bg-slate-500' src="" alt="user profile" ></div>
                </div>
                <div className='flex flex-col text-white space-y-4'>
                  <h1 className='h-4 w-40 bg-slate-500'>
                    
                  </h1>
                  <h1 className='h-4 w-20 bg-slate-500'>

                  </h1>
                </div>
              </div>
            </div>
    )
}

export default InfiniteList