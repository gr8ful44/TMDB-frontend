import { ShoppingBagIcon, StarIcon } from "@heroicons/react/24/solid";

function MovieCard({
   release_date,
   title,
   poster_path,
   vote_average,
   vote_count,
   id,
   handleClick,
   settingMoviePrice,
   price,
}) {
   const item = {
      release_date,
      title,
      poster_path,
      vote_average,
      vote_count,
      id,
   };
   const getPosterURL = (poster_path) => {
      return `https://www.themoviedb.org/t/p/w440_and_h660_face/${poster_path}`;
   };

   return (
      <div className="card carddec">
         <div className="img">
            <img src={getPosterURL(poster_path)} alt="" />
         </div>
         <div className="info">
            <h3 className="title">{title}</h3>
            <small className="date">{release_date}</small>
            <div className="rating">
               <div className="rt">
                  <p>rating</p>
               </div>
               <div className="rt">
                  <div className="rticon">
                     <StarIcon className="st" color="orange" />
                  </div>
                  <span className="rtavg">{vote_average}</span>
                  <span className="rtcount">({vote_count})</span>
               </div>
            </div>
            <div className="price">
               <p>$</p>
               <input
                  type="number"
                  className="pcinput"
                  name="price"
                  value={price}
                  onChange={(e) =>settingMoviePrice(e)}
                  // onChange={(e)=>console.log(e.target.value)} dai
               />
            </div>
         </div>
         <button
            className="addbtn addbtnfx cusbtn"
            type="submit"
            onClick={(e) => handleClick(e,item)}
         >
            ADD TO CART
            <div className="spbagicon">
               <ShoppingBagIcon />
            </div>
         </button>
      </div>
   );
}

export default MovieCard;
