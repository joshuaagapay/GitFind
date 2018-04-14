import React, { Component } from 'react';

import THead from './THead';
import THeadPaginator from './THeadPaginator';
import TBody from './TBody';
import TFooter from './TFooter';

import { sizeObj } from './utils';
import collection from './collection';


export default class Table2 extends Component {
    constructor(props) {
        super(props);
        const internalProps = this.props;
        this.newData = {};
        this.state = {
            data: internalProps.data,
        };
    }

    componentDidMount() {
        const props = this.props;
        if (props.options.finishRenderCallBack) {
            props.options.finishRenderCallBack();
        }
    }

    componentDidUpdate() {
        const props = this.props;
        if (props.options.finishRenderCallBack) {
            props.options.finishRenderCallBack();
        }
    }

    setNewState(newData) {
        if (!newData) {
            this.newData = {};
            return;
        }
        this.data = newData;
    }
    apiValidate(api) {
      return api.indexOf('?') != -1 ? `${api}?` : api;
    }
    loadTable() {
        const props = this.props;
        if (sizeObj(props.data) && props.data.results.length > 0) {
            collection.dataset = props.data;
            props.service.api = this.apiValidate(props.service.api);
            collection.dataset.actual = props.service.api + props.service.query;
            return (
              <table className={`table2 ${props.options.className}`}>
                <THeadPaginator
                  updater={props.updater}
                  instance={this}
                  service={props.service}
                  data={collection.dataset}
                  options={props.options}
                />
                <THead
                  updater={props.updater}
                  instance={this}
                  service={props.service}
                  data={collection.dataset}
                  options={props.options}
                />
                <TBody
                  options={props.options}
                  updater={props.updater}
                />
                <TFooter
                  instance={this}
                  service={props.service}
                  data={collection.dataset}
                  options={props.options}
                />
              </table>
            );
        }
        return (
          <div>
            <p>No Existen Datos y/o la busqueda no coincide</p>
          </div>
        );
    }

    render() {
        return this.loadTable();
    }
}
