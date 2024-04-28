import './Main.css';
import { Header } from './Header';
import { CardCanvas } from './CardCanvas';
import { LayersContainer } from './Layers/LayersContainer';
import { Footer } from './Footer';

export function Main() {
  return (
    <div id="main">
      <div className="header">
        <Header />
      </div>
      <div className="canvas">
        <CardCanvas />
      </div>
      <div className="layers">
        <LayersContainer />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
