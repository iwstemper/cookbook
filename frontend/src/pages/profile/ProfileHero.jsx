import { useState } from "react";
import './profile.scss'

export default function ProfileHero({user}){


    return(
        <div className='profile_userHero'>
            <img src={user.picture} />
            <p className='profile_userHeroField'>{user.first_name + " " + user.last_name}</p>
            <p className='profile_userHeroField'>Member since {user.updated_at}</p>
            <button className='profile_userHeroEdit'>Edit Profile</button>
            <div className='profile_userHeroStats'>
                <div className='profile_userHeroStat'>
                    <p className='profile_userHeroStatNumber'>0</p>
                    <p className='profile_userHeroStatLabel'>made</p>
                </div>
                <div className='profile_userHeroStat'>
                    <p className='profile_userHeroStatNumber'>0</p>
                    <p className='profile_userHeroStatLabel'>created</p>
                </div>
                <div className='profile_userHeroStat'>
                    <p className='profile_userHeroStatNumber'>0</p>
                    <p className='profile_userHeroStatLabel'>planned</p>
                </div>
            </div>
        </div>
    )
}