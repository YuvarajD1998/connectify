import React, { useState } from "react";
import "./leftfeed.css";
import {
  Bookmark,
  Event,
  Groups,
  Feed,
  OndemandVideo,
  PeopleAlt,
  Update,
  Chat,
  Store,
} from "@mui/icons-material";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Leftfeed() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [people,setPeople]=useState([])

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/allusers`)
    .then(response => {
      let data=response.data
      setPeople(data)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [])


  return (
    <>
      <div className="leftfeed-container">
        <div className="sidebarWrapper">
          <ul className="leftfeed-list">
            <li className="listitems">
              <Chat />
              <span>Chat</span>
            </li>
            <li className="listitems">
              <PeopleAlt />
              <span>Friends</span>
            </li>
            <li className="listitems">
              <Update />
              <span>Memories</span>
            </li>
            <li className="listitems">
              <Bookmark />
              <span>Saved</span>
            </li>
            <li className="listitems">
              <Groups />
              <span>Groups</span>
            </li>
            <li className="listitems">
              <OndemandVideo />
              <span>Videos</span>
            </li>
            <li className="listitems">
              <Event />
              <span>Event</span>
            </li>
            <li className="listitems">
              <Feed />
              <span>Feed</span>
            </li>
            <li className="listitems">
              <Store />
              <span>Store</span>
            </li>
            <button type="button" className="btn btn-dark">
              Show More
            </button>
          </ul>
          <hr className="border-3" />

          <h5>Find Friends</h5>

          <ul className="people-list">
            {people.map((people) => {
              return (<Link key={people._id} to={"/profile/" + people.username}
              style={{textDecoration:'none', color:'black'}}>
                <li className="peoplelist-names" key={people._id}>
                  <img
                    className="peopleimg"
                    src={people.profilephoto
                      ? PF + people.profilephoto
                      : PF + "person/noimg.png"}
                    alt=""
                  />
                  <span className="namespan">{people.username}</span>
                </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
