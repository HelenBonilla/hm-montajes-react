import styled from "styled-components";
import { DataWorker } from "../components/signings/signings";

export function Fichajes() {
  return (
    <Container>
      <h1>Fichajes</h1>
      <DataWorker/> 
    </Container>
  );
}
const Container = styled.div`
 height:100vh;`;
