/* eslint no-eval: 0 */
import React from 'react';
import moment from 'moment';

class TD extends React.Component {
    static proxyText(text, attr) {
        if (attr.fieldSelect) {
            return '';
        }
        function evalTextIsBoolean(_text) {
            if (typeof _text === 'boolean') {
                if (_text) {
                    return attr.replaceBooleanValue.isTrue;
                }
                return attr.replaceBooleanValue.isFalse;
            }
            return _text;
        }

        let valueText = text;
        if (valueText == 0) {
            return valueText;
        }
        // If no exist text
        if (!valueText) {
            return attr.textIsEmpty;
        }
        // if text is date
        if (attr.dateFormat !== undefined) {
            valueText = moment(new Date(valueText)).format(attr.dateFormat);
            valueText = valueText === 'Invalid date' ? attr.textIsEmpty : valueText;
        }
        if (attr.changeText) {
            if (attr.changeText[valueText]) {
              const out = attr.changeText[valueText].text;
              valueText = (<div className={attr.changeText[valueText].className}>{out}</div>);
            }
        }
        if (attr.mapChildren) {
            const children = [];
            Object.keys(valueText).forEach((msg) => {
                if (Object.prototype.hasOwnProperty.call(valueText, msg)) {
                    const obj = attr.mapChildren[msg];
                    // add '' to convert all in string
                    obj.value = `${evalTextIsBoolean(valueText[msg])}` || '';
                    // console.log(obj);
                    children.push(obj);
                }
            });

            valueText = (
              <div>{children.map((internalAttr, i) => (<div
                key={parseInt(i, 10)}
                className={`text-${internalAttr.type}`}
              >
                {internalAttr.name}:{internalAttr.value}</div>))}
              </div>
              );
            if (children.length === 0) {
                return attr.textIsEmpty;
            }
        }

        if (attr.resolveIdToText) {
            valueText = attr.resolveIdToText[valueText].label;
        }

        return valueText;
    }

    constructor(props) {
        super(props);
        this.state = {
            dataset: [],
        };
        this.subscribe = {};
    }

    editComponet(o) {
        let button;
        let buttonEditInline;
        const props = this.props;
        if (!props.options.actions.view.hidden) {
            const aditionalProps =
                props.options.actions.view.aditionalProps ?
                    props.options.actions.view.aditionalProps : {};
            if (props.options.actions.view.Plugin) {
                button = (
                    props.options.actions.view.actions.view.Plugin({
                        cssClass: props.options.actions.view.cssClass,
                        object: o,
                        textButton: props.options.actions.view.textButton,
                    }));
            } else if (props.options.actions.view.Component) {
                button = (
                  <this.props.options.actions.view.Component
                    aditionalProps={aditionalProps}
                    cssClass={props.options.actions.view.cssClass}
                    textButton={props.options.actions.view.textButton}
                    object={o}
                  />);
            } else {
                button = (
                  <button
                    className={props.options.actions.view.cssClass}
                    onClick={() => props.options.actions.view.callback(o)}
                  >
                    {props.options.actions.view.textButton}</button>
                );
            }
        }

        if (props.options.actions.editInline) {
            if (props.options.actions.editInline.Component) {
                buttonEditInline = (
                  <this.props.options.actions.editInline.Component
                    cssClass={props.options.actions.editInline.cssClass}
                    textButton={props.options.actions.editInline.textButton}
                    object={o}
                  />);
            } else {
                buttonEditInline = (
                  <button
                    className={props.options.actions.editInline.cssClass}
                    onClick={() => props.options.actions.editInline.callback(o)}
                  >
                    {props.options.actions.editInline.textButton}</button>
                );
            }
        }
        // const cssTd = props.options.actions.css ? props.options.actions.css : '';
        return (
            props.options.hiddenActions ? null :
            <td style={props.options.actions.css}><div className="btn-group">{button}{buttonEditInline}</div></td>
        );
    }

    render() {
        const props = this.props;
        const col = props.options.columns;
        const o = props.row;
        const internalO = o;
        internalO.colData = col;


        return (
          <tr>
            {col.map((attr, i) => {
                if (attr.templateWithInstance) {
                    const objectActualAttr = `${eval(`o.${attr.name}`)}`;
                    return (
                      <td
                        style={attr.css}
                        className={attr.cssClass}
                        key={parseInt(i, 10)}
                      >{attr.templateWithInstance(o, objectActualAttr)}</td>
                    );
                }
                let data = eval(`o.${attr.name}`);
                // data = data === 'undefined' || data === null
                const value = TD.proxyText(data, attr);
                try {
                    return (
                      <td
                        style={attr.css}
                        className={attr.cssClass}
                        key={parseInt(i, 10)}
                      >{value}</td>
                    );
                } catch (e) {
                    return (
                      <td style={attr.css} key={parseInt(i, 10)}>{attr.textIsEmpty}</td>
                    );
                }
            })}
            {this.editComponet(internalO)}
          </tr>
        );
    }
}

export default TD;
