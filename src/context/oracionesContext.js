import React,{useState} from 'react';
import Settings from '../settings.json';

export const OracionesContext = React.createContext()

const OracionesContextProvider = (props) => {
    const [labels, setLabels] = useState( Settings.labels );

    return(
        <OracionesContext.Provider value={[labels, setLabels]}>
            {props.children}
        </OracionesContext.Provider>
    )
}

export default OracionesContextProvider;