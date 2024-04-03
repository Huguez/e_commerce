
import { create } from 'zustand'

interface State {
   isSidebarShow : boolean;
   openSidebar:  () => void;
   closeSidebar: () => void;
}

const funcUIStore = create<State>()

export const useUI = funcUIStore( ( set ) => ({
   isSidebarShow: false,
   openSidebar:  () => { set( { isSidebarShow: true } ); document.body.style.overflow = "hidden" },
   closeSidebar: () => { set( { isSidebarShow: false } ); document.body.style.overflow = "auto" },
}) )
