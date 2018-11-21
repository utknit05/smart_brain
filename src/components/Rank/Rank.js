import React from 'react';




const Rank = ({name, entries}) => {

    return (		
      <div>	
       <span className='white f4'>
        {`${name}, you have detected faces in `} 
       </span>
       <span className='white f2'>
         {`#${entries} `}
       </span>
       <span className='white f4'>
        {`pictures`} 
       </span>

	  </div>	
		);
}

export default Rank;