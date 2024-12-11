import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BuyModes from './pages/BuyModes';
import SellModes from './pages/SellModes';
import Wallets from './pages/Wallets';
import Transfer from './pages/Transfer';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="buy" element={<BuyModes />} />
          <Route path="sell" element={<SellModes />} />
          <Route path="wallets" element={<Wallets />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}