import LoginForm from "./Login";
import NASA from "./Nasa";

function Home () {

    return (
        <>
        {localStorage.getItem('token') ? (
        <NASA/>
            ) : (
        <LoginForm />
        )}
        </>
    )
}

export default Home;