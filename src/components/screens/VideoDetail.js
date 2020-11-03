import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Input, List } from "antd";
import WistiaPlayer from "../commons/WistiaPlayer";
import Comment from "../commons/Comment";
import moment from "moment";
import { API_ENDPOINTS } from "../../config/api";
import useFetch from "../../hooks/useFetch";

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

const VideoDetail = ({ videoMedia, setVideoMedia }) => {
  const { id, hashed_id, color, comments } = videoMedia;
  const commentsSorted = comments.sort(
    (a, b) => moment(b.upload_date).valueOf() - moment(a.upload_date).valueOf()
  );

  const [commentContent, setCommentContent] = useState("");

  const [fetchBody, setFetchBody] = useState();
  const [doFetch, { response, isCompleted, isSuccess }] = useFetch({
    url: API_ENDPOINTS.VIDEO_COMMENTS(id),
    options: { method: "POST" },
    body: fetchBody,
  });

  useEffect(() => {
    fetchBody && doFetch();
  }, [fetchBody]); // eslint-disable-line

  useEffect(() => {
    isCompleted &&
      isSuccess &&
      response &&
      setVideoMedia({
        ...videoMedia,
        comments: [...comments, response],
      });
  }, [isCompleted, isSuccess, response]); // eslint-disable-line

  const handleSendComment = (e) => {
    setFetchBody({ content: commentContent });
    e.preventDefault();
  };

  return (
    <StyledDivContainer>
      <WistiaPlayer hashedId={hashed_id} playerColor={color} />

      <StyledLabelEntryComment>
        Deja tu comentario
        <StyledDivEntryComment>
          <StyledInputComment
            placeholder="Comentario"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <Button type="primary" onClick={handleSendComment}>
            Enviar
          </Button>
        </StyledDivEntryComment>
      </StyledLabelEntryComment>

      <StyledDivCommentsContainer>
        <List
          header={`${commentsSorted.length} comentarios`}
          itemLayout="horizontal"
          pagination={{
            pageSize: 4,
          }}
          dataSource={commentsSorted}
          locale={{ emptyText: <div></div> }}
          renderItem={(item) => (
            <li>
              <Comment
                content={item.content}
                datetime={moment(item.upload_date).format("DD-MM-YYYY HH:mm")}
              />
            </li>
          )}
        />
      </StyledDivCommentsContainer>
    </StyledDivContainer>
  );
};

VideoDetail.propTypes = {
  videoMedia: PropTypes.object.isRequired,
  setVideoMedia: PropTypes.func.isRequired,
};

export default VideoDetail;
