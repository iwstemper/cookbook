import {useState, useEffect} from 'react'
import './searchPage.scss'
import {useNavigate} from 'react-router-dom'
import {SearchIcon} from '../../assets/images'
import axios from 'axios'
import {RowSkeleton} from '../../components'

function SearchPage(){

    const [searchInput, setSearchInput] = useState('')
    const [ingredientsSearch, setIngredientsSearch] = useState([])
    const [ingredients, setIngredients] = useState([])

    const navigator = useNavigate()

    function goToSearch(parameter, input){
        navigator(`/search/${parameter}=${input}`)
    }


    function getPopularIngredients(){
        axios
        .get('http://localhost:5010/categories/popular/ingredients')
        .then(res => setIngredients(res.data))
        .catch(err => console.log(err))
    }

    useEffect(getPopularIngredients, [])

    const updateIngredientsSearch = (operation, item) => {
        switch (operation) {
            case 'add':
                setIngredientsSearch(prev => {return [...prev, item]})
                break;
            case 'remove': 
                let list = ingredientsSearch.filter(ingredient => ingredient !== item)
                setIngredientsSearch(list)
        }
    }

    const focusOrSearch = () => {
        !searchInput ? document.getElementById('searchPage_input').focus() : goToSearch('search', searchInput)
    }


    return(
        <div className='searchPage'>
            <div className='searchPage_input' style={{top: ingredientsSearch.length > 0 ? '-50rem' : 0}}>
                <input type='search' name='searchInput' id='searchPage_input' value={searchInput} onChange={e => setSearchInput(e.target.value)} 
                    placeholder='Search for Recipes' />
                <SearchIcon className='searchPage_searchIcon' fill='gray' onClick={() => focusOrSearch()}/>
            </div>
            <div className='searchPage_ingredients'>
                <h3>Recommended Ingredients</h3>
                <div className='searchPage_ingredientsList'>
                    {ingredients && ingredients.map((item, index) => {

                        if (ingredientsSearch.find(ingredient => ingredient === item._id)){
                            return(
                                <div key={index} className='searchPage_ingredientsItem searchPage_ingredientsItem-selected' onClick={() => updateIngredientsSearch('remove', item._id)} >
                                    <p>{item._id}</p>
                                </div>
                            )
                        }
                        else {
                            return(
                                <div key={index} className='searchPage_ingredientsItem' onClick={() => updateIngredientsSearch('add', item._id)}>
                                    <p>{item._id}</p>
                                </div>
                            )
                        }
                    })}
                    {ingredients.length === 0 && Array(12).fill().map(() => {
                        return(
                            <RowSkeleton height={'3rem'} width={'45%'}  />
                        )
                    })}
                </div>
            </div>
            <div className='ingredientsButton'>
                <button onClick={() => goToSearch('ingredients', ingredientsSearch)} className={ingredientsSearch.length > 0 ? 'searchIngredientsButton searchIngredientsButton-active' : 'searchIngredientsButton'}>Search Ingredients</button>
            </div>
            
        </div>
    )
}

export default SearchPage