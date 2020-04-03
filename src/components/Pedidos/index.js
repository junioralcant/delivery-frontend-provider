import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale/pt";
import { IoMdTrash } from "react-icons/io";
import io from "socket.io-client";

import api from "../../services/api";

import { formatPrice } from "../../utils/format";

import PushNotification from "../../utils/PushNotification";

import {
  Container,
  ContainerPedidos,
  Produto,
  PedidosList,
  Pesquisa,
  Footer,
  Dados
} from "./styles";

import Soud from "../../audios/Soud.mp3";

export default function Pedidos({ match }) {
  const [pedidos, setPedidos] = useState([]);
  const [pedidosInfo, setPedidosInfo] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [dataMin, setDataMin] = useState("");
  const [dataMax, setDataMax] = useState("");

  useEffect(() => {
    async function loadPedidos(page = numberPage) {
      const response = await api.get(`/pedidos?page=${page}`);
      const { docs, ...pedidoResto } = response.data;

      setPedidos(docs);
      setPedidosInfo(pedidoResto);
    }

    loadPedidos();
  }, [numberPage]);

  const audio = new Audio(Soud);

  useEffect(() => {
    const socket = io("http://localhost:3001/");

    socket.on("createPedido", message => {
      async function load() {
        const response = await api.get(`/pedidos`);
        const { docs, ...pedidoResto } = response.data;

        setPedidos(docs);
        setPedidosInfo(pedidoResto);
        audio.play();
      }

      load();
    });
  }, [audio]);

  async function filterNome(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/pedidos?nome=${e.target.value}`);
      setPedidos(response.data.docs);
    } else {
      const response = await api.get("/pedidos");
      setPedidos(response.data.docs);
    }
  }

  async function filterData() {
    const response = await api.get(
      `/pedidos?data_min=${dataMin}&data_max=${dataMax}`
    );
    const { docs, ...pedidoResto } = response.data;
    setPedidos(docs);
    setPedidosInfo(pedidoResto);
  }
  function filterDataMin(e) {
    if (e.target.value !== "") {
      setDataMin(e.target.value);
    } else {
      setDataMin("");
    }
  }

  function filterDataMax(e) {
    if (e.target.value !== "") {
      setDataMax(e.target.value);
    } else {
      setDataMax("");
    }
  }

  async function destroy(id) {
    await api.delete(`pedidos/${id}`);

    const response = await api.get("/pedidos");
    const { docs, ...pedidoResto } = response.data;
    setPedidos(docs);
    setPedidosInfo(pedidoResto);
  }

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === pedidosInfo.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <Container>
      <Pesquisa>
        <input
          type="text"
          name="filterNome"
          placeholder="Pesquisar por nome"
          onChange={filterNome}
        />
        <input
          type="date"
          name="dataInicio"
          placeholder="Data início"
          onChange={filterDataMin}
        />
        <input
          type="date"
          name="dataFim"
          placeholder="Data fim"
          onChange={filterDataMax}
        />
        <button onClick={filterData}>Pesquisar</button>
      </Pesquisa>
      <ContainerPedidos>
        {pedidos.map(pedido => {
          const dataPedido = format(pedido.createdAt, "DD-MM-YYYY H:mm", {
            locale: pt
          });

          return pedido.entregue === false ? (
            <PedidosList naoEntregue key={pedido._id}>
              <header>
                <button
                  onClick={e => {
                    if (
                      window.confirm(
                        `Deseja realmente deletar o pedido do(a) cliente ${pedido.nomeCliente}?`
                      )
                    )
                      destroy(pedido._id);
                    PushNotification.pushNotification(
                      pedido.userOneSignalId,
                      "Seu pedido foi cancelado."
                    );
                  }}
                >
                  <IoMdTrash />
                </button>
                <strong>{pedido.nomeCliente}</strong>
                <small>{dataPedido}</small>
              </header>
              <ul>
                <li>
                  Produtos
                  <ul>
                    <Produto>
                      {pedido.produto.map(produto => (
                        <div key={produto._id} className="produto-container">
                          <div className="header-produto">
                            <strong>{produto.produtoId.nome}</strong>{" "}
                            <strong>
                              {formatPrice(produto.produtoId.preco)}
                            </strong>
                          </div>
                          <div className="descricao-produto">
                            <small>{produto.produtoId.descricao}</small>
                          </div>
                          <div className="footer-produto">
                            <div>
                              <small>Valor: </small>{" "}
                              <strong>{formatPrice(produto.valor)}</strong>
                            </div>
                            <div>
                              <small>QTD: </small>{" "}
                              <strong>{produto.quantidade}</strong>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Produto>
                  </ul>
                </li>

                <li>
                  <div className="total">
                    <strong>Total: </strong>{" "}
                    <strong style={{ marginLeft: 4 }}>
                      {" "}
                      {formatPrice(pedido.valorTotal)}
                    </strong>
                  </div>
                </li>
                <li>
                  Endereço
                  {pedido.enderecoEntrega.map(end => {
                    return (
                      <ul key={end._id}>
                        <li className="endereco">
                          <small className="endereco">Rua: </small>{" "}
                          <strong>{end.rua}</strong>
                        </li>
                        <li className="endereco">
                          <small className="endereco">Bairro: </small>{" "}
                          <strong>{end.bairro}</strong>
                        </li>
                        <li className="endereco">
                          <small className="endereco">Número: </small>
                          <strong>{end.numeroCasa}</strong>
                        </li>
                      </ul>
                    );
                  })}
                </li>
              </ul>
            </PedidosList>
          ) : (
            <PedidosList key={pedido._id}>
              <header>
                <button
                  onClick={e => {
                    if (
                      window.confirm(
                        `Deseja realmente deletar o pedido do(a) cliente ${pedido.cliente.nome}?`
                      )
                    )
                      destroy(pedido._id);
                  }}
                >
                  <IoMdTrash />
                </button>
                <strong>{pedido.nomeCliente}</strong>
                <small>{dataPedido}</small>
              </header>
              <ul>
                <li>
                  Produtos
                  <ul>
                    <Produto>
                      {pedido.produto.map(produto => (
                        <div key={produto._id} className="produto-container">
                          <div className="header-produto">
                            <strong>{produto.produtoId.nome}</strong>{" "}
                            <strong>R$ {produto.produtoId.preco}</strong>
                          </div>
                          <div className="descricao-produto">
                            <small>{produto.produtoId.descricao}</small>
                          </div>
                          <div className="footer-produto">
                            <div>
                              <small>Valor: </small>{" "}
                              <strong>R$ {produto.valor}</strong>
                            </div>
                            <div>
                              <small>QTD: </small>{" "}
                              <strong>{produto.quantidade}</strong>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Produto>
                  </ul>
                </li>

                <li>
                  <div className="total">
                    <strong>Total: </strong>{" "}
                    <strong style={{ marginLeft: 4 }}>
                      {" "}
                      R${pedido.valorTotal}
                    </strong>
                  </div>
                </li>

                <li>
                  Endereço
                  {pedido.enderecoEntrega.map(end => {
                    return (
                      <ul key={end._id}>
                        <li>
                          Rua: <small>{end.rua}</small>
                        </li>
                        <li>
                          Bairro: <small>{end.bairro}</small>
                        </li>
                        <li>
                          Número: <small>{end.numeroCasa}</small>
                        </li>
                      </ul>
                    );
                  })}
                </li>
              </ul>
            </PedidosList>
          );
        })}
      </ContainerPedidos>
      <Footer>
        <button onClick={pagePrevious}>Anterior</button>
        <Dados>
          <strong>
            Quantidade de Pedidos: <small>{pedidosInfo.total}</small>
          </strong>
          <strong>
            Número de páginas: <small>{pedidosInfo.pages}</small>
          </strong>
          <strong>
            Página atual: <small>{pedidosInfo.page}</small>
          </strong>
        </Dados>
        <button onClick={pageNext}>Próximo</button>
      </Footer>
    </Container>
  );
}