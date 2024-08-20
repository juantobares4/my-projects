import React from 'react'
import { createPortal } from 'react-dom';

import { Modal } from './Modal';

export const PortalCreate = ({ selectedRecipe, onClose }) => {  
  return (
    <>
      {
        selectedRecipe && createPortal(
          <Modal 
            styles={'modal show d-block'}
            recipe={selectedRecipe} 
            onClose={onClose} 
          />,
          document.body

      )}

    </>
  
  );

};
