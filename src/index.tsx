import { App } from 'app/App';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { ReduxProvider } from 'app/providers/ReduxProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ReduxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
);


