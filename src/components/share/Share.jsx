import { AddAPhoto, EmojiEmotions, LocationCity, Send, VideoCall,Cancel } from '@mui/icons-material'
import React from 'react'
import './share.css'
import { useContext,useRef,useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from "axios";

export default function Share() {
    const {user}=useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
  const [file, setFile] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className='share'>
        <div className="share-wrapper">
        <div className="sharetop">
            <img id='shareprofilepic' src={user.profilephoto===""?PF+'/person/noimg.png':PF+'/person/'+user.profilephoto} alt="" />
            <input type="text" ref={desc} className='shareinput' placeholder={`  What's on your mind, ${user.username+'?' || "?"}`} />
            
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="sharebottom" onSubmit={submitHandler}>
            <label htmlFor='file' className="shareicons">
                <AddAPhoto htmlColor='green'/>
                <span>Photo/Video</span>
                <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareicons">
                <VideoCall htmlColor='tomato'/>
                <span>Live</span>
            </div>
           
            <div className="shareicons">
                <LocationCity htmlColor='blue'/>
                <span>Location</span>
            </div>
            <div className="shareicons">
                <EmojiEmotions htmlColor='goldenrod'/>
                <span>Feeling/Activity</span>
            </div>
            <button type="submit" style={{backgroundColor:'white',border:'none'}}><Send htmlColor='green' /></button>
        </form>
        </div>
    </div>
  )
}
