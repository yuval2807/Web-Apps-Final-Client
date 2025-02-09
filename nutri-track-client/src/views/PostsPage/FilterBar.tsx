import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Box, Button, InputBase, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

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
    <Box display="flex" flexDirection="row" width="50%" alignSelf="center" >
         {/* <TextField  
            margin='normal'
            label='Search by user'
            type='text'
            name='userFilter'
            value={userTempFilter}
            onChange={(e) => setUserTempFilter(e.target.value)}
          /> */}
          <InputBase  
            // margin='normal'
            // label='Search by content type'
            color="primary"
            fullWidth
            type='text'
            name='contentTypeFilter'
            value={contentTypeTempFilter}
            onChange={(e) => setContentTypeTempFilter(e.target.value)}
            sx={{ border: '1px solid #000', borderRadius: '5px', p: 1, height: '5vh' }}
            endAdornment={contentTypeTempFilter.length >= 1 && <Button onClick={() => setContentTypeTempFilter("")}>X</Button>}
            startAdornment={<Search/>}
            
          />
          <Button
            variant='outlined'
            size="small"
            onClick={clearFilters}
            sx={{ ml: 2, height: '5vh' }}>
            Clear All Filters
          </Button>
          <Button
            variant='contained'
            size="small"
            onClick={() => {onFilter(userTempFilter, contentTypeTempFilter)}}
            sx={{ ml: 2, height: '5vh' }}>
            Apply Filters
          </Button>
    </Box>
  );
};
