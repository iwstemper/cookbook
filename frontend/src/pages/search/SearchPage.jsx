import {useState} from 'react'
import './searchPage.scss'
import {useNavigate} from 'react-router-dom'
import {SearchIcon} from '../../assets/images'

function SearchPage(){

    const [searchInput, setSearchInput] = useState('')
    const [displaySearch, setDisplaySearch] = useState(true)
    const [ingredientsSearch, setIngredientsSearch] = useState([])
    const ingredients = ['Turtle', 'beef', 'pig']

    const navigator = useNavigate()

    function goToSearch(parameter, input){
        navigator(`/search/${parameter}=${input}`)
    }

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
                    <SearchIcon width='8%' fill='gray' style={{marginRight: '1rem'}} onClick={() => focusOrSearch()}/>
            </div>
            <div className='searchPage_ingredients'>
                <h3>Recommended Ingredients</h3>
                <div className='searchPage_ingredientsList'>
                    {ingredients.map((item, index) => {

                        if (ingredientsSearch.find(ingredient => ingredient === item)){
                            return(
                                <div key={index} className='searchPage_ingredientsItem searchPage_ingredientsItem-selected' onClick={() => updateIngredientsSearch('remove', item)} >
                                    <p>{item}</p>
                                </div>
                            )
                        }
                        else {
                            return(
                                <div key={index} className='searchPage_ingredientsItem' onClick={() => updateIngredientsSearch('add', item)}>
                                    <p>{item}</p>
                                </div>
                            )
                        }
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