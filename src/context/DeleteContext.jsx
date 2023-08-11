import { createContext,useState } from "react";

export const DeleteContext = createContext();



export const DeleteContextProvider = ({ children }) => {
  
    const [isOpen,setIsOpen] = useState(false);

    return (
    <DeleteContext.Provider value={{isOpen,setIsOpen}}>
      {children}
    </DeleteContext.Provider>);
  };