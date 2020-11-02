import React from "react";
import styled from "styled-components";
import VideoList from "./components/screens/VideoList";

const StyledDivMargins = styled.div`
  padding: 30px 30px;
`;
const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <StyledDivMargins>
      <StyledDivContainer>
        <VideoList />
      </StyledDivContainer>
    </StyledDivMargins>
  );
}

export default App;
