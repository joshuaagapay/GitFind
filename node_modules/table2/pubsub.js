/* eslint no-plusplus: 0 */
/*
  PubSub - Dot Notation
  Author: Aaron Sherrill
  Follow me on Twitter @codecommando
  This is a work in progress
  Copyright (C) 2012 Aaron Sherrill

*/
const PubSub = {};

(function autoStart() {
  // Figure this out on your own. documentation just gets in the way sometimes.
    PubSub.subscribe = function subscribe(subscription, callback) {
        const depths = subscription.split('.');
        let floor = this;
        for (let i = 0; i < depths.length; i++) {
            if (!Object.prototype.hasOwnProperty.call(floor, depths[i])) {
                floor[depths[i]] = {};
            }
            floor = floor[depths[i]];
        }
        if (!Object.prototype.hasOwnProperty.call(floor, 'subscriptions')) {
            floor.subscriptions = [];
        }
        floor.subscriptions.push({
            Event: subscription,
            Callback: callback,
        });
        return `${subscription}-${floor.subscriptions.length - 1}`;
    };

    PubSub.publish = function publish(subscription, data) {
        const depths = subscription.split('.');
        // loop through subscriptions at floor level
        function firePublications(level) {
            if (!level) { return false; }
            for (let j = 0; j < level.subscriptions.length; j++) {
                level.subscriptions[j].Callback({
                    event: subscription,
                    id: `${subscription}-${j}`,
                    data,
                });
            }
            return null;
        }
        // let wildcard;
        let floor = this;
    // move floor to the point at which its needed
        for (let i = 0; i < depths.length; i++) {
      // if this level has a * subscription
            if (Object.prototype.hasOwnProperty.call(floor, '*')) {
                firePublications(floor['*']);
            }
            floor = floor[depths[i]];
        }
        firePublications(floor);
    };

    PubSub.unsubscribe = function unsubscribe(id) {
        const spl = id.split('-');
        const depths = spl[0].split('.');
        const index = spl[1];
        let floor = this;
        for (let i = 0; i < depths.length; i++) {
            floor = floor[depths[i]];
        }
        if (floor.subscriptions[index]) {
            floor.subscriptions.splice(index, 1);
        } else {
            // console.log("this doesn't exist");
        }
    };
}());

export default PubSub;
