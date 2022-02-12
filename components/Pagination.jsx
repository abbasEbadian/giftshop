import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled({handleChange, page, size }) {
  
  return (
    <Stack spacing={2} sx={{display: "flex", justifyContent: "center"}}>
      <Pagination count={Math.ceil(size/20)} page={page} onChange={handleChange} />
    </Stack>
  );
}