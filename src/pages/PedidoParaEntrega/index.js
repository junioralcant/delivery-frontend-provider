import React from "react";
import PedidosParaEntrega from "../../components/PedidosParaEntrega";
import Sidebar from "../../components/Sidebar";

import { Container } from "./styles";

export default function PedidoParaEntrega() {
  return (
    <Container>
      <Sidebar />
      <PedidosParaEntrega />
    </Container>
  );
}
