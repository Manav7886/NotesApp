import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [notes, setNotes,onEditNote] = useState([]);
    const [archiveNotes, setArchiveNotes] = useState([]);
    const [deleteNotes, setDeleteNotes] = useState([]);

    return (
        <DataContext.Provider value={{
            notes,
            setNotes,
            archiveNotes,
            setArchiveNotes,
            deleteNotes,
            setDeleteNotes,
            onEditNote
        }}>
            {children}
        </DataContext.Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DataProvider;
