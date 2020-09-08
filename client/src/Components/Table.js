import React from 'react'
import './Table.css'

function Table({countries}) {
  return (
    <div className="table">
      {countries.map(country=>(
        <tr>
          <td></td>
          
          
          <td></td>
        </tr>
      ))}
      
    </div>
  )
}

export default Table
