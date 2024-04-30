import "./navbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link} from "react-router-dom";
import { useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutCall } from "../../apiCalls";


export default function Topbar() {
  const {user,dispatch}=useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  

  const handleLogout=()=>{
    logoutCall(
      dispatch
    );
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to='/'>
        <span className="logo">Connectify</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link className="topbarLink-link" to="/">Timeline</Link>
          <Link className="topbarLink-link" to="/login"><button onClick={handleLogout} style={{backgroundColor:'#0d6efd',color:'white',border:'none'}}>Logout</button></Link>
          
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
          <Link to={`/profile/${user.username?user.username:user.userId}`}>
        <img src={user.profilephoto===""?PF+'/person/noimg.png':PF+'/person/'+user.profilephoto} alt="" className="topbarImg"/>
        </Link>
      </div>
    </div>
  );
}