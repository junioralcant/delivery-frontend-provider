import styled from "styled-components";

export const Container = styled.aside`
  height: 100;
  width: 200px;
  background: #121212;
  color: #b3b3b3;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div {
    padding: 25px;
  }
`;

export const Nav = styled.ul`
  list-style: none;

  li {
    strong {
      text-transform: uppercase;
    }
    a {
      color: inherit;
      text-decoration: none;
      font-size: 13px;
      line-height: 32px;
      font-weight: bold;
      &:hover {
        color: #fff;
      }
    }
  }
`;

export const Sair = styled.button`
  background: transparent;
  border: 0;
  border-top: 1px solid #282828;
  font-size: 13px;
  color: #b3b3b3;
  display: flex;
  padding: 15px 25px;
  transition: 0.15s ease;

  &:hover {
    color: #fff;
  }
`;
