import React, { useState, useEffect } from "react";
import { Input, Form, Select } from "unform";
import { IoMdTrash, IoMdCreate } from "react-icons/io";
import { Link } from "react-router-dom";

import { Container, Register, List, PedidosList, Content } from "./styles";
import api from "../../services/api";
import Sidebar from "../Sidebar/index";

export default function CadCategoria({ history, match }) {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [categorias, setCategorias] = useState([]);

  async function handlerSubmit(data) {
    if (!match.params.id) {
      if (!data.nome) {
        setError("Preencha todos os campos!");
      } else {
        try {
          await api.postOrPut("/categorias", match.params.id, data);

          const response = await api.get("/categorias");
          const { docs } = response.data;

          setCategorias(docs);
          history.go(0);
        } catch (error) {
          setError(error.response.data.error);
        }
      }
    } else {
      try {
        await api.postOrPut("/categorias", match.params.id, data);

        history.push("/categoria");
        history.go(0);
      } catch (error) {
        setError(error.response.data.error);
      }
    }
  }

  useEffect(() => {
    async function loadCategorias() {
      const response = await api.get("/categorias");
      const { docs } = response.data;

      setCategorias(docs);
    }

    loadCategorias();
  }, []);

  // update
  useEffect(() => {
    async function loadData() {
      if (match.params.id) {
        const { id } = match.params;
        const response = await api.get(`/categorias/${id}`);

        setData(response.data);
      }
    }

    if (match.params.id) {
      loadData();
    }
  }, [match.params, match.params.id]);

  async function destroy(id) {
    await api.delete(`categorias/${id}`);

    const response = await api.get("/categorias");
    const { docs } = response.data;
    setCategorias(docs);
  }

  const optionsDis = [
    {
      id: true,
      title: "Sim",
    },
    {
      id: false,
      title: "Não",
    },
  ];

  console.log(categorias);

  return (
    <Container>
      <Sidebar />
      <Content>
        <header>
          <h1>Cadrastro de categorias</h1>
        </header>
        <Register>
          <Form className="form" initialData={data} onSubmit={handlerSubmit}>
            {error && <p>{error}</p>}
            <Input name="nome" label="Nome" />
            <Select
              className="form-control"
              value={data.disponivel}
              name="disponivel"
              label="Disponível"
              options={optionsDis}
            />

            <button type="submit">Salvar</button>
            {match.params.id && (
              <button
                className="cancelar"
                type="button"
                onClick={() => {
                  history.push("/categoria");
                  history.go(0);
                }}
              >
                Cancelar
              </button>
            )}
          </Form>
        </Register>
        <List>
          {categorias.map((produto) => {
            return produto.disponivel === true ? (
              <PedidosList key={produto._id}>
                <header>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Deseja realmente deletar a categoria${produto.nome}?`
                        )
                      )
                        destroy(produto._id);
                    }}
                  >
                    <IoMdTrash />
                  </button>
                  <Link
                    to={`/categoria/edit/${produto._id}`}
                    style={{ color: "#fff" }}
                  >
                    <IoMdCreate />
                  </Link>
                  <strong> {produto.nome}</strong>
                </header>
                <ul>
                  <li>
                    Nome: <small> {produto.nome}</small>
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
                          `Deseja realmente deletar a categoria${produto.nome}?`
                        )
                      )
                        destroy(produto._id);
                    }}
                  >
                    <IoMdTrash />
                  </button>
                  <Link
                    to={`/categoria/edit/${produto._id}`}
                    style={{ color: "#fff" }}
                  >
                    <IoMdCreate />
                  </Link>
                  <strong> {produto.nome}</strong>
                </header>
                <ul>
                  <li>
                    Nome: <small> {produto.nome}</small>
                  </li>
                  <li>
                    Disponível: <small> {produto.disponivel}</small>
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
