import { useRef } from "react";
import { TabProps } from "../types/TabProps";
import close from 'close.png'
import { useDraggable } from "@dnd-kit/core";
interface TabComponentProps extends TabProps {
    onClick: (tab: TabProps, e: React.MouseEvent<HTMLButtonElement>) => void;
    onRemoove: (tab: TabProps) => void;
    onPin: (tab: TabProps) => void;
    onUnpin: (tab: TabProps) => void;
}

const Tab: React.FC<TabComponentProps> = ({ id, url, title, img, isActive, isPinned, onClick, onRemoove, onPin, onUnpin }) => {

    const closeButton = useRef<HTMLButtonElement>(null);
    const pinButton = useRef<HTMLButtonElement>(null);
    
    const unpinButton = useRef<HTMLButtonElement>(null);
    let timeout: NodeJS.Timeout;


   
    function handleEnter(e: React.MouseEvent<HTMLButtonElement>) {

        e.currentTarget.style.backgroundColor = "#F1F5F8";
        if (closeButton.current) {
            closeButton.current.className = "absolute h-[16px] w-[16px]  right-2 rounded-xs";

        }
        if (pinButton.current) {
            pinButton.current.style.display = "block";
            pinButton.current.className = "absolute h-[30px] w-[130px] bg-[#FEFEFE] left-20 top-13 rounded-xs drop-shadow-md";

        }
        if (unpinButton.current) {
            unpinButton.current.style.display = "block";
            unpinButton.current.className = "absolute h-[30px] w-[130px] bg-[#FEFEFE] left-5 top-13 rounded-xs drop-shadow-md";

        }

    }

    function handleLeave(e: React.MouseEvent<HTMLButtonElement>) {
        e.currentTarget.style.backgroundColor = "#FEFEFE";
        if (closeButton.current) {
            closeButton.current.className = "  hidden";

        }

        timeout = setTimeout(() => {
            if (pinButton.current) {
                pinButton.current.style.display = "none"
            }
        }, 300)
        timeout = setTimeout(() => {
            if (unpinButton.current) {
                unpinButton.current.style.display = "none"
            }
        }, 300)

    }
    function handleEnterActive() {

        if (closeButton.current) {
            closeButton.current.className = "absolute h-[16px] w-[16px] right-2 rounded-xs";
        }
        if (pinButton.current) {
            pinButton.current.style.display = "block";
            pinButton.current.className = "absolute h-[30px] w-[130px] bg-[#FEFEFE] left-20 top-13 rounded-xs drop-shadow-md";

        }
        if (unpinButton.current) {
            unpinButton.current.style.display = "block";
            unpinButton.current.className = "absolute h-[30px] w-[130px] bg-[#FEFEFE] left-5 top-13 rounded-xs drop-shadow-md";

        }
    }

    function handleLeaveActive() {
        if (closeButton.current) {
            closeButton.current.className = "  hidden";

        }
        timeout = setTimeout(() => {
            if (pinButton.current) {
                pinButton.current.style.display = "none"
            }
        }, 300)
        timeout = setTimeout(() => {
            if (unpinButton.current) {
                unpinButton.current.style.display = "none"
            }
        }, 300)
    }


    function handleEnterPin(e: React.MouseEvent<HTMLButtonElement>) {

        e.currentTarget.style.display = "block";
        e.currentTarget.className = "absolute h-[30px] w-[130px] bg-[#FEFEFE] left-20 top-13 rounded-xs drop-shadow-md";
        clearTimeout(timeout);

    }

    function handleLeavePin(e: React.MouseEvent<HTMLButtonElement>) {
        e.currentTarget.style.display = "none";
    }

    function handleEnterUnPin(e: React.MouseEvent<HTMLButtonElement>) {

        e.currentTarget.style.display = "block";
        e.currentTarget.className = "absolute h-[30px] w-[130px] bg-[#FEFEFE] left-5 top-13 rounded-xs drop-shadow-md";
        clearTimeout(timeout);

    }

    function handleLeaveUnPin(e: React.MouseEvent<HTMLButtonElement>) {
        e.currentTarget.style.display = "none";
    }

    if (isActive) {
        return (
            <div  className={isPinned ? "flex h-[48px] w-[56px] border-indigo-500 content-between content-around items-center place-content-around relative bg-[#F1F5F8] border-t-2" : "flex h-[48px] w-[145px] border-indigo-500 content-between content-around items-center place-content-around relative bg-[#F1F5F8] border-t-2"}>
                <button onMouseEnter={handleEnterActive}
                    onMouseLeave={handleLeaveActive}
                    className="flex w-full h-full content-between content-around items-center place-content-around ">
                    <div className="flex items-center gap-x-2">
                        <img src={img} className="h-[16px] w-[16px]"></img>
                        {!isPinned && <span >{title}</span>}
                    </div>
                </button>
                {!isPinned && <button ref={closeButton} onMouseEnter={handleEnterActive}
                    onMouseLeave={handleLeaveActive} onClick={() => onRemoove({ id, url, title, img, isPinned, isActive: true })} ><img src="/close.png"></img></button>}
                {!isPinned && <button ref={pinButton} onMouseEnter={handleEnterPin} onMouseLeave={handleLeavePin} onClick={() => onPin({ id, url, title, img, isPinned, isActive })} style={{ display: "none" }}>Pin</button>}
                {isPinned && <button ref={unpinButton} onMouseEnter={handleEnterUnPin} onMouseLeave={handleLeaveUnPin} onClick={() => onUnpin({ id, url, title, img, isPinned, isActive })} style={{ display: "none" }}>UnPin</button>}
            </div>
        )
    }
    else
        return (
            <div  className={isPinned ? "flex h-[48px] w-[56px] content-between content-around items-center place-content-around relative bg-[#FEFEFE]" : "flex h-[48px] w-[145px]  content-between content-around items-center place-content-around relative bg-[#FEFEFE]"}>
                <div className="absolute left-[-1px] h-[16px] border-l-2 border-[#F1F5F8]"></div>
                <button onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                    onClick={(e) => onClick({ id, url, title, img, isPinned, isActive }, e)}
                    className="flex w-full h-full content-between content-around items-center place-content-around ">
                    <div className="flex items-center gap-x-2">
                        <img src={img} className="h-[16px] w-[16px]"></img>
                        {!isPinned && <span >{title}</span>}
                    </div>
                </button>
                {!isPinned && <button ref={closeButton} onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave} onClick={() => onRemoove({ id, url, title, img, isPinned, isActive })} className="hidden"><img src="/close.png"></img></button>}
                <div className="absolute right-0 h-[16px] border-r-2 border-[#F1F5F8]" ></div>
                {!isPinned && <button ref={pinButton} onMouseEnter={handleEnterPin} onMouseLeave={handleLeavePin} onClick={() => onPin({ id, url, title, img, isPinned, isActive })} style={{ display: "none" }}>Pin</button>}
                {isPinned && <button ref={unpinButton} onMouseEnter={handleEnterUnPin} onMouseLeave={handleLeaveUnPin} onClick={() => onUnpin({ id, url, title, img, isPinned, isActive })} style={{ display: "none" }}>UnPin</button>}
            </div>
        )
}

export default Tab;