import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Student from '../student/Student';
import Subject from '../subject/Subject';
import Alert from '../layout/Alert';
import AllStudent from '../dashboard/AllStudent';
import AllSubject from '../dashboard/AllSubject';
import EditStudent from '../dashboard/EditStudent'
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/student" component={Student} />
        <Route exact path="/subject" component={Subject} />
        <Route exact path="/all-student" component={AllStudent} />
        <Route exact path="/all-subject" component={AllSubject} />
        <Route exact path="/student/:id" component={EditStudent} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
