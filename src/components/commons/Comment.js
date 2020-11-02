import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const StyledDivDescription = styled.div`
  width: 100%;
  font-size: 14px;
`;
const StyledDivDateTime = styled.div`
  width: 100%;
  font-size: 14px;
  font-style: italic;
  color: gray;
`;

const Comment = ({ content, datetime }) => {
  return (
    <StyledDivContainer>
      <StyledDivDescription>{content}</StyledDivDescription>
      <StyledDivDateTime>{datetime}</StyledDivDateTime>
    </StyledDivContainer>
  );
};

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  datetime: PropTypes.string.isRequired,
};

export default Comment;
