import { useState, useEffect} from "react"
import { TabProps } from "../types/TabProps";
import Tab from "./tab"

export default function Tabs(){
    const [tabList, setTabList] = useState<TabProps[]>([]);


    useEffect(()=>{
        setTabList([
            {
                id: '1',
                url:"https://www.google.com",
                title:"Google",
                img:"https://www.google.com/favicon.ico",
                isPinned:false,
                isActive:false
            },
            {
                id: '2',
                url:"https://www.google.com",
                title:"Google",
                img:"https://www.google.com/favicon.ico",
                isPinned:false,
                isActive:false
            },
            {
                id: '3',
                url:"https://www.google.com",
                title:"Google",
                img:"https://www.google.com/favicon.ico",
                isPinned:false,
                isActive:false
            }
        ])
    },[]);

    function handleClickActive(tab: TabProps, e:React.MouseEvent<HTMLButtonElement>){
        let newTabList = tabList.map((t)=>{
            if(t.id === tab.id){
                return {...t, isActive:true}
            }
            else{
                return {...t, isActive:false}
            }
        })
        setTabList(newTabList);
        e.currentTarget.style.backgroundColor = "#FEFEFE";
    }

    function habdleRemoove(tab: TabProps){
        let newTabList = tabList.filter(t=>{
            if(t.id!==tab.id)
                return {...t}
        })
        setTabList(newTabList);
    }

    return(
        <div className="flex h-[48px] absolute bg-[#FEFEFE] w-full left-0 top-0 z-50 ">
           {tabList.map((tab) =>{
                return (<Tab key={tab.id} id={tab.id} url={tab.url} title={tab.title} img={tab.img} isPinned={tab.isPinned} isActive={tab.isActive} onClick={handleClickActive} onRemoove={habdleRemoove}/>)
            }
           )}
           
        </div>
    )
}