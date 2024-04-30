import "./profile.css";
import Navbar from "../../components/Navbar/Navbar";
import Leftfeed from "../../components/leftfeed/Leftfeed";
import Feed from "../../components/feed/Feed";
import Rightfeed from "../../components//rightfeed/Rightfeed";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";


export default function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users?username=${username}`)

    .then(response => {

      let data=response.data
      setUser(data)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [username])
  return (
    <>
      <Navbar />
      <div className="profile">
        <Leftfeed />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverphoto===""?PF+'/post/1.jpg':PF+"/post/"+user.coverphoto}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilephoto===""?PF+'/person/noimg.png':PF+'/person/'+user.profilephoto}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
          
            <Feed username={username}/>
            
            <Rightfeed user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}