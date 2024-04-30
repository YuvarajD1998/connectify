import React, { useState, useEffect, useContext } from "react";
import "./post.css";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import axios from "axios";
import { ThumbUp, Comment, Share } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";

export default function Post({post}) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [likeColor, setLikeColor] = useState("black");
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    axios
      .get(`/users?userId=${post.userId}`)
      .then((response) => {
        let data = response.data;
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [post.userId]);

  const handleLikes = () => {
    try {
      axios.put("/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
      setLikeColor(isLiked ? "black" : "blue");
    } catch (err) {console.error(err)}
  };

  return (
    <div className="post-container">
      <div className="post-wrapper">
        <div className="posttop">
          <Link to={`/profile/${user.username}`}>
            <img
              src={user.profilephoto===""?PF+'/person/noimg.png':PF+'/person/'+user.profilephoto}
              alt="#"
            />
          </Link>
          <div className="postauth-time">
            {user.username}
            <span>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}{" "}
              &#x2022; &#127760;
            </span>
          </div>
        </div>
        <div className="postcaption-img">
          <div>
            <span>{post.desc}</span>
          </div>
          <div className="postimg">
            {post.img && <img src={PF+ post.img} alt="not found" />}
          </div>
        </div>
        <div className="post-likescount">
          <div className="likescount-left">
            <img
              src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e"
              alt=""
            />
            <img
              src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23FF6680'/%3e%3cstop offset='100%25' stop-color='%23E61739'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.710144928 0 0 0 0 0 0 0 0 0 0.117780134 0 0 0 0.349786932 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 100 16A8 8 0 008 0z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M10.473 4C8.275 4 8 5.824 8 5.824S7.726 4 5.528 4c-2.114 0-2.73 2.222-2.472 3.41C3.736 10.55 8 12.75 8 12.75s4.265-2.2 4.945-5.34c.257-1.188-.36-3.41-2.472-3.41'/%3e%3c/g%3e%3c/svg%3e"
              alt=""
            />
            <span>{like} Likes</span>
          </div>
          <div className="commentcount">
            <span>6 Comments</span>
          </div>
        </div>
        <hr />
        <div className="post-icons">
          <div className="postbottom-icons">
            <ThumbUp
              htmlColor={likeColor}
              className="picon"
              onClick={handleLikes}
            />
            <span onClick={handleLikes}>Like</span>
          </div>
          <div className="postbottom-icons">
            <Comment htmlColor="black" className="picon" />
            <span>Comment</span>
          </div>
          <div className="postbottom-icons">
            <Share htmlColor="black" className="picon" />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}
