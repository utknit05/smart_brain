import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {

        if(isSignedIn){	
            return(	
				<nav style={{display: 'flex', justifyContent: 'flex-end' }}>
				  <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('SignOut')}>Sign Out</p>
				  <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('Delete')}>Delete</p>
				</nav>
		    );	
	    }
	    else {
		    return(	
				<nav style={{display: 'flex', justifyContent: 'flex-end' }}>
				  <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('Signin')}>Sign In</p>
				  <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('SignUp')}>Sign Up</p>
				</nav>
            );
	    }
}

export default Navigation;