import React from 'react';
import styled from 'styled-components';

const Rainy = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="snow">
          <span style={{ '--i': 11 }} />
          <span style={{ '--i': 12 }} />
          <span style={{ '--i': 15 }} />
          <span style={{ '--i': 17 }} />
          <span style={{ '--i': 18 }} />
          <span style={{ '--i': 13 }} />
          <span style={{ '--i': 14 }} />
          <span style={{ '--i': 19 }} />
          <span style={{ '--i': 20 }} />
          <span style={{ '--i': 10 }} />
          <span style={{ '--i': 18 }} />
          <span style={{ '--i': 13 }} />
          <span style={{ '--i': 14 }} />
          <span style={{ '--i': 19 }} />
          <span style={{ '--i': 20 }} />
          <span style={{ '--i': 10 }} />
          <span style={{ '--i': 18 }} />
          <span style={{ '--i': 13 }} />
          <span style={{ '--i': 14 }} />
          <span style={{ '--i': 19 }} />
          <span style={{ '--i': 20 }} />
          <span style={{ '--i': 10 }} />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    position: relative;
    width: 110px;
    height: 30px;
    background: #fff;
    border-radius: 100px;
  }

  .loader::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 10px;
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 40px 0 0 20px #fff;
  }

  .snow {
    position: relative;
    display: flex;
    z-index: 1;
  }

  .snow span {
    position: relative;
    width: 3px;
    height: 3px;
    background: #fff;
    margin: 0 2px;
    border-radius: 50%;
    animation: snowing 5s linear infinite;
    animation-duration: calc(15s / var(--i));
    transform-origin: bottom;
  }

  @keyframes snowing {
    0% {
      transform: translateY(0px);
    }

    70% {
      transform: translateY(100px) scale(1);
    }

    100% {
      transform: translateY(100px) scale(0);
    }
  }`;

export default Rainy;
