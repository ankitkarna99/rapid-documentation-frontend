import React from "react";
import SideNav from "./components/SideNav";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import { BooksProvider } from "./context/BooksContext";
import CreateBook from "./pages/CreateBook";
import ViewDocumentation from "./pages/ViewDocumentation";
import EditDocumentation from "./pages/EditDocumentation";
import CreatePage from "./pages/CreatePage";
import CreateSubPage from "./pages/CreateSubPage";

export default function App() {
  return (
    <BrowserRouter>
      <BooksProvider>
        <Header />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 5fr",
            paddingTop: "3rem",
          }}
        >
          <SideNav />
          <div className="uk-padding-large" style={{ paddingLeft: 0 }}>
            <Switch>
              <Route path="/" component={Index} exact />
              <Route path="/create" component={CreateBook} exact />
              <Route path="/:bookSlug/create" component={CreatePage} exact />
              <Route
                path="/:bookSlug/:pageSlug/create"
                component={CreateSubPage}
                exact
              />
              <Route
                path="/:bookSlug/edit"
                component={EditDocumentation}
                exact
              />
              <Route
                path="/:bookSlug/:pageSlug/edit"
                component={EditDocumentation}
                exact
              />
              <Route
                path="/:bookSlug/:pageSlug/:subPageSlug/edit"
                component={EditDocumentation}
                exact
              />
              <Route path="/:bookSlug" component={ViewDocumentation} exact />
              <Route
                path="/:bookSlug/:pageSlug"
                component={ViewDocumentation}
                exact
              />
              <Route
                path="/:bookSlug/:pageSlug/:subPageSlug"
                component={ViewDocumentation}
                exact
              />
            </Switch>
          </div>
        </div>
      </BooksProvider>
    </BrowserRouter>
  );
}
