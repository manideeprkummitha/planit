'use client'

import React from 'react';
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface DialogBaseProps {
    open:boolean;
    onOpenChange:(open: boolean) => void;
    title:string;
    description?:string
    children: React.ReactNode
    footer?:React.ReactNode
}
  
const DialogBase:React.FC<DialogBaseProps> = ({open, onOpenChange, title,description, children, footer}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='sm:max-w-[425px] min-h-8 '>
            <DialogHeader className='mb-2'>
                <DialogTitle className='' >{title}</DialogTitle>
                {description && <div className="text-sm text-muted-foreground">{description}</div>}
            </DialogHeader>
            {/* <DialogDescription> */}
                    {children}
                {/* </DialogDescription> */}
                {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogContent>
    </Dialog>
  )
}

export default DialogBase