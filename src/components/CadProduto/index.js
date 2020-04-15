import React, { useState, useEffect } from "react";
import { Input, Form, Select as SelectUnform } from "unform";
import { IoMdTrash, IoMdCreate } from "react-icons/io";
import { Link } from "react-router-dom";

import { formatPrice } from "../../utils/format";

import {
  Container,
  Register,
  List,
  PedidosList,
  Content,
  Pesquisa
} from "./styles";

import Select from "react-select";

import api from "../../services/api";
import Sidebar from "../Sidebar/index";

export default function CadProduto({ history, match }) {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState();

  async function handlerSubmit(data) {
    if (!match.params.id) {
      if (
        !data.nome ||
        !data.descricao ||
        !data.preco ||
        !data.disponivel ||
        !categoriaId
      ) {
        setError("Preencha todos os campos!");
      } else {
        try {
          data.categoria = categoriaId;
          await api.postOrPut("/produtos", match.params.id, data);

          const response = await api.get("/produtos");
          const { docs } = response.data;

          setProdutos(docs);
          history.go(0);
        } catch (error) {
          setError(error.response.data.error);
        }
      }
    } else {
      try {
        data.categoria = categoriaId;
        await api.postOrPut("/produtos", match.params.id, data);

        history.push("/produto");
        history.go(0);
      } catch (error) {
        setError(error.response.data.error);
      }
    }
  }

  console.log(data);
  console.log(data.descricao);
  console.log(data.preco);
  console.log(data.disponivel);
  console.log(categoriaId);

  useEffect(() => {
    async function loadProdutos() {
      const response = await api.get("/produtos");
      const { docs } = response.data;

      setProdutos(docs);
    }

    loadProdutos();
  }, []);

  useEffect(() => {
    async function loadCategoria() {
      const response = await api.get("/categorias");
      const { docs } = response.data;

      setCategorias(docs);
    }

    loadCategoria();
  }, []);

  // update
  useEffect(() => {
    async function loadData() {
      if (match.params.id) {
        const { id } = match.params;
        const response = await api.get(`/produtos/${id}`);

        setData(response.data);
      }
    }

    if (match.params.id) {
      loadData();
    }
  }, [match.params, match.params.id]);

  const optionsExistentsCategoria = data.categoria != null && {
    id: data.categoria._id,
    name: data.categoria.nome
  };

  useEffect(() => {
    if (match.params.id) {
      setCategoriaId(optionsExistentsCategoria.id);
    }
  }, [match.params, optionsExistentsCategoria.id]);

  async function filterNome(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/produtos?nome=${e.target.value}`);
      setProdutos(response.data.docs);
    } else {
      const response = await api.get("/produtos");
      setProdutos(response.data.docs);
    }
  }

  function handleSelectChange(cat) {
    setCategoriaId(cat);
  }

  async function destroy(id) {
    await api.delete(`produtos/${id}`);

    const response = await api.get("/produtos");
    const { docs } = response.data;
    setProdutos(docs);
  }
  // estilização do Select
  const colourStyle = {
    control: styles => ({
      ...styles,
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      color: "white"
    }),
    option: styles => ({
      ...styles,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff"
    }),
    input: styles => ({ ...styles, color: "#fff" }),
    singleValue: styles => ({ ...styles, color: "#fff" })
  };

  const optionsDis = [
    {
      id: true,
      title: "Sim"
    },
    {
      id: false,
      title: "Não"
    }
  ];

  return (
    <Container>
      <Sidebar />
      <Content>
        <header>
          <h1>Cadrastro de produtos</h1>
        </header>
        <Register>
          <Form className="form" initialData={data} onSubmit={handlerSubmit}>
            {error && <p>{error}</p>}
            <Input name="nome" label="Nome" />
            <Input name="preco" label="Preço" />
            <Input name="descricao" label="Descrição" />
            <SelectUnform
              className="form-control"
              value={data.disponivel}
              name="disponivel"
              label="Disponível"
              options={optionsDis}
            />
            <span>Categoria</span>
            <Select
              options={categorias}
              defaultInputValue={(categorias.value = categorias.nome)}
              styles={colourStyle}
              placeholder={optionsExistentsCategoria.name}
              name="categoria"
              getOptionLabel={categoria => categoria.nome}
              getOptionValue={categoria => categoria._id}
              onChange={value => handleSelectChange(value._id)}
            />

            <button type="submit">Salvar</button>
            {match.params.id && (
              <button
                className="cancelar"
                type="button"
                onClick={() => {
                  history.push("/produto");
                  history.go(0);
                }}
              >
                Cancelar
              </button>
            )}
          </Form>
        </Register>
        <Pesquisa>
          <input
            type="text"
            name="filterNome"
            placeholder="Pesquisar por nome"
            onChange={filterNome}
          />
        </Pesquisa>
        <List>
          {produtos.map(produto => {
            return produto.disponivel === true ? (
              <PedidosList key={produto._id}>
                <header>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Deseja realmente deletar o produto ${produto.nome}?`
                        )
                      )
                        destroy(produto._id);
                    }}
                  >
                    <IoMdTrash />
                  </button>
                  <Link
                    to={`/produto/edit/${produto._id}`}
                    style={{ color: "#fff" }}
                  >
                    <IoMdCreate />
                  </Link>
                  <strong> {produto.nome}</strong>
                </header>
                <ul>
                  <li>
                    Quantidade estoque: <small> {produto.quantidade}</small>
                  </li>
                  <li>
                    Categoria:{" "}
                    <small>
                      {" "}
                      {produto.categoria ? produto.categoria.nome : null}
                    </small>
                  </li>
                  <li>
                    Valor unidade: <small> {formatPrice(produto.preco)}</small>
                  </li>
                  <li>
                    Descrição: <small> {produto.descricao}</small>
                  </li>
                </ul>
              </PedidosList>
            ) : (
              <PedidosList naoDisponivel key={produto._id}>
                <header>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Deseja realmente deletar o produto ${produto.nome}?`
                        )
                      )
                        destroy(produto._id);
                    }}
                  >
                    <IoMdTrash />
                  </button>
                  <Link
                    to={`/produto/edit/${produto._id}`}
                    style={{ color: "#fff" }}
                  >
                    <IoMdCreate />
                  </Link>
                  <strong> {produto.nome}</strong>
                </header>
                <ul>
                  <li>
                    Quantidade estoque: <small> {produto.quantidade}</small>
                  </li>
                  <li>
                    Categoria: <small> {produto.categoria.nome}</small>
                  </li>
                  <li>
                    Valor unidade: <small> {formatPrice(produto.preco)}</small>
                  </li>
                  <li>
                    Descrição: <small> {produto.descricao}</small>
                  </li>
                </ul>
              </PedidosList>
            );
          })}
        </List>
      </Content>
    </Container>
  );
}
