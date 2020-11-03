import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDivResponsiveUploader = styled.div`
  height: 360px;
  width: 100%;
`;

const WistiaUploader = ({ setHashedId, setThumbnailUrl, playerColor }) => {
  useEffect(() => {
    if (!document.getElementById("wistia_uploader_script")) {
      var wistiaScript = document.createElement("script");
      wistiaScript.id = "wistia_uploader_script";
      wistiaScript.type = "text/javascript";
      wistiaScript.src = "https://fast.wistia.com/assets/external/api.js";
      wistiaScript.async = true;
      document.body.appendChild(wistiaScript);
    }

    window._wapiq = window._wapiq || [];
    window._wapiq.push(function (W) {
      window.wistiaUploader = new W.Uploader({
        accessToken: process.env.REACT_APP_WISTIA_ACCESS_TOKEN,
        projectId: process.env.REACT_APP_WISTIA_PROJECT_ID,
        dropIn: "wistia_uploader",
        embedCodeOptions: {
          playerColor: `#${playerColor}`,
          embedType: "async_popover",
        },
      });
      window.wistiaUploader.bind("uploadembeddable", function (file, media) {
        setHashedId(media.id);
        setThumbnailUrl(media.thumbnail.url);
      });
    });
  }, []);

  return (
    <StyledDivResponsiveUploader id="wistia_uploader"></StyledDivResponsiveUploader>
  );
};

WistiaUploader.defaultProps = {
  setHashedId: () => {},
  setThumbnailUrl: () => {},
  playerColor: "ffffff",
};

WistiaUploader.propTypes = {
  setHashedId: PropTypes.func,
  setThumbnailUrl: PropTypes.func,
  playerColor: PropTypes.string,
};

export default WistiaUploader;
