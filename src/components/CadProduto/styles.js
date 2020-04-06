import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > header {
    margin: 20px 0;
  }
`;
export const Register = styled.div`
  display: flex;
  justify-content: center;

  form.form {
    background: #36393f;
    border-radius: 5px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    padding: 40px;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    p {
      color: #f30800e5;
      margin-bottom: 15px;
      border: 1px solid #f30800e5;
      padding: 10px;
      text-align: center;
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

    select {
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
        color: #000;
      }
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

    button.cancelar {
      background-color: #ff5050;
      margin-top: -15px;
    }

    button.cancelar:hover {
      background-color: #cc0000;
    }
  }
`;

export const Pesquisa = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  input {
    height: 55px;
    margin: 10px 10px;
    padding: 0 20px;
    border: 0;
    background: #fff;
    font-size: 18px;
    color: #444;
    border-radius: 3px;
  }

  button {
    margin: 10px 0;
    height: 55px;
    font-size: 12px;
    font-weight: bold;
    background: #7289da;
    border-radius: 3px;
    border: 0;
    color: #fff;
    padding: 0 10px;
    text-transform: uppercase;

    transition: background-color 0.15s ease;

    &:hover {
      background: #5f73bc;
    }
  }
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const PedidosList = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 10px 10px;

  display: flex;
  flex-direction: column;

  header {
    background: ${props => (props.naoDisponivel ? "#ff5050" : "#7289da")};
    color: #fff;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      color: #fff;
      background: none;
      border: none;
      font-size: 16px;
      transition: 0.15s ease;
      &:hover {
        color: #d9d9d9;
      }
    }

    strong {
      font-size: 15px;
    }

    small {
      font-size: 14px;
      color: #fff;
    }
  }

  ul {
    list-style: none;
    flex-direction: row;

    li {
      font-weight: bold;
      padding: 12px 20px;
      color: #000;

      small {
        font-weight: normal;
        font-size: 15px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }

      ul {
        margin: 10px -15px 0 -15px;
        li {
          &:nth-child(2n - 1) {
            background: #fff;
            border-radius: 3px;
          }
        }
      }
    }
  }
`;

export const Form = styled.form``;
