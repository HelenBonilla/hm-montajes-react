import styled from "styled-components";
import { DataWorker } from "../componentes/workers/listWorkers";

export function Trabajadores() {
  return (
    <Container>
      <DataWorker/>
    </Container>
  );
}
const Container = styled.div`
 height:100vh;`;
