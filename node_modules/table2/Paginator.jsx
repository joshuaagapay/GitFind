import React, { Component } from 'react';

import PubSub from './pubsub';
import Ajax from './AjaxConector';
import { searchStringCreate } from './utils';
import collection from './collection';


class Paginator extends Component {
    static infoCurrent() {
        if (collection.dataset) {
            const current = collection.dataset.current || undefined;
            return (<span>Página {current} de {collection.dataset.final}</span>);
        }
        return undefined;
    }

    constructor(props) {
        super(props);

        this.state = {
            dataset: [],
        };
        this.subscribe = {};
    }

    componentDidMount() {
        this.subscribe = PubSub.subscribe('STORE.DATAPAGINATOR', this.callBackStore.bind(this));
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.subscribe);
    }

    callBackStore(dataset) {
        collection.dataset = dataset.data;
        this.setState({
            dataset: dataset.data,
        });
    }

    numberPagination() {
        if (collection.dataset) {
            const lengthPagation = [];
            const min = collection.dataset.current - 3 < 1 ? 1 :
                collection.dataset.current - 3;
            const max = collection.dataset.current + 3 > collection.dataset.final ?
                collection.dataset.final :
                collection.dataset.current + 3;
            for (let i = min; i <= max; i += 1) {
                lengthPagation.push(i);
            }
            return lengthPagation.map((nPage, i) => {
                const classCurrent = parseInt(collection.dataset.current, 10) === nPage ? 'active' : '';
                if (classCurrent === 'active') {
                    return (<li key={parseInt(i, 10)} className={classCurrent}>{nPage}</li>);
                }
                return (
                  <li key={parseInt(i, 10)}>
                    <a
                      className={classCurrent}
                      role="button"
                      tabIndex="0"
                      onClick={() => { this.gotoPagePaginator(nPage - 1); }}
                    >{nPage}</a></li>);
            });
        }
        return undefined;
    }

    gotoPagePaginator(nPage) {
        const props = this.props;
        const inputSearch = collection.dataset.inputSearch;
        const sortingColl = collection.dataset.sorting;
        const sorting = sortingColl !== 'undefined' && sortingColl ? `&ordering=${sortingColl}` : '';
        function fn(data) {
            collection.dataset = data;
            collection.dataset.sorting = sortingColl;
            collection.dataset.inputSearch = inputSearch;
            collection.dataset.actual = `${props.service.api + props.service.query}&offset=${collection.dataset.limit * nPage}${sorting}`;
            PubSub.publish('STORE.DATA', collection.dataset);
            PubSub.publish('STORE.DATAPAGINATOR', collection.dataset);
        }
        Ajax.request({
            autJWT: true,
            url: `${props.service.api + props.service.query}&offset=${collection.dataset.limit * nPage}${sorting}${searchStringCreate(inputSearch)}`,
            json: true,
        }, fn);
    }

    actionGotoPage(gotoText) {
        const fn = (data) => {
            const props = this.props;
            collection.dataset = data;
            collection.dataset.actual = `${props.service.api + props.service.query}&offset=${collection.dataset.limit * (collection.dataset.current - 1)}`;
            PubSub.publish('STORE.DATA', collection.dataset);
            PubSub.publish('STORE.DATAPAGINATOR', collection.dataset);
        };
        switch (gotoText) {
        case 'next':
            if (collection.dataset.next) {
                Ajax.request({
                    autJWT: true,
                    url: collection.dataset.next,
                    json: true,
                }, fn);
            }
            break;
        case 'previous':
            if (collection.dataset.previous) {
                Ajax.request({
                    autJWT: true,
                    url: collection.dataset.previous,
                    json: true,
                }, fn);
            }
            break;
        default:
        }
    }

    render() {
        if (collection.dataset) {
            return (
              <ul className="table2-pagintator">
                <li><a
                  onClick={() => this.actionGotoPage('previous')}
                  role="button"
                  tabIndex="0"
                >«</a></li>
                {this.numberPagination()}
                <li><a
                  onClick={() => this.actionGotoPage('next')}
                  role="button"
                  tabIndex="0"
                >»</a></li>
                <li><a className="table2-pagintator-no-link">{Paginator.infoCurrent()}</a></li>
              </ul>
            );
        }
        return undefined;
    }
}

export default Paginator;
