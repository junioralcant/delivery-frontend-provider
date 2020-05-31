import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  height: 100vh;
  background: #202225;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  background: #36393f;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  padding: 40px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  h2 {
    font-size: 26px;
    font-weight: 500;
    text-align: center;
    margin: 0 0 10px;
    color: #fff;
  }

  input {
    height: 40px;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background: rgba(0, 0, 0, 0.1);
    color: #f6f6f6;
    margin-top: 8px;
    transition: border 0.15s ease;
    font-size: 16px;

    &:focus {
      border-color: #7289da;
    }
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }

  button {
    margin: 20px 0;
    height: 44px;
    font-size: 18px;
    background: #7289da;
    border-radius: 3px;
    transition: background-color 0.15s ease;
    border: 0;
    color: #fff;
    font-size: 12px;
    padding: 0 10px;
    text-transform: uppercase;
    font-weight: 700;

    &:hover {
      background: #5f73bc;
    }
  }
`;
