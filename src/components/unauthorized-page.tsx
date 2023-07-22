import { useAuth0 } from "@auth0/auth0-react";

const UnauthorizedPage = () => {

  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <>
      {!isAuthenticated && (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello there</h1>
              <p className="py-6">Welcome to our cinematic wonderland! Discover the best in movies, from timeless classics to the latest blockbusters. Lights, camera, action – let's start the show!</p>
              <button onClick={() => loginWithRedirect()} className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UnauthorizedPage