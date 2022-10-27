import React from "react";
import PostCardFromUser from "../postcard/postcardfromuser/PostCardFromUser";

export default function ProfileDetail({targetUser}){

    let narrowTarget = {}
    let snagTarget = (str) => {
        fetch("http://localhost:3000/get_target_user", {
            body: JSON.stringify(str),
        })
        .then((res) => res.json())
        .then((data) => console.log(data))}

    console.log(snagTarget(targetUser))

    return(
        <div>Profile Deet</div>
    )
}