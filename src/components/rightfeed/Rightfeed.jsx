import "./rightfeed.css";

import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const people = [
    { id: 1, name: "Emma", photo: "1.jpg" },
    { id: 2, name: "Olivia", photo: "2.jpg" },
    { id: 3, name: "Ava", photo: "3.jpg" },
    { id: 4, name: "Isabella", photo: "4.jpg" },
    { id: 5, name: "Michael", photo: "5.jpg" },
    { id: 6, name: "Ethan", photo: "6.jpg" },
    { id: 7, name: "Daniel", photo: "7.jpg" },
    { id: 8, name: "Alice", photo: "8.jpg" },
    { id: 9, name: "Madelyn", photo: "9.jpg" },
    { id: 10, name: "James", photo: "10.jpg" }
  ];
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);



  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    const isFollowed = currentUser.followings.includes(user?._id);
    setFollowed(isFollowed);
  }, [currentUser, user]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };


  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF+"/gift.png"} alt="" />
          <span className="birthdayText">
            <b>Alice</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <hr/>
        {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {people.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <>{user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove /> : <Add />}
        </button>
      )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship===1?"Single":user.relationship===2?"Married":"-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          
            {friends.map((friend)=>{
              return (<Link key={friend._id} to={"/profile/" + friend.username}
              style={{textDecoration:'none', color:'black'}}><div   className="rightbar-friends-list">
               <img  className="rightbarFollowingImg" src={friend.profilephoto
                      ? PF + friend.profilephoto
                      : PF + "person/noimg.png"} alt=""/>
                      <span>{friend.username}</span>
                      </div></Link>)
              


              

            })
            
          }
         
         
          
          
          
          
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}