import axios from "axios";
import { useState, useEffect } from "react";
import './collectionList.scss'
import { SearchIcon } from "../../assets/images";
import {CollectionListItem} from './CollectionListItem'

export default function CollectionList({user, collections, getCollections, recipe, parentRequest, popup, setPopup, getMealPlans, mealPlans}){


    const [searchInput, setSearchInput] = useState('')

    //VIEW COLLECTION PARENT REQUEST//////////////////////////////
    function collectionItemClick(item){
        if (parentRequest === 'add'){
            addToCollection(item._id)
        }
        else if (parentRequest === 'viewCollection'){

        }
    }
        //VIEW COLLECTION PARENT REQUEST//////////////////////////////
        function mealPlanItemClick(item){
            if (parentRequest === 'add'){
                addToMealPlan(item._id)
            }
            else if (parentRequest === 'viewCollection'){
    
            }
        }

    function addToCollection(id){
        axios
        .put(`http://localhost:5010/collections/${id}`, {inputs: {recipe: recipe, operation: 'add'}})
        .then(() => getCollections())
        .then(() => setPopup(prev => {return {...prev, active: !popup.active}}))
        .catch(err => console.log(err))
    }
    function addCollection(){
        let name = window.prompt()
        axios
        .post(`http://localhost:5010/collections/${user.email}`, {inputs: name})
        .then(() => getCollections())
        .catch(err => console.log(err))
    }
    function removeCollection(id){
        axios
        .delete(`http://localhost:5010/collections/${id}`)
        .then(() => getCollections())
        .catch(err => console.log(err))
    }

    function addToMealPlan(id){
        axios
        .put(`http://localhost:5010/mealPlans/${id}`, {inputs: {recipe: recipe, operation: 'add'}})
        .then(() => getMealPlans())
        .then(() => setPopup(prev => {return {...prev, active: !popup.active}}))
        .catch(err => console.log(err))
    }
    function addMealPlan(){
        let name = window.prompt()
        axios
        .post(`http://localhost:5010/mealPlans/${user.email}`, {inputs: name})
        .then(() => getMealPlans())
        .then(() => setPopup(prev => {return {...prev, active: !popup.active}}))
        .catch(err => console.log(err))
    }
    function removeMealPlan(id){
        axios
        .delete(`http://localhost:5010/mealPlans/${id}`)
        .then(() => getCollections())
        .catch(err => console.log(err))
    }

    let collectionRow = collections?.filter(col => col.collectionName.toLowerCase().includes(searchInput.toLowerCase())).map((item, index) => {
            return(
                    <CollectionListItem item={item} collectionType={'collection'} collectionItemClick={collectionItemClick}/>
            )
        })   

    let mealPlanRow = mealPlans?.filter(mealPlan => mealPlan.mealPlanName.toLowerCase().includes(searchInput.toLowerCase())).map((item, index) => {
        return(
            <CollectionListItem item={item} collectionType={'mealPlan'} mealPlanItemClick={mealPlanItemClick}/>
        )
    })
    
    if (popup.popupContent === 'collections' || !popup.popupContent){
        return(
            <div className='profile_collectionList'>
                <div className='profile_collectionListHeader'>
                    <div className='profile_collectionSearchInput'>
                        <SearchIcon height='100%' className='profile_collectionSearch'/>
                        <input name='searchInput' id='collection_searchInput' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                    </div>
                    <div className='profile_collectionHeaderRightContent' onClick={() => addCollection()}>
                        <p>+ New Collection</p>
                    </div>
                </div>
                {collectionRow}
            </div>
        )
    }
    else if (popup.popupContent === 'mealPlans'){
        return(
            <div className='profile_collectionList'>
                <div className='profile_collectionListHeader'>
                    <div className='profile_collectionSearchInput'>
                        <SearchIcon height='100%' className='profile_collectionSearch'/>
                        <input name='searchInput' id='collection_searchInput' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                    </div>
                    <div className='profile_collectionHeaderRightContent' onClick={() => addMealPlan()}>
                        <p>+ New Meal Plan</p>
                    </div>
                </div>
                {mealPlanRow}
            </div>
        )
    }
}