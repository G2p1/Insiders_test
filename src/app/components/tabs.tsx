import { useState, useEffect } from "react";
import { TabProps } from "../types/TabProps";
import Tab from "./tab";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";

export default function Tabs() {
    const [tabList, setTabList] = useState<TabProps[]>([]);
    const { setNodeRef } = useDroppable({
        id: 'tabs',
    })
    useEffect(() => {
        setTabList([
            {
                id: '1',
                url: "https://www.google.com",
                title: "Google",
                img: "https://www.google.com/favicon.ico",
                isPinned: false,
                isActive: false
            },
            {
                id: '2',
                url: "https://www.google.com",
                title: "werwer",
                img: "https://www.google.com/favicon.ico",
                isPinned: false,
                isActive: false
            },
            {
                id: '3',
                url: "https://www.google.com",
                title: "qwer",
                img: "https://www.google.com/favicon.ico",
                isPinned: false,
                isActive: false
            }
        ])
    }, []);

    function handleClickActive(tab: TabProps, e: React.MouseEvent<HTMLButtonElement>) {
        let newTabList = tabList.map((t) => {
            if (t.id === tab.id) {
                return { ...t, isActive: true }
            }
            else {
                return { ...t, isActive: false }
            }
        })
        setTabList(newTabList);
        e.currentTarget.style.backgroundColor = "#FEFEFE";
    }

    function habdleRemoove(tab: TabProps) {
        let newTabList = tabList.filter(t => {
            if (t.id !== tab.id)
                return { ...t }
        })
        setTabList(newTabList);
    }

    function handlePin(tab: TabProps) {
        let isPlaced = false
        let newTabList = [...tabList];
        let i = 0;
        let pos = 0;
        while (true) {
            if (newTabList[i].id === tab.id) {
                pos = i;
                break;
            }
            i++;
        }
        i = 0;
        while (!isPlaced) {
            if (newTabList[i].isPinned === false) {
                [newTabList[i], newTabList[pos]] = [newTabList[pos], newTabList[i]];
                isPlaced = true;
            }
            i++;
        }
        tabList[pos].isPinned = true;
        setTabList(newTabList);
    }


    function handleUnpin(tab: TabProps){
        let newTabList = [...tabList];
        let i = 0;
        let pos = 0;
        while (true) {
            if (newTabList[i].id === tab.id) {
                pos = i;
                break;
            }
            i++;
        }
        newTabList[pos].isPinned = false;
        setTabList(newTabList);
    }

    return (

            <div ref={setNodeRef} className="flex h-[48px] absolute bg-[#FEFEFE] w-full left-0 top-0 z-50"  >
                {tabList.map((tab) => (


                    <Tab key={tab.id} id={tab.id} url={tab.url} title={tab.title} img={tab.img} isPinned={tab.isPinned} isActive={tab.isActive} onClick={handleClickActive} onRemoove={habdleRemoove} onPin={handlePin} onUnpin={handleUnpin} />

                ))}
            </div>
    )
}