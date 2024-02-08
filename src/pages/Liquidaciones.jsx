import styled from "styled-components";
import { DataSettlement } from "../componentes/settlement/listSettlement";
export function Liquidaciones() {
  return (
  <Container>
    <DataSettlement/>
  </Container>
  );
}
const Container =styled.div`
   height:100vh;
`