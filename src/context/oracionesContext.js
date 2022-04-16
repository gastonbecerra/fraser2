import React,{useState} from 'react';

export const OracionesContext = React.createContext()

const OracionesContextProvider = (props) => {
    const [labels, setLabels] = useState(['positivo', 'negativo', 'neutral-descartar']);

    return(
        <OracionesContext.Provider value={[labels]}>
            {props.children}
        </OracionesContext.Provider>
    )
}

export default OracionesContextProvider;