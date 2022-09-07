import axios from "axios";
import { useState, useEffect } from "react";
import './collectionList.scss'
import { SearchIcon } from "../../assets/images";

export default function CollectionList({user, recipe, parentRequest, popup, setPopup}){

    const [collections, setCollections] = useState()
    const [searchInput, setSearchInput] = useState('')

    function getCollections(){
        axios
        .get(`http://localhost:5010/collections/user/${user.email}`)
        .then(res => {setCollections(res.data)})
        .catch(err => console.log(err))
    }

    function collectionItemClick(item){
        if (parentRequest === 'addToCollection'){
            addToCollection(item._id)
        }
    }

    function addToCollection(id){
        axios
        .put(`http://localhost:5010/collections/${id}`, {inputs: recipe})
        .then(res => console.log(res))
        .then(() => setPopup(!popup))
    }

    function saveCollection(){
        axios
        .post('http://localhost:5010/collections', {inputs: collection})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    useEffect(getCollections, [user])

    const collectionRow = collections?.filter(col => col.collectionName.toLowerCase().includes(searchInput.toLowerCase())).map((item, index) => {
        return(
                <div className='collectionListItem' onClick={() => collectionItemClick(item)} key={item._id}>
                    <img src='' style={{backgroundColor: 'black'}} />
                    <div className='collectionItem_content'>
                        <p className='collectionItem_name'>{item.collectionName}</p>
                        <div className='collectionItem_rightContent'>
                            <div className='collectionItem_recipeCount'>
                                <p>{item.recipes.length}</p>
                                <p>recipes</p>
                            </div>
                            <p>^</p>
                        </div>

                    </div>
                </div>
        )
    })
    

    return(
        <div className='profile_collectionList'>
            <div className='profile_collectionListHeader'>
                <div className='profile_collectionSearchInput'>
                    <SearchIcon height='100%' className='profile_collectionSearch'/>
                    <input name='searchInput' id='collection_searchInput' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                </div>
                <div className='profile_collectionHeaderRightContent' onClick={() => getCollections()}>
                    <p>+ New Collection</p>
                </div>
            </div>
            {collectionRow}
        </div>
    )
}