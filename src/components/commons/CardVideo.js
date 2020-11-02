import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Card } from "antd";

const { Meta } = Card;

const StyledCard = styled(Card)`
  width: 240px;
  margin: 20px 10px;
`;
const StyledImage = styled.img`
  height: 120px;
`;

const CardVideo = ({ video, onClick }) => {
  const { alt, src, title, countComments } = video;

  return (
    <StyledCard
      hoverable
      cover={<StyledImage alt={alt} src={src} />}
      onClick={(e) => onClick({ e, video })}
    >
      <Meta title={title} description={countComments} />
    </StyledCard>
  );
};

CardVideo.defaultProps = {
  placeholder: "",
  onClick: () => {},
};

CardVideo.propTypes = {
  video: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default CardVideo;
