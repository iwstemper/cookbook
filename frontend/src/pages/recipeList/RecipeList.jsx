import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import RecipeListItem from '../../components/recipeListItem/RecipeListItem'
import RenameModal from '../../components/modal/RenameModal'
import './recipeList.scss'
import {NextIcon, Ellipses} from '../../assets/images'
import axios from 'axios'

function RecipeList({recipeList, listType, shoppingList, updateShoppingList, getCollections, getMealPlans}) {

  const [isActive, setIsActive] = useState(recipeList.map(() => {return false}))
  const [ellipses, setEllipses] = useState(recipeList.map(() => {return false}))
  const [modal, setModal] = useState({active: false})

  useEffect(() => {
    let list = []
    recipeList.forEach(() => list.push(false))
    setIsActive(list)
    setEllipses(list)
  }, [])

  function updateActiveCollection(e,index){
    if (e.target.className !== 'recipeList_ellipsesMenuItem' && e.target.className.baseVal !== 'recipeList_ellipses' && e.target.className.baseVal !== 'dots'){
      let list = isActive.map((bool, activeIndex) => {
        if (index === activeIndex){
          return !bool
        }
        return bool
      })
      setIsActive(list)
    }
  }

  //Opens ellipses alongside recipe list item
  function updateEllipses(index){
    let list = ellipses.map((bool, activeIndex) => {
      if (index === activeIndex){
        return !bool
      }
      return bool
    })
    setEllipses(list)
  }

  //Closes ellipses if anywhere besides the ellipses is clicked
  function closeEllipses(e){
      if (!(e.target.className.baseVal === 'recipeList_ellipses' || e.target.className.baseVal === 'dots')){
        setEllipses(recipeList.map(() => {return false}))
      }
  }

  function renameList(id, name){
    if (listType === 'Collection'){
      axios
      .put(`http://localhost:5010/collections/${id}`, {inputs: {operation: 'rename', name: name}})
      .then(res => console.log(res))
      .then(() => getCollections())
      .catch(err => console.log(err))
    }
    else if (listType === 'Meal Plan'){
      axios
      .put(`http://localhost:5010/mealPlans/${id}`, {inputs: {operation: 'rename', name: name}})
      .then(res => console.log(res))
      .then(() => getMealPlans())
      .catch(err => console.log(err))
    }
  }

  function removeList(id){
    if (listType === 'Collection'){
      axios
      .delete(`http://localhost:5010/collections/${id}`)
      .then(res => console.log(res))
      .then(() => getCollections())
      .catch(err => console.log(err))
    }
    else if (listType === 'Meal Plan'){
      axios
      .delete(`http://localhost:5010/mealPlans/${id}`)
      .then(res => console.log(res))
      .then(() => getMealPlans())
      .catch(err => console.log(err))
    }
  }

  const recipeListIems = recipeList?.map((collection, index) => {
    let image = collection.recipes[0]?.recipe.imageURL || 'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image-300x225.png'
      
    return(
        <div className='recipeList' key={collection._id} >
          <div className='collectionListItem' key={collection._id} onClick={e => updateActiveCollection(e, index)} >
            <img src={image} />
            <div >
            <Ellipses className='recipeList_ellipses'onClick={() => updateEllipses(index)}  />
            </div>
            {
              ellipses[index] &&
              <div className='recipeList_ellipsesMenu'>
                <div className='recipeList_ellipsesMenuItem' onClick={() => setModal({active: true, modalType: 'rename', collection: collection})}>Rename {listType}</div>
                <div className='recipeList_ellipsesMenuItem' onClick={() => removeList(collection._id)}>Delete {listType}</div>
              </div>
            }
            <div className='collectionItem_content'>
                <p className='collectionItem_name'>{collection.collectionName ? collection.collectionName : collection.mealPlanName}</p>
                <div className='collectionItem_rightContent'>
                    <div className='collectionItem_recipeCount'>
                        <p>{collection.recipes?.length}</p>
                        <p>recipes</p>
                    </div>
                    <NextIcon className={isActive[index] ? 'recipeList_arrow recipeList_arrow-selected' : 'recipeList_arrow'} />
                </div>
            </div>
          </div>
          <div className={isActive[index] ? 'recipeList_items recipeList_items-active' : 'recipeList_items recipeList_items-hidden'}>
            {collection.recipes.length === 0 &&
                  <div className='recipeList-empty'>
                    <p>This {listType} is empty</p>
                    <Link to='/explore' className='recipeList_exploreLink'>
                      <button>Add recipes now!</button>
                    </Link>
                  </div>
            }
            {collection.recipes.length > 0 &&
              collection.recipes.map(recipe => {
                return(
                    <RecipeListItem collectionID={collection._id} recipe={recipe.recipe} key={recipe._id} listType={listType} getCollections={getCollections} getMealPlans={getMealPlans} shoppingList={shoppingList} updateShoppingList={updateShoppingList} />
                )
              })
            }
            
          </div>
        </div>
      )
  })

  return (
    <div onClick={e => closeEllipses(e)}>
      <RenameModal modal={modal} setModal={setModal} modalFunction={renameList} />
        {recipeListIems}
    </div>
  )
}

export default RecipeList