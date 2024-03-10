import styled from "styled-components";
import { ListPayroll } from "../components/payroll/ListPayroll";
export function Nomina() {
  return (
  <Container>
    <ListPayroll/>
  </Container>);
}
const Container =styled.div`
   height:100vh;
`