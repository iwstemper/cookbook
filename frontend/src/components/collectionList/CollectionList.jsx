import axios from "axios";
import { useState, useEffect } from "react";
import './collectionList.scss'
import { SearchIcon, CrossIcon } from "../../assets/images";
import CollectionListItem from "./CollectionListItem";
import DialogueModal from "../modal/DialogueModal";
import ActionModal from "../modal/ActionModal";

export default function CollectionList({listDisplay, user, collections, getCollections, recipe, parentRequest, popup, setPopup, getMealPlans, mealPlans}){


    const [searchInput, setSearchInput] = useState('')
    const [dialogueModal, setDialogueModal] = useState({active: false, modalText: ''})
    const [actionModal, setActionModal] = useState({active: false})

    //Checks collection or meal plan for recipe before adding
    function checkForDuplicateAddition(collectionType, item){
        switch (collectionType){
            case 'collection':
                return collections.find(collection => collection._id === item._id).recipes.find(rec => rec.recipe._id === recipe._id)
            case 'mealPlan':
                return mealPlans.find(mealPlan => mealPlan._id === item._id).recipes.find(rec => rec.recipe._id === recipe._id)
        }
    }

    function collectionItemClick(item){
            if (checkForDuplicateAddition('collection', item)){
                setDialogueModal({active: true, modalText: 'Recipe already in collection'})
                setTimeout(() => {
                    setDialogueModal({active: false})
                }, 1000);
            }
            else{
                addToCollection(item._id)
            }
    }

    function mealPlanItemClick(item){
            if (checkForDuplicateAddition('mealPlan', item)){
                setDialogueModal({active: true, modalText: 'Recipe already in meal plan'})
                setTimeout(() => {
                    setDialogueModal({active: false, modalText: ''})
                }, 1000)
            }
            else{
                addToMealPlan(item._id)
            }
        }

    function addToCollection(id){
        axios
        .put(`http://localhost:5010/collections/${id}`, {inputs: {recipe: recipe, operation: 'add'}})
        .then(() => getCollections())
        .then(() => {
            setDialogueModal({active: true, modalText: 'Recipe added to collection'})
                setTimeout(() => {
                    setDialogueModal({active: false})
                    setPopup(prev => {return {...prev, active: !popup.active}})
                }, 1500);
        })
        .catch(err => console.log(err))
    }
    function addCollection(name){
        axios
        .post(`http://localhost:5010/collections/${user.email}`, {inputs: name})
        .then(() => getCollections())
        .then(() => {
            setDialogueModal({active: true, modalText: 'Collection created'})
            setTimeout(() => {
                setDialogueModal({active: false})
            }, 1500);
        })
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
        .then(() => {
            setDialogueModal({active: true, modalText: 'Recipe added to meal plan'})
                setTimeout(() => {
                    setDialogueModal({active: false})
                    setPopup(prev => {return {...prev, active: !popup.active}})
                }, 1500);
        })
        .catch(err => console.log(err))
    }
    function addMealPlan(name){
        axios
        .post(`http://localhost:5010/mealPlans/${user.email}`, {inputs: name})
        .then(() => getMealPlans())
        .then(() => {
            setDialogueModal({active: true, modalText: 'Meal plan created'})
            setTimeout(() => {
                setDialogueModal({active: false})
            }, 1500);
        })
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
            <CollectionListItem item={item} key={item._id} collectionType={'collection'} collectionItemClick={collectionItemClick}/>
        )
    })   

    let mealPlanRow = mealPlans?.filter(mealPlan => mealPlan.mealPlanName.toLowerCase().includes(searchInput.toLowerCase())).map((item, index) => {
        return(
            <CollectionListItem item={item} key={item._id} collectionType={'mealPlan'} mealPlanItemClick={mealPlanItemClick}/>
        )
    })
    
    if (listDisplay === 'popup'){
        if (popup.popupContent === 'Meal Plan'){
            return(
                <div className='collectionList_popup' onClick={e => e.target.className === 'collectionList_popup' ? setPopup({active: false}) : null}>
                    <div className='popupMenu'>
                        <div className='collectionList'>
                            <DialogueModal modal={dialogueModal} setModal={setDialogueModal} />
                            <ActionModal modal={actionModal} setModal={setActionModal} modalFunction={addMealPlan} modalType={'Meal plan'}/>
                            <div className='collectionList_header'>
                                <div className='collectionList_searchInput'>
                                    <CrossIcon className='popup_closeIcon' onClick={() => setPopup({active: !popup.active, popupContent: popup.popupContent})} />
                                    <SearchIcon height='100%' className='collectionList_searchIcon' onClick={() => document.getElementById('collectionList_searchInput').focus()}/>
                                    <input name='searchInput' id='collectionList_searchInput' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                                </div>
                                <div className='collectionList_headerRightContent'>
                                    <p  onClick={() => setActionModal({active: true})}>+ New Meal Plan</p>
                                </div>
                            </div>
                            <div className='collectionList_rows'>
                                {mealPlanRow}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if (popup.popupContent === 'Collection'){
            return(
                <div className='collectionList_popup' onClick={e => e.target.className === 'collectionList_popup' ? setPopup({active: false}) : null}>
                    <div className='popupMenu'>
                        <div className='collectionList'>
                            <DialogueModal modal={dialogueModal} setModal={setDialogueModal} />
                            <ActionModal modal={actionModal} setModal={setActionModal} modalFunction={addCollection} modalType={'Collection'} />
                            <div className='collectionList_header'>
                                <div className='collectionList_searchInput'>
                                    <CrossIcon className='popup_closeIcon' onClick={() => setPopup({active: !popup.active, popupContent: popup.popupContent})} />
                                    <SearchIcon height='100%' className='collectionList_searchIcon' onClick={() => document.getElementById('collectionList_searchInput').focus()}/>
                                    <input name='searchInput' id='collectionList_searchInput' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                                </div>
                                <div className='collectionList_headerRightContent' >
                                    <p onClick={() => setActionModal({active: true})}>+ New Collection</p>
                                </div>
                            </div>
                            <div className='collectionList_rows'>
                                {collectionRow}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    if (popup.popupContent === 'collections' || !popup.popupContent){
        return(
            <div className='collectionList'>
                <DialogueModal modal={dialogueModal} setModal={setDialogueModal} />
                <ActionModal modal={actionModal} setModal={setActionModal} modalFunction={addCollection} modalType={'Collection'} />
                <div className='collectionList_header'>
                    <div className='collectionList_searchInput'>
                        <SearchIcon height='100%' className='collectionList_searchIcon' onClick={() => document.getElementById('collectionList_searchInput').focus()}/>
                        <input name='searchInput' id='collectionList_searchInput' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                    </div>
                    <div className='collectionList_headerRightContent' onClick={() => setActionModal({active: true})}>
                        <p>+ New Collection</p>
                    </div>
                </div>
                <div className='collectionList_rows'>
                    {collectionRow}
                </div>
            </div>
        )
    }
    else if (popup.popupContent === 'mealPlans'){
        return(
            <div className='collectionList'>
                <DialogueModal modal={dialogueModal} setModal={setDialogueModal} />
                <ActionModal modal={actionModal} setModal={setActionModal} modalFunction={addMealPlan} modalType={'Meal plan'}/>
                <div className='collectionList_header'>
                    <div className='collectionList_searchInput'>
                        <SearchIcon height='100%' className='collectionList_searchIcon' onClick={() => document.getElementById('collectionList_searchInput').focus()}/>
                        <input name='searchInput' id='collectionList_searchInput' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                    </div>
                    <div className='collectionList_headerRightContent' onClick={() => setActionModal({active: true})}>
                        <p>+ New Meal Plan</p>
                    </div>
                </div>
                <div className='collectionList_rows'>
                    {mealPlanRow}
                </div>
            </div>
        )
    }
}