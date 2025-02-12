
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import MainSection from './components/MainSection';


function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Hero></Hero>
      <MainSection></MainSection>
      <Footer></Footer>
      
    </BrowserRouter>
  );
}

export default App;