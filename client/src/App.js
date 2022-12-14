import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import PersonSpecificPage from "./components/PersonSpecficPage.jsx";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/people/:personId" element={<PersonSpecificPage />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
