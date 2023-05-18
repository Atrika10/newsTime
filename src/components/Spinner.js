import React from 'react';
import loading from './spinner.gif'

export default function Spinner() {
  
    return (
      <div className='text-center'>
        <img style={{width : "4rem"}} src={loading} alt="loading..." />
      </div>
    )
  
}
