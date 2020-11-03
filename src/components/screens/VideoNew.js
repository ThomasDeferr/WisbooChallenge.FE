import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Divider, Input, Space, Modal } from "antd";
import WistiaUploader from "../commons/WistiaUploader";
import useFetch from "../../hooks/useFetch";
import { API_ENDPOINTS, WISTIA_DATA_API_ENDPOINTS } from "../../config/api";

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledDivToolbar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const StyledWistiaUploader = styled(WistiaUploader)`
  width: 100%;
`;
const StyledLabel = styled.label`
  width: 100%;
  margin-top: 20px;
`;
const StyledInput = styled(Input)`
  margin-top: 5px;
`;
const StyledInputColor = styled.input`
  width: 135px;
  height: 30px;
  padding: 2px;
`;

const VideoNew = ({ onSuccess, onCancel }) => {
  const [hashed_id, setHashedId] = useState("");
  const [thumbnail_url, setThumbnailUrl] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#0000ff");

  //Fetch POST
  const [fetchBody, setFetchBody] = useState();
  const [
    doFetchPost,
    { isCompleted: isCompletedPost, isSuccess: isSuccessPost },
  ] = useFetch({
    url: API_ENDPOINTS.VIDEO_MEDIAS,
    options: { method: "POST" },
    body: fetchBody,
  });
  //

  //Fetch DELETE
  const [doFetchDelete, { isCompleted: isCompletedDelete }] = useFetch({
    url: `${WISTIA_DATA_API_ENDPOINTS.MEDIAS}/${hashed_id}.json`,
    options: { method: "DELETE" },
    params: { access_token: process.env.REACT_APP_WISTIA_ACCESS_TOKEN },
  });
  //

  //useEffect POST
  useEffect(() => {
    fetchBody && doFetchPost();
  }, [fetchBody]); // eslint-disable-line

  useEffect(() => {
    isCompletedPost && isSuccessPost && onSuccess();
  }, [isCompletedPost, isSuccessPost]); // eslint-disable-line
  //

  //useEffect DELETE
  useEffect(() => {
    isCompletedDelete && onCancel();
  }, [isCompletedDelete]); // eslint-disable-line
  //

  const validateData = () => {
    var hasError = false;
    var message = "";

    if (!hashed_id) {
      hasError = true;
      message += "El Video es obligatorio.\n";
    }
    if (!title) {
      hasError = true;
      message += "El Título del video es obligatorio.\n";
    }

    hasError &&
      Modal.warning({
        title: "Datos obligatorios",
        content: message.split("\n").map((msj, i) => <div key={i}>{msj}</div>),
      });

    return !hasError;
  };
  const handleUploadVideo = (e) => {
    validateData() &&
      setFetchBody({
        hashed_id,
        title,
        color: color.replace("#", ""),
        thumbnail_url,
      });
    e.preventDefault();
  };
  const handleCancel = (e) => {
    hashed_id ? doFetchDelete() : onCancel();
    e.preventDefault();
  };

  return (
    <StyledDivContainer>
      <StyledWistiaUploader
        playerColor={color}
        setHashedId={setHashedId}
        setThumbnailUrl={setThumbnailUrl}
      />

      <StyledLabel>
        Título
        <StyledInput
          placeholder="Título del video"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </StyledLabel>

      <StyledLabel>
        <div>Color del reproductor</div>
        <StyledInputColor
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </StyledLabel>

      <Divider />

      <StyledDivToolbar>
        <Space>
          <Button type="default" danger onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="primary" onClick={handleUploadVideo}>
            Subir video
          </Button>
        </Space>
      </StyledDivToolbar>
    </StyledDivContainer>
  );
};

VideoNew.defaultProps = {
  onSuccess: () => {},
  onCancel: () => {},
};

VideoNew.propTypes = {
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

export default VideoNew;
