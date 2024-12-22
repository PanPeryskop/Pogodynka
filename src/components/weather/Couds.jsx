import React from 'react';
import styled from 'styled-components';

const Clouds = () => {
  return (
    <StyledWrapper>
      <div className="loader">
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
`;

export default Clouds;