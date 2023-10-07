import LoginForm from "./Login";
import Home from "./Homepage";
import { Routes, Route, useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import Signup from "./Signup";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
// routes for login, signup, home (nasa image) with browser router

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <>
           <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/register" element={<Signup />}></Route>
              <Route path="/login" element={<LoginForm />}></Route>
            </Routes>
      </>
      </header>
    </div>
  );
}

export default App;
