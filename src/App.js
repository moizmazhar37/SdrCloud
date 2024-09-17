import React, { Suspense, Fragment, useContext, useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { routes } from "src/routes";
import { createBrowserHistory } from "history";
import AuthContext from "src/context/Auth";
import UserContext from "src/context/User";
import PageLoading from "src/component/PageLoading";
import AuthGuard from "./component/AuthGuard";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "src/theme";
import SettingsContext from "src/context/SettingsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserLogoProvider } from "./context/UserLogoContext";

const history = createBrowserHistory();

function App() {
  const themeSeeting = useContext(SettingsContext);
  const theme = createTheme({
    theme: themeSeeting.settings.theme,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <ToastContainer />

      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router history={history}>
            <AuthContext>
              <UserLogoProvider>
                <UserContext>
                  <RenderRoutes data={routes} />
                </UserContext>
              </UserLogoProvider>
            </AuthContext>
          </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

function RenderRoutes(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        {props.data.map((route, i) => {
          const Component = route.component;
          const Guard = route.guard ? AuthGuard : Fragment;

          const Layout = route.layout || Fragment;
          return (
            <Route
              exact={route.exact}
              key={i}
              path={route.path}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      <RenderRoutes data={route.routes} />
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}
