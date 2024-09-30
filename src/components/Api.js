import React, { useEffect, useRef, useState } from "react";
import {Link} from 'react-router-dom'

export default function Dashboard (props){
  const [data, setData] = useState([]);
  const [indata,setinData] = useState([])
  const [loading, setLoading] = useState(true);
  const [visibleId, setVisibleId] = useState(null);
  const [dislikeClickCounts, setDislikeClickCounts] = useState({});
  const [likeClickCounts, setLikeClickCounts] = useState({});
  const voteSectionRef = useRef();
  const [sortOption, setSortOption] = useState("voting");
  const [likeStyles, setLikeStyles] = useState({});
  const [dislikeStyles, setDislikeStyles] = useState({});
  const initialLikeStyle = { color: "rgb(162, 240, 162)", fontSize: "50px" };
  const initialDislikeStyle = { color: "rgb(244, 182, 182)", fontSize: "50px" };
 

  useEffect(() => {
    fetch("https://hoblist.com/api/movieList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: "movies",
        language: "Kannada",
        genre: "all",
        sort: "voting",
      }),
    })
      .then((response) => response.json())
      .then((indata) => {
        const moviesWithDislikes = indata.result.map((movie) => ({
          ...movie,
          dislikes: Math.floor(Math.random() * 500),
          likes: Math.floor(Math.random() * 1000),
        }));
        const sortedData = moviesWithDislikes.sort(
          (a, b) => b.voting - a.voting
        );
        setData(sortedData);
        setinData(sortedData);
         const initialLikeStyles = {};
         const initialDislikeStyles = {};
         sortedData.forEach(movie => {
           initialLikeStyles[movie._id] = initialLikeStyle;
           initialDislikeStyles[movie._id] = initialDislikeStyle;
         });
         setLikeStyles(initialLikeStyles);
         setDislikeStyles(initialDislikeStyles);
 
         setLoading(false);
       })
       .catch((error) => {
         console.error("Error fetching the data:", error);
         setLoading(false);
       });
   }, []);
 

  useEffect(() => {
    sortData(sortOption);
  }, [sortOption]);

  const sortData = (option) => {
    let sortedData = [...data];
    if (option === "voting") {
      sortedData.sort((a, b) => b.voting - a.voting);
    } else if (option === "likes") {
      sortedData.sort((a, b) => b.likes - a.likes);
    } else if (option === "dislikes") {
      sortedData.sort((a, b) => b.dislikes - a.dislikes);
    } else if (option === "views") {
      sortedData.sort((a, b) => b.pageViews - a.pageViews);
    }
    setData(sortedData);
  };


  const toggleVisibility = (id) => {
    setVisibleId((prevId) => (prevId === id ? null : id));
  };

  const handleLike = (id) => {
    setDislikeClickCounts({});
    setLikeClickCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (!newCounts[id]) {
        newCounts[id] = 0;
      }
      newCounts[id] += 1;

      const clickCount = newCounts[id];

      let updatedData = [...data];
      let newLikeStyles = { ...likeStyles };
      let newDislikeStyles = { ...dislikeStyles };

      if (clickCount === 1) {
        updatedData = updatedData.map((movie) =>
          movie._id === id ? { ...movie, dislikes: Math.max(movie.dislikes - 1, 0) } : movie
        );
        newDislikeStyles[id] = initialDislikeStyle;
      } else if (clickCount === 2) {
        updatedData = updatedData.map((movie) =>
          movie._id === id ? { ...movie, likes: movie.likes + 1 } : movie
        );
        newLikeStyles[id] = { color: "green", fontSize: "50px" };
      } else if (clickCount >= 3) {
        props.showAlert("You have already liked this movie", "danger");
        return prevCounts;
      }

      setData(updatedData);
      setLikeStyles(newLikeStyles);
      setDislikeStyles(newDislikeStyles);
      return newCounts;
    });
  };



  const handleDislike = (id) => {
    setLikeClickCounts({});
    setDislikeClickCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (!newCounts[id]) {
        newCounts[id] = 0;
      }
      newCounts[id] += 1;

      const clickCount = newCounts[id];

      let updatedData = [...data];
      let newLikeStyles = { ...likeStyles };
      let newDislikeStyles = { ...dislikeStyles };

      if (clickCount === 1) {
        updatedData = updatedData.map((movie) =>
          movie._id === id ? { ...movie, likes: Math.max(movie.likes - 1, 0) } : movie
        );
        newLikeStyles[id] = initialLikeStyle;
      } else if (clickCount === 2) {
        updatedData = updatedData.map((movie) =>
          movie._id === id ? { ...movie, dislikes: movie.dislikes + 1 } : movie
        );
        newDislikeStyles[id] = { color: "red", fontSize: "50px" };
      } else if (clickCount >= 3) {
        props.showAlert("You have already disliked this movie", "danger");
        return prevCounts;
      }

      setData(updatedData);
      setLikeStyles(newLikeStyles);
      setDislikeStyles(newDislikeStyles);
      return newCounts;
    });
  };



  const scrollToVoteSection = () => {
    
    voteSectionRef.current.scrollIntoView({ behavior: "smooth" });
  
};

const handleSortChange = (event) => {
  setSortOption(event.target.value);
};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="css-19ef6mj">
      <div className="css-1bffsw6">
        <div className="MuiBox-root css-18ygu8q">
          <div className="css-16ll0ox">
          <Link to="/">
          <div className="css-1vidzp5" style={{"color": "rgb(255, 255, 255)"}}>Home
            </div>
            </Link>
          </div>
        </div>
        <div className="css-vwsu55">
          <span className="css-1s1nnzg">Top Kannada Movies</span>
        </div>
      <div className="jss385">
        <div className="jss389 jss386 css-g7vlwi">
            <span
              style={{
                boxSizing: "border-box",
                display: "block",
                overflow: "hidden",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: "1",
                border: "0px",
                margin: "0px",
                padding: "0px",
                position: "absolute",
                inset: "0px",
              }}
            >
              <img
                sizes="100vw"
                src={indata[1].poster}
                alt="..."
                style={{
                  position: "relative",
                  right: "70px",
                  top: "250px",
                  inset: "0px",
                  boxSizing: "border-box",
                  padding: "0px",
                  border: "none",
                  margin: "auto",
                  display: "block",
                  width: "0px",
                  height: "0px",
                  minWidth: "100%",
                  maxWidth: "100%",
                  minHeight: "100%",
                  maxHeight: "100%",
                  objectFit: "fill",
                  filter: "none",
                  backgroundImage: "none",
                  backgroundPosition: "0% 0%",
                }}
              />
            </span>
            <div className="jss391">2</div>
        </div>
        <div className="jss388 css-g7vlwi">
          <span
            style={{
              boxSizing: "border-box",
              display: "block",
              overflow: "hidden",
              width: "initial",
              height: "initial",
              background: "none",
              opacity: "1",
              border: "0px",
              margin: "0px",
              padding: "0px",
              position: "absolute",
              inset: "0px",
            }}
          >
            <img
              sizes="100vw"
              src={indata[0].poster}
              alt="..."
              style={{
                position: "relative",
                inset: "0px",
                boxSizing: "border-box",
                padding: "0px",
                border: "none",
                margin: "auto",
                display: "block",
                width: "0px",
                height: "0px",
                minWidth: "100%",
                maxWidth: "100%",
                minHeight: "100%",
                maxHeight: "100%",
                objectFit: "fill",
                filter: "none",
                backgroundImage: "none",
                backgroundPosition: "0% 0%",
                
              }}
            />
          </span>
          <div className="jss391">1</div>
        </div>
        <div className="jss390 jss386 css-g7vlwi">
          <span
            style={{
              boxSizing: "border-box",
              display: "block",
              overflow: "hidden",
              width: "initial",
              height: "initial",
              background: "none",
              opacity: "1",
              border: "0px",
              margin: "0px",
              padding: "0px",
              position: "absolute",
              inset: "0px",
            }}
          >
            <img
              sizes="100vw"
              src={indata[2].poster}
              alt="..."
              style={{
                position: "relative",
                inset: "0px",
                boxSizing: "border-box",
                padding: "0px",
                border: "none",
                margin: "auto",
                display: "block",
                width: "0px",
                height: "0px",
                minWidth: "100%",
                maxWidth: "100%",
                minHeight: "100%",
                maxHeight: "100%",
                objectFit: "fill",
                filter: "none",
                backgroundImage: "none",
                backgroundPosition: "0% 0%",
              }}
            />
          </span>
          <div className="jss391">3</div>
        </div>
      </div>
        <div className="css-vwsu55">
          <div
            className="css-1pqv2c"
            style={{ cursor: "pointer", fontSize: "1.2rem" }}
            onClick={scrollToVoteSection} 
          >
            <span>Vote Below</span>
            <svg
              className="MuiSvgIcon-root"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6-6-6z"></path>
            </svg>
          </div>
          </div>
        </div>
        <div className='Toastify'></div>
        <div style={{"display": "flex", "justifyContent": "flex-start", "flexWrap": "wrap"}}>
          <p className="css-kxkv3t">Kannada Movies</p>
        </div>
        <div className="css-0">
        <div style={{"height": "auto", "fontSize": "1rem", "textAlign": "justify", "padding": "10px"}}>
          <p>
            <b>Vote for the best movie</b>
          </p>
          <p>
            <b>Click on the like button to give a like for your favourite movie</b>
          </p>
          <p> Kannada Movies are the best to watch</p>
        </div>
        </div>
        </div>
        <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8 MuiGrid-grid-sm-8 MuiGrid-grid-md-8 MuiGrid-grid-lg-8" id="mainList">
          <div className="MuiBox-root css-hu9zfk">Here is the list of
          8 The Best Kannada Movies
          </div>
        </div>
        <div className="MuiGrid-root MuiGrid-container MuiGrid-item MuiGrid-align-items-xs-center MuiGrid-justify-content-xs-flex-end MuiGrid-grid-xs-4 MuiGrid-grid-sm-4 MuiGrid-grid-md-4 MuiGrid-grid-lg-4" style={{"gap": "5px"}}>
          <label htmlFor="sort" className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-animated Mui-focused Mui-focused" style={{"fontWeight": "bolder"}}>Sort By  
          <div className="sorting">
          <select  id="sort" value={sortOption}  onChange={handleSortChange}required>
          <option value="voting">Best Ranked</option>
          <option value="likes">Most liked</option>
          <option value="dislikes">Most disliked</option>
          <option value="views">Highest views</option>
          </select>
          </div>
          </label>
        </div>


        <div
          className="MuiContainer-root jss379 MuiContainer-maxWidthLg"
          style={{ height: "auto !important" }}
          ref={voteSectionRef}
        >
          <div
            className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 MuiGrid-align-items-xs-flex-start MuiGrid-justifyContent-xs-center"
            style={{ height: "auto !important" }}
          >
            <div className="MuiGrid-root MuiGrid-container MuiGrid-item MuiGrid-justifyContent-xs-center MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-9 MuiGrid-grid-lg-9 MuiGrid-grid-xl-9">
              <div className="MuiGrid-root MuiGrid-container MuiGrid-item MuiGrid-justifyContent-xs-center MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-12 MuiGrid-grid-lg-12 MuiGrid-grid-xl-12">
                {data.slice(0, 8).map((movie, index) => (
                  <div className="css-y4xjkb" key={movie._id}>
                    <div className="css-1itly6e">
                      <div className="css-1bla2j9">
                        <p className="css-fb3xjn">{index + 1}</p>
                        <div className="css-1fa2lwf">
                          <span
                            style={{
                              boxSizing: "border-box",
                              display: "block",
                              overflow: "hidden",
                              width: "initial",
                              height: "initial",
                              background: "none",
                              opacity: "1",
                              border: "0px",
                              margin: "0px",
                              padding: "0px",
                              position: "absolute",
                              inset: "0px",
                            }}
                          ></span>
                          <img
                            sizes="100vw"
                            src={movie.poster}
                            alt="..."
                            style={{
                              inset: "0px",
                              boxSizing: "border-box",
                              padding: "0px",
                              border: "none",
                              margin: "auto",
                              display: "block",
                              width: "0px",
                              height: "0px",
                              minWidth: "100%",
                              maxWidth: "100%",
                              minHeight: "100%",
                              maxHeight: "100%",
                              objectFit: "fill",
                              filter: "none",
                              backgroundImage: "none",
                              backgroundPosition: "0% 0%",
                              position: "relative",
                              top: "20px",
                              left:"10px"
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="css-10y8zan"
                      >
                        {movie.title}
                      </div>
                      <div className="pageview"
                      >
                        Views: {movie.pageViews}
                      </div>
                      <div className="css-1m31tk6">
                        <div>
                          <div className="css-15zr08k" style={{fontSize: "40px"}}>{movie.likes}</div>
                          <div className="css-1k2gh88">
                          <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                      ></link>
                      <i
                        onClick={() => handleLike(movie._id)}
                        className="fa fa-thumbs-up"
                        style={likeStyles[movie._id]}
                      >
                      </i>
                          </div>
                        </div>
                        <div className="css-1cta1s3">
                        <div className="css-j8swh2" style={{fontSize: "40px"}}>{movie.dislikes}</div>
                          <div className="css-1k2gh88">
                            <i
                        onClick={() => handleDislike(movie._id)}
                        className="fa fa-thumbs-down"
                        style={dislikeStyles[movie._id]}
                      >                        
                      </i></div>
                      
                        </div>
                      </div>
                      
                      
                    </div>
                    <div className="css-bmgymu">
                      <div
                        className={`css-i0kz6g ${
                          visibleId === movie._id ? "" : "hidden"
                        }`}
                      >
                        <div className="css-1guo3c7">
                          <div>
                            <p className="card-text">{movie.description}</p>
                            <p className="card-text">Genre: {movie.genre}</p>
                            <p className="card-text">
                              Director: {movie.director}
                            </p>
                            <p className="card-text">
                              Starring: {movie.stars.join(", ")}
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                {movie.runTime} Mins | {movie.language} |{" "}
                                {new Date(movie.releasedDate).getDate()}
                              </small>
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                {movie.pageViews} views | Voted by{" "}
                                {movie.voting} people
                              </small>
                            </p>
                          </div>
                        </div>
                        <div className="css-1guo3c7"></div>
                      </div>
                      <span
                        onClick={() => toggleVisibility(movie._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <svg
                          className="MuiSvgIcon-root"
                          focusable="false"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            d={
                              visibleId === movie._id
                                ? "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
                                : "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                            }
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};

