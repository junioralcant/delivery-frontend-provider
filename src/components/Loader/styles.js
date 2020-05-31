import styled from "styled-components";

export const Loader = styled.div`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  border: 5px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7289da;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
`;
