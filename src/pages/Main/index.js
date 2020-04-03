import React from "react";

import Pedidos from "../../components/Pedidos";
import Sidebar from "../../components/Sidebar";

import { Container } from "./styles";

export default function Main() {
  return (
    <Container>
      <Sidebar />
      <Pedidos />
    </Container>
  );
}
