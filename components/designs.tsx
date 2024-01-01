//@ts-nocheck
import { useState } from 'react';
import { Button, Stack } from "@mui/material";
import Colors from "./color";
import Views from './views';
 // Import your Colors3 component

const Designs = () => {
  const [mode, setMode] = useState('');

  const handleButtonClick = (clickedMode) => {
    setMode(clickedMode);
  };

  return (
    <Stack
      position="absolute"
      left={16}
      bottom={16}
      width={330}
      direction="row"
      spacing={1}
      borderRadius="0.5rem"
      border="1px dashed #131414"
      padding={{ xs: '56px', sm: '13px' }}
      sx={{ backdropFilter: 'blur(5px)' }}
    >
     
    </Stack>
  );
};

export default Designs;
