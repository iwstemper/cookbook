import {useNavigate, useLocation} from 'react-router-dom'

function ExploreTile({data, navigate}) {

    let location = useLocation().pathname
    const nav = useNavigate()

    function navigate(url){
        nav(`${location}/${url}`)
    }

    return (
        <div className='explore_tile' onClick={() => navigate(data.url ? data.url : data)} style={{backgroundImage: data.img}}>
            <div className='explore_tileTitle'>
            <p>{data.name ? data.name : data}</p>
            </div>
        </div>
    )
}

export default ExploreTile