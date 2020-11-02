import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Input, List, Space } from "antd";
import WistiaPlayer from "../commons/WistiaPlayer";
import Comment from "../commons/Comment";
import moment from "moment";
<div></div>;

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledLabelEntryComment = styled.label`
  width: 100%;
  margin-top: 15px;
`;
const StyledDivEntryComment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`;
const StyledInputComment = styled(Input)`
  margin-right: 10px;
`;
const StyledDivCommentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
`;

const comments = [
  {
    content: "aaa",
    datetime: moment().format("DD-MM-YYYY HH:mm"),
  },
  {
    content: "aaa",
    datetime: moment().format("DD-MM-YYYY HH:mm"),
  },
  {
    content: "aaa",
    datetime: moment().format("DD-MM-YYYY HH:mm"),
  },
  {
    content: "aaa",
    datetime: moment().format("DD-MM-YYYY HH:mm"),
  },
  {
    content: "aaa",
    datetime: moment().format("DD-MM-YYYY HH:mm"),
  },
  {
    content: "aaa",
    datetime: moment().format("DD-MM-YYYY HH:mm"),
  },
  {
    content: "aaa",
    datetime: moment().format("DD-MM-YYYY HH:mm"),
  },
  {
    content: "aaa",
    datetime: moment().format("DD-MM-YYYY HH:mm"),
  },
  {
    content: "aaa",
    datetime: moment().format("DD-MM-YYYY HH:mm"),
  },
  {
    content: "aaa",
    datetime: moment().format("DD-MM-YYYY HH:mm"),
  },
  {
    content: "aaa",
    datetime: moment().format("DD-MM-YYYY HH:mm"),
  },
  {
    content: "aaa",
    datetime: moment().format("DD-MM-YYYY HH:mm"),
  },
];

const VideoDetail = ({ video }) => {
  return (
    <StyledDivContainer>
      <WistiaPlayer hashedId="ba104jh5i9" playerColor="#54bbff" />

      <StyledLabelEntryComment>
        Deja tu comentario
        <StyledDivEntryComment>
          <StyledInputComment placeholder="Comentario" />
          <Button type="primary">Enviar</Button>
        </StyledDivEntryComment>
      </StyledLabelEntryComment>

      <StyledDivCommentsContainer>
        <List
          header={`${comments.length} comentarios`}
          itemLayout="horizontal"
          pagination={{
            pageSize: 4,
          }}
          dataSource={comments}
          renderItem={(item) => (
            <li>
              <Comment content={item.content} datetime={item.datetime} />
            </li>
          )}
        />
      </StyledDivCommentsContainer>
    </StyledDivContainer>
  );
};

VideoDetail.defaultProps = {
  video: null,
};
VideoDetail.propTypes = {
  video: PropTypes.object,
};

export default VideoDetail;
