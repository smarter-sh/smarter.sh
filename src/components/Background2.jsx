const Background2 = () => {
  return (
    <div>
      <div className="fixed top-0 -z-10">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-red-600/40 to-pink-600/40 blur-[200px]" />
      </div>
      <div className="fixed end-0 top-0 -z-10">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-red-600/40 to-pink-600/40 blur-[200px]" />
      </div>
      <div className="fixed inset-0 -z-10 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-red-600/40 to-pink-600/40 blur-[200px]" />
      </div>
      <div className="fixed bottom-0 start-0 -z-10">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-red-600/40 to-pink-600/40 blur-[200px]" />
      </div>
      <div className="fixed bottom-0 end-0 -z-10">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-red-600/40 to-pink-600/40 blur-[200px]" />
      </div>
    </div>
  )
}
export default Background2
