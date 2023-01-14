import {
   MagnifyingGlassIcon,
   ShoppingCartIcon,
} from "@heroicons/react/24/solid";

function Nav({ size, searchMovie, changeHandler, query, setShowCartPage }) {
   return (
      <nav className="nav nvbg nvpos">
         <div className="logo" onClick={() => setShowCartPage(true)}>
            Popcorn
         </div>

         {/* ครอบเพื่อจัดการแว่นขยาย */}
         <div>
            <form onSubmit={searchMovie} className="formsubmit">
               <div className="inputwrap">
                  <input
                     placeholder="Search.."
                     className="nvinput"
                     id="input"
                     type="text"
                     name="query"
                     value={query}
                     onChange={changeHandler}
                  />
               </div>
               <div className="iconsize glicon">
                  <MagnifyingGlassIcon />
               </div>
            </form>
         </div>
         <div
            className="iconsize cticon ctcon "
            onClick={() => setShowCartPage(false)}
         >
            <ShoppingCartIcon className="ct" />
            <span className="countct cilp countctpos">{size}</span>
         </div>
      </nav>
   );
}

export default Nav;
