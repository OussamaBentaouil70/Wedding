import React from 'react';

interface HeaderVideoProps {
  videoUrl?: string;
  title: string;
  subtitle?: string;
}

const HeaderVideo: React.FC<HeaderVideoProps> = ({
  videoUrl = "https://videos.pexels.com/video-files/4954871/4954871-uhd_2560_1440_30fps.mp4",
  title,
  subtitle
}) => {
  return (
    <header className="header-video-container">
      <div className="video-overlay"></div>
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="header-content fade-in">
        <h1 className="header-title">{title}</h1>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>
    </header>
  );
};

export default HeaderVideo;
