import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className="col-12 text-center">
      <ClipLoader
        color="#ffffff"
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Loading
