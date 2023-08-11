import { createContext,useState } from "react";

export const EditContext = createContext();



export const EditContextProvider = ({ children }) => {
  
    const [isOpen,setIsOpen] = useState(false);

    return (
    <EditContext.Provider value={{isOpen,setIsOpen}}>
      {children}
    </EditContext.Provider>);
  };