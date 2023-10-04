import LoginForm from "./Login";


function Home () {

const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
}
    return (
        <>
        {localStorage.getItem('token') ? (
        <div>
            <div>
            <p>hello</p>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
        ) : (
          <LoginForm />
        )}
        </>
    )
}

export default Home;