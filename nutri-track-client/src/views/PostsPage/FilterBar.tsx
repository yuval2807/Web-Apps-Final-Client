import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Box, Button, TextField } from "@mui/material";

interface FilterBarData {
    setUserFilter: (userFilter: string) => void;
    setContentTypeFilter: (contentTypeFilter: string) => void;
    onFilter: (user: string, contentType: string) => void;
}

export const FilterBar: React.FC<FilterBarData> = ({setContentTypeFilter, setUserFilter, onFilter}) => {
    const [userTempFilter, setUserTempFilter] = useState<string>("");
    const [contentTypeTempFilter, setContentTypeTempFilter] = useState<string>("");

    const clearFilters = () => {
        setUserTempFilter("");
        setContentTypeTempFilter("");
        setUserFilter("");
        setContentTypeFilter("");
    }

  return (
    <Box display="flex" flexDirection="column" width="20%">
         <TextField  
            margin='normal'
            label='Search by user'
            type='text'
            name='userFilter'
            value={userTempFilter}
            onChange={(e) => setUserTempFilter(e.target.value)}
          />
          <TextField  
            margin='normal'
            label='Search by content type'
            type='text'
            name='contentTypeFilter'
            value={contentTypeTempFilter}
            onChange={(e) => setContentTypeTempFilter(e.target.value)}
          />
          <Button
            variant='contained'
            onClick={clearFilters}
            sx={{ mt: 3 }}>
            Clear All Filters
          </Button>
          <Button
            variant='contained'
            onClick={() => {onFilter(userTempFilter, contentTypeTempFilter)}}
            sx={{ mt: 3 }}>
            Apply Filters
          </Button>
    </Box>
  );
};
