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
        <div className='page_content'>
            <div className='searchPage_input' style={{top: ingredientsSearch.length > 0 ? '-50rem' : 0}}>
                <input type='search' name='searchInput' id='searchPage_input' value={searchInput} onChange={e => setSearchInput(e.target.value)} 
                    placeholder='Search for Recipes' />
                    <SearchIcon width='8%' fill='gray' style={{marginRight: '1rem'}} onClick={() => focusOrSearch()}/>
            </div>
            <div className='searchPage_ingredients'>
                <h4>Recommended Ingredients</h4>
                <div className='searchPage_ingredientsList'>
                    {ingredients.map((item, index) => {

                        if (ingredientsSearch.find(ingredient => ingredient === item)){
                            return(
                                <div key={index} className='searchPage_ingredientsItem' onClick={() => updateIngredientsSearch('remove', item)} style={{backgroundColor: 'orange'}}>
                                    <p>{item}</p>
                                </div>
                            )
                        }
                        else {
                            return(
                                <div key={index} className='searchPage_ingredientsItem' onClick={() => updateIngredientsSearch('add', item)} style={{backgroundColor: 'green'}}>
                                    <p>{item}</p>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <button onClick={() => goToSearch('ingredients', ingredientsSearch)} style={{bottom: ingredientsSearch.length > 0 ? '33%' : '-5%', position: 'absolute', transition: '1s', margin: 'auto'}}>nav</button>
            
        </div>
    )
}

export default SearchPage