import { useState, useEffect } from 'react';
import { session } from '@voxeet/voxeet-web-sdk';
// import Loader from '../components/Loader/Loader'


const params = new URLSearchParams(window.location.search);

let name = params.get('name') || 'Guest'
console.log(name);


export const VoxeetSessionProvider = ({ children }) => {
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  useEffect(() => {
    session.open({ name }).then(() => {
      console.log('created a session');
      setIsSessionLoaded(true);
    });
  }, []);

  return isSessionLoaded ? children : 'LOADING SESSION....';
};