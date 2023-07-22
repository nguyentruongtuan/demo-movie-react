import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import AuthorizedPage from './components/authorized-page';
import UnauthorizedPage from './components/unauthorized-page';
import { AuthContext } from './context/auth-context';




function App() {

  const { getAccessTokenSilently, isLoading } = useAuth0();
  const [token, setToken] = useState('')

  useEffect(() => {

    (async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'QWNlRGlnaXRhbA==',
          },
        });

        setToken(token)
      } catch (e) {
        // Handle errors such as `login_required` and `consent_required` by re-prompting for a login
        console.error(e);
      }
    })();

  }, [getAccessTokenSilently])

  if (isLoading) {
    return (<>Loading....</>)
  }



  return (
    <div className="bg-white">

      <AuthContext.Provider value={token}>

        <AuthorizedPage />
      </AuthContext.Provider>
      <UnauthorizedPage />

    </div>
  )
}

export default App;
