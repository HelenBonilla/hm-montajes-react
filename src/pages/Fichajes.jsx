import styled from "styled-components";
import { DataSignings } from "../components/signings/signings";

export function Fichajes() {
  return (
    <Container>
      <DataSignings /> 
    </Container>
  );
}
const Container = styled.div`
 height:100vh;`;
