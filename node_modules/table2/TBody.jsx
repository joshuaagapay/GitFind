import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TD from './TD';

import PubSub from './pubsub';

import collection from './collection';

export default class TBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset: [],
        };
    }

    componentDidMount() {
        function fn(dataset) {
            collection.dataset = dataset.data;
            this.setState({
                dataset: dataset.data,
            });
        }
        this.subscribe = PubSub.subscribe('STORE.DATA', fn.bind(this));
    }

    componentDidUpdate() {
        if (this.props.updater) {
            this.props.updater();
        }
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.subscribe);
    }

    body() {
        const props = this.props;
        if (collection.dataset) {
            return collection.dataset.results.map(row => (
              <TD key={row.id} row={row} options={props.options} />));
        }
        return undefined;
    }

    render() {
        return <tbody>{this.body()}</tbody>;
    }
}

TBody.propTypes = {
    updater: PropTypes.func,
};
