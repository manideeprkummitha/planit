'use client';
import React from 'react';
import { Button } from '@/components/ui/button';

interface DialogButton {
  text: string; // Text displayed on the button
  color: string; // Tailwind color classes for styling
  onClick: () => void; // Function to handle the button action
}

interface DialogActionsProps {
  buttons: DialogButton[]; // Array of buttons with their configurations
}

const DialogActions: React.FC<DialogActionsProps> = ({ buttons }) => {
  return (
    <div className="flex space-x-4">
      {buttons.map((button, index) => (
        <Button
          key={index}
          className={`hover:opacity-90 ${button.color}`}
          onClick={button.onClick}
        >
          {button.text}
        </Button>
      ))}
    </div>
  );
};

export default DialogActions;
