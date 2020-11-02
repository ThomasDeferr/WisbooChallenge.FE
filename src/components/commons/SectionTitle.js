import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDivContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
`;
const StyledLabel = styled.label`
  color: #000;
  font-size: 24px;
  font-weight: bold;
`;

const SectionTitle = ({ title }) => {
  return (
    <StyledDivContainer>
      <StyledLabel>{title}</StyledLabel>
    </StyledDivContainer>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionTitle;
