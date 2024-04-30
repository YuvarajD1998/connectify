import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Leftfeed from '../../components/leftfeed/Leftfeed'
import Rightfeed from '../../components/rightfeed/Rightfeed'
import Feed from '../../components/feed/Feed'
import "./home.css"

export default function Home() {
  return (
  <>
  <Navbar/>
  <div className="feedContainer">
  <Leftfeed />
  <Feed/>
  <Rightfeed/>
  </div>
  </>
  )
    
  
}
