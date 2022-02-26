import React from 'react'


function Results({data}) {
  return (
    <div>
        <h4>{JSON.stringify(data)}</h4>
    </div>
  )
}

export default Results