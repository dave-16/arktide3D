import React from "react";
import { Stack, Tooltip, Avatar, useMediaQuery } from "@mui/material";

export const COLORS = {
  white: "#ffffff",
  lightBlue:"#1f8787",
  darkBlue:"#081b74",
  taupe: "#a19b87",
  copper: "#745120",
  grey: "#386bad",
  roof: "#faf9f6",
  foundation: "#9b9998",
  shadow: "#696969",
  ground: "#dbd9d9",
  gyp: "#faf9f6",
};

interface ColorProps {
  coquinaColor: string;
  handleColor: (color: string) => void;
}

const Colors = ({ coquinaColor, handleColor }: ColorProps) => {
  const isMobile = useMediaQuery("(max-width:900px)");

  const colorStyle = {
    borderRadius: "10rem",
    cursor: "pointer",
    width: isMobile ? 36 : 40,
    height: isMobile ? 36 : 40,
  };

  const borderStyle = "3px solid #131414";

  return (
    <Stack
      position="absolute"
      left={-8}
      
      bottom={68}
      direction="row"
      spacing={1}
      borderRadius="0.5rem"
      border="1px dashed #131414"
      padding={{ xs: "10px", sm: "13px" }}
      sx={{ backdropFilter: "blur(5px)" }}
    >
      <Tooltip title="White" role="tooltip">
        <Avatar
          onClick={() => handleColor(COLORS.white)}
          style={{
            ...colorStyle,
            backgroundColor: COLORS.white,
            border: coquinaColor === COLORS.white ? borderStyle : "",
          }}
        >
          {" "}
        </Avatar>
      </Tooltip>
      <Tooltip title="LightTile" role="tooltip">
        <Avatar
          onClick={() => handleColor(COLORS.lightBlue)}
          style={{
            ...colorStyle,
            backgroundColor: COLORS.lightBlue,
            border: coquinaColor === COLORS.taupe ? borderStyle : "",
          }}
        >
          <span data-testid="taupe-option"> </span>
        </Avatar>
      </Tooltip>
      <Tooltip title="DarkBlue" role="tooltip">
        <Avatar
          onClick={() => handleColor(COLORS.darkBlue)}
          style={{
            ...colorStyle,
            backgroundColor: COLORS.darkBlue,
            border: coquinaColor === COLORS.taupe ? borderStyle : "",
          }}
        >
          <span data-testid="taupe-option"> </span>
        </Avatar>
      </Tooltip>
      <Tooltip title="Wooden" role="tooltip">
        <Avatar
          onClick={() => handleColor(COLORS.copper)}
          style={{
            ...colorStyle,
            backgroundColor: COLORS.copper,
            border: coquinaColor === COLORS.copper ? borderStyle : "",
          }}
        >
          {" "}
        </Avatar>
      </Tooltip>
      <Tooltip title="LightBlue" role="tooltip">
        <Avatar
          onClick={() => handleColor(COLORS.grey)}
          style={{
            ...colorStyle,
            backgroundColor: COLORS.grey,
            border: coquinaColor === COLORS.grey ? borderStyle : "",
          }}
        >
          {" "}
        </Avatar>
      </Tooltip>
    </Stack>
  );
};

export default Colors;
