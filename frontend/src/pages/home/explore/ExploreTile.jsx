import {useNavigate} from 'react-router-dom'

function ExploreTile({data, navigate}) {

    const nav = useNavigate()
    function navigate(url){
        nav(`/explore/${url}`)
    }

    return (
        <div className='explore_tile' onClick={() => navigate(data.url)} style={{backgroundImage: data.img}}>
            <div className='explore_tileTitle'>
            <p>{data.name}</p>
            </div>
        </div>
    )
}

export default ExploreTile