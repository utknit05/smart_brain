import React from 'react';
import './FaceRecognition.css'


const FaceRecognition = ({boxs, imageUrl }) => {

  return (		
   <div className='center ma'>	
    <div className='absolute mt2'>
     <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto'/>
     {boxs.map((face,i) => {
        return(
	       <div key={i}
	       className='bounding-box' 
	       style={{
	       	       top: face.topRow,
	               right: face.rightCol,
	               bottom: face.bottomRow,
	               left: face.leftCol
	             }}
	        >
	        </div>
         );
	    }
     )} 
    </div>
   </div>	
   );
}

export default FaceRecognition;