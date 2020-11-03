import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Card } from "antd";

const StyledCard = styled(Card)`
  width: 240px;
  margin: 20px 10px;
`;
const StyledCardMeta = styled(Card.Meta)`
  color: ${(props) => props.color};
`;
const StyledImage = styled.img`
  height: 120px;
`;

const CardVideo = ({ video, onClick }) => {
  const { title, color, thumbnail_url, comments } = video;
  const description = `${comments.length} ${
    comments.length > 1 ? "comentarios" : "comentario"
  }`;

  return (
    <StyledCard
      hoverable
      cover={<StyledImage alt="" src={thumbnail_url} />}
      onClick={(e) => onClick({ e, video })}
    >
      <StyledCardMeta title={title} description={description} color={color} />
    </StyledCard>
  );
};

CardVideo.defaultProps = {
  onClick: () => {},
};

CardVideo.propTypes = {
  video: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default CardVideo;
