import LoginForm from "./Login";


function Home () {
    return (
        <>
        {localStorage.getItem('token') ? (
        <div>
            <div>
            <p>hello</p>
            </div>
            <div>
                <button>Logout</button>
            </div>
        </div>
        ) : (
          <LoginForm />
        )}
        </>
    )
}

export default Home;