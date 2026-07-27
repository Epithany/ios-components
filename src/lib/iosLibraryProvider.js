import { useState, createContext } from "react";

export const isOpenContext = createContext();

export function IosLibraryProvider({children}){
  const [isOpen, setIsOpen] = useState(false);

  return(
    <isOpenContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </isOpenContext.Provider>
  )
}
