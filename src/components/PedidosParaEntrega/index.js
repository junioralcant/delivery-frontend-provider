import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale/pt";
import { IoMdBicycle } from "react-icons/io";
import io from "socket.io-client";

import api from "../../services/api";

import { formatPrice } from "../../utils/format";

import PushNotification from "../../utils/PushNotification";

import {
  Container,
  Produto,
  ContainerPedidos,
  PedidosList,
  Pesquisa,
  Footer,
} from "./styles";

import Soud from "../../audios/Soud.mp3";

export default function PedidosParaEntrega({ match }) {
  const [pedidos, setPedidos] = useState([]);

  const audio = new Audio(Soud);

  useEffect(() => {
    async function loadPedidos() {
      const response = await api.get(`/pedidosnaoentregues`);

      setPedidos(response.data);
    }

    loadPedidos();
  }, []);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);

    socket.on("createPedido", (message) => {
      async function load() {
        const response = await api.get(`/pedidosnaoentregues`);

        setPedidos(response.data);
        audio.play();
      }

      load();
    });
  }, [audio]);

  async function update(id) {
    await api.put(`/pedidosnaoentregues/${id}`, { entregue: true });
    const response = await api.get("/pedidosnaoentregues");
    setPedidos(response.data);
  }

  async function filterNome(e) {
    if (e.target.value !== "") {
      const response = await api.get(
        `/pedidosnaoentregues?nome=${e.target.value}`
      );
      setPedidos(response.data);
    } else {
      const response = await api.get("/pedidosnaoentregues");
      setPedidos(response.data);
    }
  }

  return (
    <Container>
      <header>
        <h1>Pedidos para entregua</h1>
      </header>
      <Pesquisa>
        <input
          type="text"
          name="filterNome"
          placeholder="Pesquisar por nome"
          onChange={filterNome}
        />
      </Pesquisa>
      <ContainerPedidos>
        {pedidos.map((pedido) => {
          const dataPedido = format(pedido.createdAt, "DD-MM-YYYY H:mm", {
            locale: pt,
          });

          return (
            <PedidosList key={pedido._id}>
              <header>
                <button
                  onClick={(e) => {
                    if (
                      window.confirm(
                        `Deseja realmente entregar o pedido do(a) cliente ${pedido.nomeCliente}?`
                      )
                    )
                      update(pedido._id);

                    PushNotification.pushNotification(
                      pedido.userOneSignalId,
                      "Seu pedido saiu para entrega."
                    );
                  }}
                >
                  <IoMdBicycle size={25} />
                </button>
                <strong>{pedido.nomeCliente}</strong>
                <small>{dataPedido}</small>
                <small>{pedido.cliente.telefone}</small>
              </header>
              <ul>
                <li>
                  Produtos
                  <ul>
                    <Produto>
                      {pedido.produto.map((produto) => (
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
                              <small>QTD: </small>{" "}
                              <strong>{produto.quantidade}</strong>
                            </div>
                            <div>
                              <small>Valor: </small>{" "}
                              <strong>{formatPrice(produto.valor)}</strong>
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
                    <strong className="value" style={{ marginLeft: 4 }}>
                      {" "}
                      {formatPrice(pedido.valorTotal)}
                    </strong>
                  </div>
                </li>

                <li>
                  <div className="total">
                    <strong>Troco Para: </strong>{" "}
                    <strong className="troco" style={{ marginLeft: 4 }}>
                      {" "}
                      {formatPrice(!pedido.trocoPara ? 0 : pedido.trocoPara)}
                    </strong>
                  </div>
                </li>

                <li>
                  Endereço
                  {pedido.enderecoEntrega.map((end) => {
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
      <Footer></Footer>
    </Container>
  );
}
