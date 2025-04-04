'use client';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface HintProps {
    label: string;
    children: React.ReactNode;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
}

export const Hint = ({ label, children, side = 'top', align = 'start' }: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align} className="bg-gray-200 text-black border-white/5">
                  <p className="font-medium text-md">
                    {label}
                  </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}