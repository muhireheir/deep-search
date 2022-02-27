import React from 'react'


function Results({data}) {
  return (
    <div>
       <p style={{color:'green'}}>{data.message}</p>
       {data.noMatch && <p style={{color:'red'}}>{data.html}</p>}
       {!data.noMatch &&<div>
         <div dangerouslySetInnerHTML={{__html:data.html}}></div>
       </div>}
    </div>
  )
}

export default Results