import React, { useState } from "react";
import html2canvas from "html2canvas";
import { MouseDraw } from "../mousedraw/MouseDraw";

export default function PostImage({showPostImage,userposts,setUserPosts}){
    //set drawing functionality
    const [thickness, setThickness] = useState(1);
    const [lines, setLines] = useState([]);
    const [currentLine, setCurrentLine] = useState({ thickness, points: [] });
    const ThicknessButton = ({ onClick, value }) => {
        return <button onClick={() => onClick(value)}>{value}</button>;
    };
    //set new post object
    const [postObj, setPostObj] = useState({
        title: '',
        user: localStorage.getItem("jwt")
    })
    let createPost = (e) => {
        e.preventDefault();
        setPostObj({
            ...postObj,
            [e.target.name]: e.target.value,
        });
    };
    const PostPicture = (e) => {
        e.preventDefault();
        const input = document.getElementById("drawing");
        html2canvas(input)
        .then(canvas =>{
            const base64 = canvas.toDataURL("image/png");
            sessionStorage.setItem("post-image", base64);
        })
        .then(promise =>{
            const digipic = sessionStorage.getItem("post-image");
            let newObj = {
                image: digipic,
                title: postObj.title,
                user: postObj.user
            }
            fetch("http://localhost:3000/create_post",{
                    method: 'POST',
                    headers: {
                        token: localStorage.getItem('jwt'),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newObj),
                })
                .then(res=>res.json())
                .then(data=>setUserPosts([...userposts, data]))
        setLines([]);
        setCurrentLine({ thickness, points: [] })})
    };
    //canvas functionality
    const clearCanvas=(e)=>{
        setLines([]);
        setCurrentLine({ thickness, points: [] });
    }
    const SavePicture = (e) => {
        const input = document.getElementById("drawing");
        html2canvas(input)
        .then(canvas =>{
            const base64 = canvas.toDataURL("image/png");
            var anchor = document.createElement('a');
            anchor.setAttribute("href", base64);
            anchor.setAttribute("download", "post.png");
            anchor.click();
            anchor.remove();
        });
        setLines([]);
        setCurrentLine({ thickness, points: [] });
    };
    

    return(
        <>
            <div>Hello from PostImage</div>
            <button onClick={showPostImage}>Go Back to Feed</button>
            <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
            <h1>Click and drag to draw something</h1>
            <div>
                Thickness:{" "}
                {[1, 2, 3, 4].map((i) => (
                <ThicknessButton onClick={setThickness} value={i} key={i} />
                ))}
            </div>
            <div>
                <button onClick={clearCanvas}>X</button>
                <button onClick={SavePicture}>Save</button>
            </div>
            <div id="drawing">
                <svg width="900px" height="900px">
                <MouseDraw x={0} y={0} width={900} height={900} 
                    thickness={thickness} lines={lines} setLines={setLines} 
                    currentLine={currentLine} setCurrentLine={setCurrentLine} />
                </svg>
            </div>
            <form>
                <input name="title" type="text" placeholder="Title Your Post!" onChange={createPost}></input>
                <button onClick={PostPicture}>Post</button>
            </form>
        </div>
        </>
    )
}