import LoginForm from "./Login";
import Home from "./Homepage";
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import { useEffect } from 'react';


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
      {!localStorage.getItem('token') ? (
        <LoginForm />
      ) : (
        <>
        <Router>
          <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
      </>
      )}
      </header>
    </div>
  );
}

export default App;
