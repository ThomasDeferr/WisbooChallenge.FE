import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDivResponsivePadding = styled.div`
  position: "relative";
  padding: "56.25% 0 0 0";
`;
const StyledDivResponsiveWrapper = styled.div`
  position: "absolute";
  width: "100%";
  height: "100%";
  left: "0";
  top: "0";
`;
const StyledDivWistiaEmbed = styled.div`
  height: "100%";
  width: "100%";
`;

const WistiaPlayer = ({ hashedId, ...embedOptions }) => {
  window._wq = window._wq || [];
  window._wq.push({
    id: hashedId,
    options: embedOptions,
  });

  useEffect(() => {
    if (!document.getElementById("wistia_script")) {
      var wistiaScript = document.createElement("script");
      wistiaScript.id = "wistia_script";
      wistiaScript.type = "text/javascript";
      wistiaScript.src = "https://fast.wistia.com/assets/external/E-v1.js";
      wistiaScript.async = true;
      document.body.appendChild(wistiaScript);
    }

    window._wq = window._wq || [];
    window._wq.push({
      id: hashedId,
      options: embedOptions,
      // onEmbedded: (video) => {
      // console.log(video);
      //   this.handle = video;
      // },
    });

    // return () => {
    //   this.handle && this.handle.remove();
    // };
  }, []);

  return (
    <StyledDivResponsivePadding className="wistia_responsive_padding">
      <StyledDivResponsiveWrapper className="wistia_responsive_wrapper">
        <StyledDivWistiaEmbed
          className={`wistia_embed wistia_async_${hashedId} videoFoam=true`}
        >
          &nbsp;
        </StyledDivWistiaEmbed>
      </StyledDivResponsiveWrapper>
    </StyledDivResponsivePadding>
  );
};

WistiaPlayer.propTypes = {
  hashedId: PropTypes.string.isRequired,
};

export default WistiaPlayer;
