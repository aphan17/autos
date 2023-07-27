import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import CustomerForm from './Sales/CustomerForm';
import RecordSaleForm from './Sales/RecordSaleForm';
import ListSalesPeople from './Sales/ListSalesPeople';
import ListAllSales from './Sales/ListAllSales';
import ListCustomers from './Sales/ListCustomers';
import SalesPersonForm from './Sales/SalesPersonForm';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
