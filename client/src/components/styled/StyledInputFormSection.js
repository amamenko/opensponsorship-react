import styled from "styled-components";

const StyledInputFormSection = styled.div`
  background: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-top: 10vh;
  position: relative;

  @media (max-width: 767px) {
    max-width: 18rem;
  }

  @media (min-width: 52rem) {
    width: 50%;
    max-width: none;
  }
`;

export default StyledInputFormSection;
