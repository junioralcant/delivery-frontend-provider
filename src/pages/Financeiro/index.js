import React from "react";

import FinanceiroComponent from "../../components/FinanceiroComponent";
import Sidebar from "../../components/Sidebar";

import { Container } from "./styles";

export default function Financeiro() {
  return (
    <Container>
      <Sidebar />
      <FinanceiroComponent />
    </Container>
  );
}
