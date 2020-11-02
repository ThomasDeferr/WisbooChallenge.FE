import React, { Fragment, useState } from "react";
import styled from "styled-components";
import SectionTitle from "../commons/SectionTitle";
import { Button } from "antd";
import CardVideo from "../commons/CardVideo";
import Modal from "antd/lib/modal/Modal";
import VideoNew from "./VideoNew";
import VideoDetail from "./VideoDetail";

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledDivToolbar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: right;
`;
const StyledDivVideosContainer = styled.div`
  width: 100%;
  height: 50px;
  padding: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const videos = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
  {
    id: 10,
  },
];

const VideoList = () => {
  const [modalNewVideoVisible, setModalNewVideoVisible] = useState(false);
  const [modalWatchVideoVisible, setModalWatchVideoVisible] = useState(false);
  const [videoSelected, setVideoSelected] = useState(null);

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
        <StyledDivVideosContainer>
          {videos.map((v) => (
            <CardVideo
              key={v.id}
              video={v}
              onClick={({ video }) => openModalWatchVideo(video)}
            />
          ))}
        </StyledDivVideosContainer>
      </StyledDivContainer>
      <Modal
        title="Sube tu video"
        centered
        visible={modalNewVideoVisible}
        footer={null}
        destroyOnClose={true}
        onCancel={closeModalNewVideo}
      >
        <VideoNew />
      </Modal>
      <Modal
        title="*Titulo del video*"
        centered
        visible={modalWatchVideoVisible}
        footer={null}
        destroyOnClose={true}
        onCancel={closeModalWatchVideo}
      >
        <VideoDetail video={videoSelected} />
      </Modal>
    </Fragment>
  );
};

export default VideoList;
