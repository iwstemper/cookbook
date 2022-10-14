import React, {useState, useEffect, createContext} from 'react'
import axios from 'axios'
import {useAuth0} from '@auth0/auth0-react'

const UserContext = createContext()

const UserContextProvider = ({children}) => {

    //Authentication
    const {user, isAuthenticated} = useAuth0()

    //Global state
    const [collections, setCollections] = useState([])
    const [shoppingList, setShoppingList] = useState([])
    const [mealPlans, setMealPlans] = useState([])
    const [favorites, setFavorites] = useState([])

    //Fetches user data once authenticated
    useEffect(() => {
        if (isAuthenticated){
            getShoppingList()
            getCollections()
            getMealPlans()
            getFavorites()
        }
        else{
            return
        }
    }, [isAuthenticated])

    //Sorts recipes
    function compare(a,b){
        if (a.recipeName < b.recipeName){
        return -1
        }
        if (a.recipeName > b.recipeName){
        return 1
        }
        return 0
    }

    //Retrieves user's shopping list
    function getShoppingList(){
        axios
        .get(`http://localhost:5010/shoppingList/${user.name}`)
        .then(res => {
        let obj = {...res.data}
        let list = [...obj.ingredients]
        list = list.sort(compare)
        obj.ingredients = list
        setShoppingList(list)
        })
        .catch(err => console.log(err))
    }

    //Retrieves user's collections
        function getCollections(){
        axios
        .get(`http://localhost:5010/collections/${user.name}`)
        .then(res => setCollections(res.data))
        .catch(err => console.log(err))
    }

    //Retrieves user's meal plans
    function getMealPlans(){
        axios
        .get(`http://localhost:5010/mealPlans/${user.name}`)
        .then(res => setMealPlans(res.data))
        .catch(err => console.log(err))
    }

    //Retrieves user's favorites
    function getFavorites(){
        axios
        .get(`http://localhost:5010/favorites/${user.name}`)
        .then(res => setFavorites(res.data))
        .catch(err => console.log(err))
    }

      //Updates shoppingList state after server update
    function updateShoppingList(operation, ingredient, recipe){
        axios
        .put(`http://localhost:5010/shoppingList/${user.email}`, {inputs: {recipe: recipe, operation: operation, ingredient: ingredient}})
        .then(() => getShoppingList())
        .catch(err => console.log(err))
    }

    
    return(
        <UserContext.Provider value={{collections, favorites, mealPlans, shoppingList, getCollections, getShoppingList, getMealPlans, getFavorites, updateShoppingList}}>
            {children}
        </UserContext.Provider>
    )

}

export {UserContext, UserContextProvider}