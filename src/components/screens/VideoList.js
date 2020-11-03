import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import SectionTitle from "../commons/SectionTitle";
import { Button, Spin } from "antd";
import CardVideo from "../commons/CardVideo";
import Modal from "antd/lib/modal/Modal";
import VideoNew from "./VideoNew";
import VideoDetail from "./VideoDetail";
import { API_ENDPOINTS } from "../../config/api";
import useFetch from "../../hooks/useFetch";
import { sortDescending } from "../../helpers/methods";

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledDivToolbar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const StyledDivVideosContainer = styled.div`
  width: 100%;
  height: 50px;
  padding: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const StyledSpin = styled(Spin)`
  width: 100%;
  height: 50px;
  margin-top: 30px;
`;

const VideoList = () => {
  const [modalNewVideoVisible, setModalNewVideoVisible] = useState(false);
  const [modalWatchVideoVisible, setModalWatchVideoVisible] = useState(false);
  const [videoMedias, setVideoMedias] = useState([]);
  const [videoSelected, setVideoSelected] = useState(null);
  const [videoAdded, setVideoAdded] = useState(false);

  const [doFetchGet, { response, loading }] = useFetch({
    url: API_ENDPOINTS.VIDEO_MEDIAS,
  });

  useEffect(() => doFetchGet(), []); // eslint-disable-line
  useEffect(() => {
    if (videoAdded) {
      doFetchGet();
      setModalNewVideoVisible(false);
      setVideoAdded(false);
    }
  }, [videoAdded]); // eslint-disable-line

  useEffect(() => {
    var result = sortDescending(response?.results ?? [], "id");
    setVideoMedias(result);
  }, [response]);

  useEffect(() => {
    if (videoSelected) {
      var result = [
        ...videoMedias.filter((v) => v.id !== videoSelected.id),
        videoSelected,
      ];
      result = sortDescending(result, "id");
      setVideoMedias(result);
    }
  }, [videoSelected]); // eslint-disable-line

  const openModalNewVideo = () => setModalNewVideoVisible(true);
  const closeModalNewVideo = () => setModalNewVideoVisible(false);
  const openModalWatchVideo = (video) => {
    setVideoSelected(video);
    setModalWatchVideoVisible(true);
  };
  const closeModalWatchVideo = () => {
    setVideoSelected(null);
    setModalWatchVideoVisible(false);
  };

  return (
    <Fragment>
      <StyledDivContainer>
        <StyledDivToolbar>
          <Button type="default" onClick={openModalNewVideo}>
            Agregar video
          </Button>
        </StyledDivToolbar>
        <SectionTitle title="Librería de videos" />
        {loading ? (
          <StyledSpin size="large" />
        ) : (
          <StyledDivVideosContainer>
            {videoMedias.map((v) => (
              <CardVideo
                key={v.id}
                video={v}
                onClick={({ video }) => openModalWatchVideo(video)}
              />
            ))}
          </StyledDivVideosContainer>
        )}
      </StyledDivContainer>

      <Modal
        title="Sube tu video"
        width={750}
        centered
        maskClosable={false}
        visible={modalNewVideoVisible}
        footer={null}
        destroyOnClose={true}
        onCancel={closeModalNewVideo}
      >
        <VideoNew
          onSuccess={() => setVideoAdded(true)}
          onCancel={closeModalNewVideo}
        />
      </Modal>

      <Modal
        title={videoSelected?.title}
        width={750}
        centered
        visible={modalWatchVideoVisible}
        footer={null}
        destroyOnClose={true}
        onCancel={closeModalWatchVideo}
      >
        {videoSelected && (
          <VideoDetail
            videoMedia={videoSelected}
            setVideoMedia={setVideoSelected}
          />
        )}
      </Modal>
    </Fragment>
  );
};

export default VideoList;
