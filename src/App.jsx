import { useState, useEffect } from "react";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Nav from "./components/Nav";
import useLocalStorage from "./Hook/useLocalStorage";

function App() {
   const [movies, setMovies] = useState([]);
   const [query, setQuery] = useState("");
   const [showCartPage, setShowCartPage] = useState(true);
   const [cart, setCart] = useLocalStorage("movie", []);
   const [price, setPrice] = useState(0);

   const fetchMovie = () => {
      fetch(
         "https://api.themoviedb.org/3/search/movie?api_key=f41eecaf9e007a96c1d32c6498ecfe02&query=a"
      )
         .then((res) => res.json())
         .then((movieData) => setMovies(movieData.results));
   };

   useEffect(() => {
      fetchMovie();
   }, []);

   const searchMovie = async (e) => {
      e.preventDefault();
      // ถ้ามีqueryให้เรนเดอร์ ถ้าไม่มีไม่ต้องทำอะไร
      if (query) {
         try {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=f41eecaf9e007a96c1d32c6498ecfe02&query=${query}`;
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
         } catch (err) {
            console.log(err);
         }
      } else <Home />;
   };

   const targetObjforcreateNewProp = (item) => {
      setMovies([...movies, { ...item, price: 0 }]);
   };

   // เพิ่มราคาให้ item ชิ้นนั้นๆ
   const settingMoviePrice = (e) => {
      e.preventDefault();
      // object.newProperty=value of newProperty (howtoaddproplikeadummie...)
      setPrice(e.target.value);
   };

   const changeHandler = (e) => {
      setQuery(e.target.value);
   };

   // เลือกไอเทมอันที่click ลงในcart typeof(item)=obj.
   const handleClick = (e, item) => {
      const exist = cart.find((target) => target.id === item.id);
      setMovies([...movies, { ...item, price: price }]);
      setCart([...cart, { ...item, quantity: 1 }]);
      if (exist) {
         const newCartItems = cart.map((x) =>
            x.id === item.id ? { ...exist, quantity: exist.quantity + 1 } : x
         );
         setCart(newCartItems);
         setPrice(price);
      }
   };

   const handleChange = (item, d) => {
      let ind = -1;
      cart.forEach((data, index) => {
         if (data.id === item.id) ind = index;
      });
      const tempArr = cart;
      tempArr[ind].quantity += d;

      if (tempArr[ind].quantity === 0) tempArr[ind].quantity = 1;
      setCart([...tempArr]);
   };

   return (
      <div className="App">
         <Nav
            size={cart.length}
            changeHandler={changeHandler}
            searchMovie={searchMovie}
            query={query}
            setShowCartPage={setShowCartPage}
         />
         {showCartPage ? (
            <Home
               movies={movies}
               handleClick={handleClick}
               settingMoviePrice={settingMoviePrice}
            />
         ) : (
            <Cart
               cart={cart}
               setCart={setCart}
               handleChange={handleChange}
               price={price}
            />
         )}
         <Footer />
      </div>
   );
}

export default App;
