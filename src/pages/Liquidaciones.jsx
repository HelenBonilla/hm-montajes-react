import styled from "styled-components";
import {DataSettlement} from "../components/settlement/listSettlement"
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