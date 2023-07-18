import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Board from './pages/Board';
import FormColaborador from './pages/forms/FormColaborador';
import FormCargo from './pages/forms/FormCargo';
import ViewCargo from './pages/tables/ViewCargo';
import ViewColaborador from './pages/tables/ViewColaborador';
import routes from './static/routesconfig';
import ViewTarefa from './pages/tables/ViewTarefa';
import FormTarefa from './pages/forms/FormTarefa';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Board} />
      <Route path={routes.FORM_COLABORADOR} component={FormColaborador} />
      <Route path={routes.FORM_CARGO} component={FormCargo} />
      <Route path={routes.FORM_TAREFA} component={FormTarefa} />

      <Route path={routes.VIEW_CARGO} component={ViewCargo} />
      <Route path={routes.VIEW_COLABORADOR} component={ViewColaborador} />
      <Route path={routes.VIEW_TAREFA} component={ViewTarefa} />
    </Switch>
  );
};

export default Routes;
