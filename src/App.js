import './App.css';
import { DataWorker } from './componentes/listWorkers';
import {DataTableWorkers} from './componentes/tableListWorkers'

function App() {
  return (
    <div>
        {/*<DataWorker/>*/}
        <DataTableWorkers/>
    </div>
  );
}

export default App;
