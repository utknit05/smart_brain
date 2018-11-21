import React from 'react';
import './ImageLinkForm.css';



const ImageLinkForm = ({onInputChange , onButtonSubmit}) => {

    return (		
      <div>	
		<div>
		 <p className='f4'> 
           {'This magic brain will detect faces in your pics!!!'}
		 </p>
		</div>
		<div className='center'>
		 <div className='pa4 br3 shadow-5 form center'>
		   <input className='f4 pa2 w-70' type='text' onChange={onInputChange}/>
		   <button className='w-30 grow f4 link ph3 pv2 dib white bg-dark-blue' onClick={onButtonSubmit}>Detect</button>
		 </div> 
		</div>
	  </div>	
		);
}

export default ImageLinkForm;