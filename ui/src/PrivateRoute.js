import React, { useEffect } from 'react';
import { Route, Redirect,useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import Admin from './admin';

const PrivateRoute = ({ path, exact }) => {
  const token = Cookies.get('token');
  const history = useHistory();

  const verifyAdmin = async () => { 
    const response = await fetch('http://localhost:8800/admin/checkAdmin', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                history.push('/Unauthorized'); 
            }
        };

  useEffect(() => {
    if (!token) {
      
      history.push('/Unauthorized'); 
    }
    if(token){
      verifyAdmin();
    }
  }, [token, history]);

  return token ? (
    <Route path={path} exact={exact}>
      <Admin />
    </Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
