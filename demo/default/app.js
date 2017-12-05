import 'bootstrap/dist/css/bootstrap.min.css'; // eslint-disable-line
import React, { Component } from 'react';
import _ from 'underscore';
import Octicon from 'react-octicon'; // eslint-disable-line

import ProjectionGridReact from 'projection-grid-react'; // eslint-disable-line
import people from './people.json';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleResort = this.handleResort.bind(this);

    this.state = {
      records: _.sortBy(people.value, 'LastName'),
      columns: [
        { name: 'UserName', sorting: true },
        { name: 'FirstName', title: 'first name', head: <h1>first name</h1> },
        { name: 'LastName', title: 'last name', sorting: 'asc' },
      ],
    };
  }

  handleResort(columnName) {
    this.setState({
      columns: _.map(this.state.columns, (column) => {
        if (column.name === columnName) {
          const sorting = column.sorting === 'asc' ? 'desc' : 'asc';

          this.setState({
            records: sorting === 'asc' ?
              _.sortBy(people.value, columnName) :
              _.sortBy(people.value, columnName).reverse(),
          });

          return _.defaults({}, {
            sorting,
          }, column);
        }

        if (column.sorting) {
          return _.defaults({}, {
            sorting: true,
          }, column);
        }

        return column;
      }),
    });
  }

  render() {
    return (
      <div className="demo">
        <ProjectionGridReact
          records={this.state.records}
          columns={this.state.columns}
          primaryKey="UserName"
          sort={{
            ascComponent: ({ column }) => (
              <div>
                <Octicon name="arrow-up" />
                <span>{column.name}</span>
              </div>
            ),
            descClasses: ['glyphicon', 'glyphicon-menu-down'],
            handleResort: this.handleResort,
          }}
          projections={[]}
          theme="bootstrap-striped-rows"
        />
      </div>
    );
  }
}
