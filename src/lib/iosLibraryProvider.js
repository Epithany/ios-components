import { useState, createContext } from "react";

export const isOpenContext = createContext();

export function IosLibraryProvider({children}){
  const [openFolderId, setOpenFolderId] = useState(null);

  return(
    <isOpenContext.Provider value={{ openFolderId, setOpenFolderId }}>
      {children}
    </isOpenContext.Provider>
  )
}
