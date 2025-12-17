

import React from 'react';
import "./StarRating.css";

function StarRating({rating , count}) {

    const totalStars = 5;

    return (
        <div className='star-rating'>

            {[...Array(totalStars)].map((_,index) => {
                const starValue = index+1;

                if(rating >= starValue){
                    return (<span key={index} className='star filled'>★</span>);
                }
                else if(rating >= starValue-0.5){
                    return (<span key={index} className='star half'>★</span>);
                }
                else{
                    return (<span key={index} className='star empty'>★</span>);
                }
                
            })}
            <span className='rating-count'>{count} Reviews</span>


        </div>
    )
}

export default StarRating;