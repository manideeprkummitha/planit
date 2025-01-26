import { ReactNode } from "react"

export const DarkButton = ({ children, onClick }: {
    children: ReactNode,
    onClick: () => void,
    // size?: "big" | "small"
}) => {
    return <div onClick={onClick} className={`flex gap-2 justify-center px-3 py-2 cursor-pointer hover:shadow-md bg-blue-700 hover:bg-blue-800 text-white rounded-md text-center`}>
        {children}
    </div>
}