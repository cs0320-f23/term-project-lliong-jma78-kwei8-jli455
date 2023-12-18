import React, { useState } from "react";
import "../styles/home.css";
import logoPlaceholder from '../images/nugget-dino3.png';
import downArrow from '../images/down-arrow.png';
import { useNavigate } from "react-router-dom";

export default function Home() {
  // const navigate = useNavigate();

  return(
    <div className="home-page">
      <img src={logoPlaceholder} style={{paddingLeft:"42vw"}}></img>
      <h1 style={{fontSize:"100px"}}>Ablaze</h1>
      <h2 style={{textAlign:"center"}}>Support Asian-Owned Businesses and Artists</h2>
      <div style={{paddingTop:"20vh"}}>
        <h2 style={{textAlign:"center"}}>See Featured</h2>
        <img src={downArrow} 
            style={{width:"45px", height:"45px", paddingLeft:"48.5vw"}}
        ></img>
      </div>
    </div>
  )
  return <div>
    <p>hello</p>
  </div>;
}

// export default function HomePage() {
//     const[isDropDownVisible, setDropDownVisible] = useState<boolean>(false);

//     const[artistIsActive, setArtistsVisible] = useState<boolean>(false);
//     const[businessIsActive, setBusinessVisible] = useState<boolean>(false);
//     const[resourceIsActive, setResourceVisible] = useState<boolean>(false);
//     const[submitIsActive, setSubmitVisible] = useState<boolean>(false);
//     const[accountIsActive, setAccountVisible] = useState<boolean>(false);
//     const[homeIsActive, setHomeVisible] = useState<boolean>(true)

//     const navigate = useNavigate();

//     const[activeIndex, setActive] = useState(0)

//     const setArtists = () => {
//         setArtistsVisible(true)
//     }

//     const setBusinesses = () => {
//         setBusinessVisible(true)
//     }

//     const handleMouseHover = () => {
//         setDropDownVisible(true);
//     }

//     const handleMouseLeave = () => {
//         setDropDownVisible(false);
//     }

//     const onShow = () => {
//         if(homeIsActive){
//             setActive(0)
//         }
//         else if(artistIsActive){
//             setActive(1)
//         }
//         else if(businessIsActive){
//             setActive(2)
//         }
//         else if(submitIsActive){
//             setActive(3)
//         }
//         else if(resourceIsActive){
//             setActive(4)
//         }
//         else if(accountIsActive){
//             setActive(5)
//         }
//     }

//     return (
//         <div id="home-page">
//             <header id="header-row" aria-label="Navigation Bar" style={{float:"right"}}>
//                 <div className="nav-page-columns" onMouseEnter={handleMouseHover} onMouseLeave={handleMouseLeave}>
//                     <h2>Explore</h2>
//                     {isDropDownVisible ?
//                         <div className="dropdown-menu">
//                             <ul style={{padding: "unset", margin:"unset"}}>
//                                 <h3 onClick={() => navigate("/artists")}>Explore Artists</h3>
//                                 <h3 onClick={setArtists}>Explore Creators</h3>
//                                 <h3 onClick={setBusinesses}>Explore Businesses</h3>
//                             </ul>
//                         </div>

//                     : null}
//                 </div>
//                 <div className="nav-page-columns">
//                     <h2>Submit</h2>
//                 </div>
//                 <div className="nav-page-columns">
//                     <h2>Resources</h2>
//                 </div>

//             </header>
//             {homeIsActive ?
//                 <div>

//                     <div id="home-name">
//                         <h1 style={{textAlign:'center', fontSize:'100px'}}>Ablaze</h1>
//                         <h2 style={{textAlign: 'center'}}>Discover Asian American and Pacific Islander creators and businesses!</h2>
//                     </div>
//                 </div>
//             : null}
//             {artistIsActive ? <div><Artists></Artists></div> : null}

//         </div>
//     );
//   }

//   <div id="home-logo">
//   <img src={logoPlaceholder}></img>
// </div>

{
  /* <div className="site-icons">
<img src={accountImg} style={{width: '50px', paddingTop:"8px", paddingLeft:"10px"}}></img>
</div> */
}
