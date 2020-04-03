import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
  margin-top: 50px;
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

export const ContainerPedidos = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  color: #000;
  margin-top: 50px;
`;

export const Produto = styled.li`
  div.produto-container {
    background-color: #000;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 3px;

    small {
      color: #fff;
    }

    div.header-produto {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3px;
    }

    div.descricao-produto {
      margin-bottom: 3px;
    }

    div.footer-produto {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const PedidosList = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 10px 10px;

  display: flex;
  flex-direction: column;

  header {
    background: ${props => (props.naoEntregue ? "#63f5b0" : "#7289da")};
    color: ${props => (props.naoEntregue ? "#000" : "#fff")};
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      color: ${props => (props.naoEntregue ? "#000" : "#fff")};
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
      color: ${props => (props.naoEntregue ? "#000" : "#fff")};
    }
  }

  ul {
    list-style: none;
    flex-direction: row;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 15px;
        color: #999;
        font-style: italic;
      }

      small.endereco {
        font-size: 18px;
        margin-right: 3px;
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

    div.total {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

export const Footer = styled.div`
  width: 600px;
  justify-content: space-around;
  margin: 10px 20px;

  display: flex;
  flex-wrap: wrap;

  button {
    margin: 10px 0;
    height: 35px;
    font-size: 12px;
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

export const Dados = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid #fff;
  border-radius: 3px;
  padding: 10px;

  strong {
    display: flex;
    justify-content: space-between;
    color: #fff;

    small {
      color: #fff;
      font-weight: bold;
      font-size: 15px;
      border: 1px solid #fff;
      border-radius: 3px;
      padding: 2px;
      margin-left: 5px;
      margin-top: 2px;
    }
  }
`;
