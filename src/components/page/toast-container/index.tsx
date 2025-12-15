import React, { memo } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

interface WmPageToastProps {
  component: React.ComponentType<any>;
}

const WmPageToast = ({ component: Component }: WmPageToastProps) => {
  return (
    <Container
      style={{
        position: "relative",
        scrollbarWidth: "none",
      }}
      id="toast-container"
      className=" toast-container"
    >
      <Box component="div" className="toast" sx={{ opacity: "1 !important" }}>
        <Container className="parent-custom-toast">
          <Component />
        </Container>
      </Box>
    </Container>
  );
};

export default memo(WmPageToast);
