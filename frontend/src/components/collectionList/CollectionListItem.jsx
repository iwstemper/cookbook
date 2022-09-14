import React from 'react'

function CollectionListItem({item, collectionType, collectionItemClick, mealPlanItemClick}) {
  return (
    <div className='collectionListItem' onClick={() => collectionType === 'collection' ? collectionItemClick(item) : mealPlanItemClick(item)} key={item._id}>
      <img src='' style={{backgroundColor: 'black'}} />
      <div className='collectionItem_content'>
          <p className='collectionItem_name'>{item.collectionName}</p>
          <div className='collectionItem_rightContent'>
              <div className='collectionItem_recipeCount'>
                  <p>{item.recipes?.length}</p>
                  <p>recipes</p>
              </div>
              <p>^</p>
          </div>
      </div>
  </div>
  )
}

export default CollectionListItem