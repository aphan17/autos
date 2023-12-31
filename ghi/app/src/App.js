import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import TechniciansList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import ServiceHistory from './ServiceHistory';
import VehicleModelList from './VehicleModelList';
import VehicleModelForm from './VehicleModelForm';
import CustomerForm from './sales/customerForm';
import RecordSaleForm from './sales/recordSaleForm';
import ListSalesPeople from './sales/listSalesPeople';
import ListAllSales from './sales/listAllSales';
import ListCustomers from './sales/listCustomers';
import SalesPersonForm from './sales/salesPersonForm';
import AutomobileForm from './CreateAutoMobile';
import AutomobilesList from './automobileList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="customers/list/" element={<ListCustomers />} />
          <Route path="customers/" element={<CustomerForm />} />
          <Route path="salespeople/list/" element={<ListSalesPeople />} />
          <Route path="salespeople/" element={<SalesPersonForm />} />
          <Route path="sales/" element={<RecordSaleForm />} />
          <Route path="sales/history/" element={<ListAllSales />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturersList />} />
            <Route path="create" element={<ManufacturerForm/>} />
          </Route>
          <Route path="models">
            <Route index element={<VehicleModelList/>} />
            <Route path="create" element={<VehicleModelForm/>}/>
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobilesList />} />
            <Route path="create" element={<AutomobileForm/>}/>
          </Route>
          <Route path="technicians">
            <Route index element={<TechniciansList/>} />
            <Route path="create" element={<TechnicianForm/>} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentList />} />
            <Route path="create" element={<AppointmentForm />} />
            <Route path="history" element={<ServiceHistory/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
