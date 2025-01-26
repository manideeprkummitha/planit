'use client'
import React from 'react';
import { Button } from '@/components/ui/button';

interface DialogActionsProps {
    onCancel: () => void;
    onCreate: () => void;
}
const DialogActions:React.FC<DialogActionsProps> = ({onCancel, onCreate}) => {
  return (
    <>
     <Button variant="destructive" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="default" className='bg-blue-700 hover:bg-blue-800' onClick={onCreate}>
        Create
      </Button>
    </>
  )
}

export default DialogActions