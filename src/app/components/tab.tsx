import { useRef } from "react";
import { TabProps } from "../types/TabProps";
import close from 'close.png'
interface TabComponentProps extends TabProps {
    onClick: (tab: TabProps, e: React.MouseEvent<HTMLButtonElement>) => void;
    onRemoove:(tab: TabProps)=> void;
}

const Tab: React.FC<TabComponentProps> = ({ id, url, title, img, isActive, isPinned, onClick, onRemoove }) =>{
    
    const closeButton = useRef<HTMLButtonElement>(null);

    function handleEnter(e:React.MouseEvent<HTMLButtonElement>){
        
        e.currentTarget.style.backgroundColor = "#F1F5F8";
        if (closeButton.current) {
            closeButton.current.className = "absolute h-[16px] w-[16px]  right-2 rounded-xs";
            
        }

    }

    function handleLeave(e:React.MouseEvent<HTMLButtonElement>){
        e.currentTarget.style.backgroundColor = "#FEFEFE";
        if (closeButton.current) {
            closeButton.current.className = "  hidden";
            
        }
    }
    function handleEnterActive(){
        
        if (closeButton.current) {
            closeButton.current.className = "absolute h-[16px] w-[16px] right-2 rounded-xs";
        }
    }

    function handleLeaveActive(){
        if (closeButton.current) {
            closeButton.current.className = "  hidden";
            
        }
    }

    if(isActive){
        return( 
            <div className={isPinned?"flex h-[48px] w-[56px] border-indigo-500 content-between content-around items-center place-content-around relative bg-[#F1F5F8] border-t-2":"flex h-[48px] w-[145px] border-indigo-500 content-between content-around items-center place-content-around relative bg-[#F1F5F8] border-t-2"}>
                <button onMouseEnter={handleEnterActive} 
                    onMouseLeave={handleLeaveActive}
                    className="flex w-full h-full content-between content-around items-center place-content-around ">
                    <div className="flex items-center gap-x-2">
                        <img src={img} className="h-[16px] w-[16px]"></img>
                        {!isPinned && <span >{title}</span>}
                    </div>  
                </button>
                <button ref={closeButton} onMouseEnter={handleEnterActive} 
                    onMouseLeave={handleLeaveActive} onClick={()=>onRemoove({id, url, title, img, isPinned, isActive:true})} ><img src="/close.png"></img></button>
            </div>
        )
    }
    else
    return( 
        <div className={isPinned?"flex h-[48px] w-[56px] content-between content-around items-center place-content-around relative bg-[#FEFEFE]":"flex h-[48px] w-[145px]  content-between content-around items-center place-content-around relative bg-[#FEFEFE]" }>
            <div className="absolute left-[-1px] h-[16px] border-l-2 border-[#F1F5F8]"></div>
            <button onMouseEnter={handleEnter} 
                    onMouseLeave={handleLeave}
                    onClick={(e)=>onClick({id, url, title, img, isPinned, isActive:true}, e)}
                    className="flex w-full h-full content-between content-around items-center place-content-around ">
                <div className="flex items-center gap-x-2">
                    <img src={img} className="h-[16px] w-[16px]"></img>
                    {!isPinned && <span >{title}</span>}
                </div>
            </button>
            <button ref={closeButton} onMouseEnter={handleEnter} 
                    onMouseLeave={handleLeave} onClick={()=>onRemoove({id, url, title, img, isPinned, isActive:true})} className="hidden"><img src="/close.png"></img></button>
            <div className="absolute right-0 h-[16px] border-r-2 border-[#F1F5F8]" ></div>
        </div>
    )
}

export default Tab;