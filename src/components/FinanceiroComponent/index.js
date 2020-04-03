import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale/pt";
import { IoMdTrash } from "react-icons/io";

import PushNotification from "../../utils/PushNotification";

import api from "../../services/api";

import { formatPrice } from "../../utils/format";

import {
  Container,
  ContainerPedidos,
  Produto,
  PedidosList,
  Pesquisa,
  Footer,
  Dados,
  DadosFooter
} from "./styles";

export default function Pedidos() {
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
    if (dataMin !== "" || dataMax !== "") {
      const response = await api.get(
        `/pedidos?data_min=${dataMin}&data_max=${dataMax}`
      );
      const { docs, ...pedidoResto } = response.data;
      setPedidos(docs);
      setPedidosInfo(pedidoResto);
    } else {
      const response = await api.get("/pedidos");
      const { docs, ...pedidoResto } = response.data;
      setPedidos(docs);
      setPedidosInfo(pedidoResto);
    }
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

  // Soma os valores de todos os pedidos
  const valorTotal = pedidos.reduce(
    (valorTotal, valor) => valorTotal + valor.valorTotal,
    0
  );

  return (
    <Container>
      <Pesquisa>
        <input
          type="text"
          name="nome"
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
        <button onClick={filterData}>Pequisar</button>

        <Dados style={{ background: "none" }}>
          <span></span>
        </Dados>
        <Dados>
          <div>
            <strong>
              Quantidade de Pedidos: <small>{pedidosInfo.total}</small>
            </strong>
            <strong className="total">
              Valor total:{" "}
              <small className="total">{formatPrice(valorTotal)}</small>
            </strong>
          </div>
        </Dados>
      </Pesquisa>

      <ContainerPedidos>
        {pedidos.map(pedido => {
          const dataPedido = format(pedido.createdAt, "DD-MM-YYYY H:mm", {
            locale: pt
          });
          return (
            <PedidosList key={pedido._id}>
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
                  Endereço{" "}
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
        <DadosFooter>
          <strong>
            Número de páginas: <small>{pedidosInfo.pages}</small>
          </strong>
          <strong>
            Página atual: <small>{pedidosInfo.page}</small>
          </strong>
        </DadosFooter>
        <button onClick={pageNext}>Próximo</button>
      </Footer>
    </Container>
  );
}
