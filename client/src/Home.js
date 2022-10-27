import React, { useState } from "react";
import './index.css'
import Feed from './components/Feed.jsx'
import SignUp from "./components/signup/SignUp";
import ProfileDetail from "./components/profiledetail/ProfileDetail";

function App() {
  //set user, userPosts and form state's for login and localUser functionality
  const [user, setUser] = useState({ id:'', username: ""});
  const [form, setForm] = useState ({});
  const [userposts, setUserPosts] = useState([])
  const [followingPosts, setFollowingPosts] = useState([])
  const [discoverBin, setDiscoverBin] = useState([])
  const [usersSelfFollows, setUsersSelfFollows] = useState([])
  //set state to navigate to SignUp
  const [showSignUp, setShowSignUp] = useState(false)
  //set state for/and allow navigation to single users page(not self)
  const [userDeets, setUserDeets] = useState(false)
  const [targetUser, setTargetUser] = useState({})
  const handleDeetsClick = (e) => [
    setUserDeets(prevState=>!prevState),
    setTargetUser(e.target.value)
]
  //Log In User, establish user, userPosts, followed accounts user_not_followed locally
  let handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
    .then((res) => res.json())
    .then((data) => {
      if(data["user"]){
        localStorage.setItem("jwt", data.token);
        setUser({
          username: data.user.username
        });
      }else{
        alert(data["error"])
      }
    })
    .then(promise=>{
      let token = localStorage.getItem("jwt")
      if (token && !user.username) {
        fetch("http://localhost:3000/profile", {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.json())
        .then ((data) => {
          setUser({
            id:data.id,
            username:data.username,
          });
        });
        //set users posts
        fetch("http://localhost:3000/user_posts", {
          headers: {
          token: token,
          "Content-Type": "application/json",
        },
        })
        .then(res => res.json())
        .then (data => setUserPosts(data));
        //set followings posts
        fetch("http://localhost:3000/followings_posts", {
          headers: {
          token: token,
          "Content-Type": "application/json",
        },
        })
        .then(res => res.json())
        .then (data => setFollowingPosts(data));
        //set users to follow in discover bin
        fetch('http://localhost:3000/discover_bin_users', {
          headers: {
              token: token,
        },
        })
        .then((res) => res.json())
        .then ((data) => setDiscoverBin(data));
        //set users to follow in discover bin
        fetch('http://localhost:3000/users_self_follows', {
          headers: {
              token: token,
        },
        })
        .then((res) => res.json())
        .then ((data) => setUsersSelfFollows(data));
      }
    });
  };
  //Form functionailty for log-in
  let updateForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  //Navigate to sign up
  let handleSignUp = (e) => {
    setShowSignUp(prevState=>!prevState)
    setTargetUser(prevState=>!prevState)
  }

  return (
    <>
    {!user.username && !showSignUp && !userDeets? 
      <div className="App">
        <h1 className="mainheader">Welcome To Skratchr</h1>
        <div className='sign-in-modal'>
          <div className='sign-in-container'>
              <h1>Sign-In</h1>
              <form className='Sign-In-Form' onSubmit={handleSubmit}>
                <button type='submit'>Sign In</button>
                <input onChange={updateForm} name="username" type='text' placeholder='Username' />
                <input onChange={updateForm} name="password" type='password' placeholder='Password'/>
              </form>
          </div>
          <div>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>
          <div>New User?</div>
          <button onClick={handleSignUp}>Sign Up Today!</button>
        </div>
      </div>
      :
      user.username && !showSignUp && !userDeets?
      <Feed user={user} setUser={setUser} userposts={userposts} setUserPosts={setUserPosts} followingPosts={followingPosts} 
      setFollowingPosts={setFollowingPosts} discoverBin={discoverBin} setDiscoverBin={setDiscoverBin} usersSelfFollows={usersSelfFollows} setUserDeets={setUserDeets} userDeets={userDeets} handleDeetsClick={handleDeetsClick} setTargetUser={setTargetUser}/>
      :
      !user.username && showSignUp && !userDeets?
      <SignUp handleSignUp={handleSignUp} setUser={setUser} showSignUp={showSignUp} discoverBin={discoverBin} setDiscoverBin={setDiscoverBin} targetUser={targetUser}/> 
      :
      user.username && !showSignUp && userDeets?
      <>
        <div>Nothing yet to test</div>
        <button onClick={handleDeetsClick}>Back to Feed</button>
        <ProfileDetail targetUser={targetUser}/>
      </>
      :
      null
      }
    </>
  );
}

export default App;
