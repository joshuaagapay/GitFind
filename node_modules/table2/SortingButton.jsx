import React, { Component } from 'react';

import PubSub from './pubsub';
import Ajax from './AjaxConector';
import { searchStringCreate, updateQueryStringParameter } from './utils';
import collection from './collection';

export default class SortingButton extends Component {
    constructor(props) {
        super(props);
        this.querySendBack = this.querySendBack.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
    }

    componentDidMount() {
        const props = this.props;
        function fn(dataset) {
            collection.dataset = dataset.data;
            this.setState({
                dataset: dataset.data,
            });
        }
        if (!props.element.noSorting) {
            this.subscribe = PubSub.subscribe(`STORE.DATA.${props.element.name}`, fn.bind(this));
        }
    }

    componentWillUnmount() {
        const props = this.props;
        if (!props.element.noSorting) {
            PubSub.unsubscribe(this.subscribe);
        }
    }

    isCustomSorting() {
        const props = this.props;
        const cs = props.element.customSorting ? props.element.customSorting : props.element.name;
        return cs;
    }
    onChangeSearch(event) {
        const name = this.props.element.name;
        const searchQueryName = this.props.element.inputSeach;
        const sorting = collection.dataset.sorting;
        const keyName = `${name}__${searchQueryName}`;
        const key = searchQueryName === 'exact' || searchQueryName === undefined ? name : keyName;

        if (!collection.dataset.inputSearch) {
            collection.dataset.inputSearch = {};
        }
        if (collection.dataset.inputSearch) {
            const inputSeachData = collection.dataset.inputSearch;
            inputSeachData[key] = event.target ? event.target.value : event;
            collection.dataset.inputSearch = inputSeachData;
        }

        PubSub.publish('STORE.DATA', collection.dataset);
        this.querySendBack('not-reordering');
    }
    searchPlaceholder(){
        if (this.props.element.inputSearchPlaceholder) {
            return this.props.element.inputSearchPlaceholder;
        }
        return `Ingrese ${this.props.element.title}`;
    }

    querySendBack(reordering) {
        const props = this.props;
        const arrName = this.isCustomSorting().split('.');
        let name = arrName[arrName.length - 1];
        if (reordering === 'not-reordering') {
          name = collection.dataset.sorting;
        }else{
          if (`${collection.dataset.sorting}` === name) {
              name = `-${name}`;
          } else {
              name = `${name}`;
          }
        }

        const inputSearch = collection.dataset.inputSearch;
        const searchString = inputSearch ? `${searchStringCreate(inputSearch)}` : '';
        const fn = (data) => {

            collection.dataset = data;
            collection.dataset.inputSearch = inputSearch;
            collection.dataset.sorting = `${name}`;
            collection.dataset.actual = `${props.service.api +
            props.service.query}&offset=${collection.dataset.limit *
            (collection.dataset.current - 1)}`;
            PubSub.publish('STORE.DATA', collection.dataset);
            PubSub.publish('STORE.DATAPAGINATOR', collection.dataset);
            Object.keys(props.options.columns).forEach((col) => {
                if (!props.options.columns[col].noSorting) {
                    const elm = `STORE.DATA.${props.options.columns[col].name}`;
                    PubSub.publish(elm, collection.dataset);
                }
            });
        };

        let url = collection.dataset.actual;
        if (name !== 'undefined' && name) {
            url = updateQueryStringParameter(collection.dataset.actual, 'ordering', name);
        }

        Ajax.request({
            autJWT: true,
            url: `${url}${searchString}`,
            json: true,
        }, fn);
    }

    render() {
        const props = this.props;
        if (props.element.noSorting) {
            return (
              <div>{ props.element.title }</div>
            );
        }

        const active = collection.dataset.sorting === this.isCustomSorting() || collection.dataset.sorting === `-${this.isCustomSorting()}` ? 'active' : '';
        let typeSorting = '';
        if (active === 'active') {
            if (collection.dataset.sorting === this.isCustomSorting()) {
                typeSorting = 'desc';
            } else {
                typeSorting = 'asc';
            }
        }
        props.element.inputSearchPlaceholder = this.searchPlaceholder();
        return (
          <div>
            <button
              onClick={this.querySendBack}
              className={`table2-btn-sorting ${active} ${typeSorting}`}
            >
              {props.element.title}</button>
              {props.element.inputSeach ?
                props.element.inputSeachComponet ?(
                  props.element.inputSeachComponet({
                    handlerChange: this.onChangeSearch,
                    element: props.element,
                  })
                ):(
                  <input
                    className={props.element.className ? props.element.className : 'form-control'}
                    placeholder={this.searchPlaceholder()}
                    onChange={this.onChangeSearch}
                  />
              ):null}
          </div>
        );
    }
}
