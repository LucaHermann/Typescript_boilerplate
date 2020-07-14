import React from "react";
import ReactDOM from "react-dom";
import { Store } from "redux";
import { Provider } from "react-redux";
import { cssRaw } from "typestyle";
import * as serviceWorker from "./utils/serviceWorker";
import "semantic-ui-css/semantic.min.css";

import configureStore, { IAppState } from "./store/charStore";
import App from "./containers/App";

interface IProps {
  store: Store<IAppState>;
}
// create css style inside ts files
cssRaw(`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`);
/*
Create a root component that receives the store via props
and wraps the App component with Provider, giving props to containers
*/
const Root: React.FC<IProps> = props => {
  return (
    <Provider store={props.store}>
      <App />
    </Provider>
  );
};

// Generate the store
const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById("root") as HTMLElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
