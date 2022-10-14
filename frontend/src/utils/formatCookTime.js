export function formatCookTime(recipe){
    const {prepTime, cookTime} = recipe

    let totalHrs = prepTime.hrs + cookTime.hrs
    let totalMins = prepTime.mins + cookTime.mins
    
    while (totalMins >= 60){
        totalMins -= 60
        totalHrs++
    }
    return {totalHrs: totalHrs, totalMins: totalMins}
}