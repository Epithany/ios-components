import { useState, createContext } from "react";

export const isOpenContext = createContext();

export function iosLibraryProvider({children}){
  const [isOpen, setIsOpen] = useState(false);

  return(
    <isOpenContext.Provider value={isOpen}>
      {children}
    </isOpenContext.Provider>
  )
}