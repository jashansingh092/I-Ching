// import HexagramView from "./components/Hexagram/HexagramView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

import Foundations from "./pages/Foundations";
import Trigrams from "./pages/Trigrams";
import Hexagrams from "./pages/Hexagrams";
import TransformationLab from "./pages/TransformationLab";
import GraphView from "./pages/GraphView";
import Ontology from "./pages/Ontology";

function App() {
  /* const sample = [1, 0, 1, 1, 0, 1]; // test hexagram **/
  // const sample: (0 | 1)[] = [1, 0, 1, 1, 0, 1];

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Foundations />} />
          <Route path="/trigrams" element={<Trigrams />} />
          <Route path="/hexagrams" element={<Hexagrams />} />
          <Route path="/lab" element={<TransformationLab />} />
          <Route path="/graph" element={<GraphView />} />
          <Route path="/ontology" element={<Ontology />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;