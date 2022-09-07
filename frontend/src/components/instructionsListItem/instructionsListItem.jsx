import React from 'react'
import './instructionsListItem.scss'

function instructionsListItem({item, index, target}) {
  return (
    <div className='instructionsListItem'>
        <p><strong>{target === 'instructions' ? `${index + 1}.` : '•'}</strong></p>
        <p>{item}</p>
    </div>
  )
}

export default instructionsListItem