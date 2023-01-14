import MovieCard from "./MovieCard";

function Home({ movies, handleClick, settingMoviePrice }) {
   return (
      <section className="home">
         {movies.length > 0 ? (
            <div className="cardcon">
               {movies.map((item, index) => (
                  <MovieCard
                     key={index}
                     {...item}
                     item={movies}
                     handleClick={handleClick}
                     settingMoviePrice={settingMoviePrice}
                  />
               ))}
            </div>
         ) : (
            <h2>Movie is not found.</h2>
         )}
      </section>
   );
}

export default Home;
