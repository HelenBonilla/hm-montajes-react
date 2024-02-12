import styled from "styled-components";
import { DataWorker } from "../components/listWorkers";

export function Trabajadores() {
  return (
    <Container>
      <DataWorker/>
    </Container>
  );
}
const Container = styled.div`
 height:100vh;`;
