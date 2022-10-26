import React, {useState} from "react";

export default function HeartSpan({user,post,likes,heartBeat,setHeartBeat}){

    const heartchecker = (arr) => {
        let arrCount=[]
        arr.map(el=>{
            arrCount.push(el.user_id)
        })
        if (arrCount.includes(user.id)) {
            setHeartBeat(true)
        }
    }
    
    heartchecker(likes)


    return(
        <>
        {heartBeat ? 
        <span className="buy">❤️</span>
        :
        <span className="buy">♡</span>}
        </>
    )

}