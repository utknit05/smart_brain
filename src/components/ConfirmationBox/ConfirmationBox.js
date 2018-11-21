import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const submit = (onRouteChange, del) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => console.log('Click Yes')
        },
        {
          label: 'No',
          onClick: () => onRouteChange('stayHome')       
        }
      ]
    })
  };


const ConfirmationBox = ({del, onRouteChange}) => {
	  return(
      <div>
	     {submit(onRouteChange, del)}
      </div>
	   );
	}

export default ConfirmationBox;