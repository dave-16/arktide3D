//@ts-nocheck
import React from "react";
import { Stack, Tooltip, Avatar, useMediaQuery } from "@mui/material";

export const VIEWS = {
    isometric: {
      label: 'Isometric View',
      position: [-30, 6, 60],
      bg:'/travel1.png'
    },
    profile: {
      label: 'Profile View',
      position: [0, 20, 0], // Adjust as needed
      bg:'/view1.png'
    },
    plan: {
      label: 'Plan View',
      position: [0, 0, 60], // Adjust as needed
      bg:'/strategy1.png'
    },
  }as const;                                                    
  interface ViewProps {
    selectedView: string;
    handleView: (view: string) => void;
  }
  
  const Views = ({ selectedView, handleView }: ViewProps) => {
    const isMobile = useMediaQuery('(max-width:900px)');
  
    const viewStyle = {
      borderRadius: '50%', // Circular shape for view buttons
      cursor: 'pointer',
      width: isMobile ? 36 : 40,
      height: isMobile ? 36 : 40,
    };
    
  
    const borderStyle = '3px solid #131414';
  
    return (
      <Stack
        position="absolute"
        left={16}
        top={26}
        direction="row"
        spacing={1}
        borderRadius="0.5rem"
        border="1px dashed #131414"
        padding={{ xs: '10px', sm: '13px' }}
        sx={{ backdropFilter: 'blur(5px)' }}
      >
        {Object.keys(VIEWS).map((viewKey) => (
          <Tooltip  key={viewKey} title={VIEWS[viewKey].label} role="tooltip">
            <Avatar
            className="tetete"
              onClick={() => handleView(viewKey as keyof typeof VIEWS)}
              style={{
                ...viewStyle,
                // backgroundColor: selectedView === viewKey ? '#aaa' : 'black',
                backgroundImage:`url(${VIEWS[viewKey].bg})`,
                border: selectedView === viewKey ? borderStyle : '8px',
              }}
            >
              {' '}
            </Avatar>
          </Tooltip>
        ))}
      </Stack>
    );
  };
  
  export default Views;