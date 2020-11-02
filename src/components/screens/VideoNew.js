import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Input } from "antd";

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledLabel = styled.label`
  width: 100%;
  margin-top: 20px;
`;
const StyledInput = styled(Input)`
  margin-top: 5px;
`;

const VideoNew = () => {
  const handleSubirVideo = () => {};

  return (
    <StyledDivContainer>
      <div>UPLOAD</div>

      <StyledLabel>
        Título
        <StyledInput placeholder="Título del video" />
      </StyledLabel>

      <StyledLabel>
        Color del reproductor
        <div>COLOR PICKER</div>
      </StyledLabel>

      <div>
        <Button type="primary" onClick={handleSubirVideo}>
          Subir video
        </Button>
      </div>
    </StyledDivContainer>
  );
};

export default VideoNew;
