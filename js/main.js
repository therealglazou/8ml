/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Original contributor: Daniel Glazman
 */

export class EightML {

  constructor() {
    this.kROLE_ATTR = "data-8ml-role";

    [
      "click",
      "keydown"
    ].forEach((aName) => {
      document.addEventListener(aName,
        (aEvent) => { this.handleEvent(aEvent); });
    });
  }

  handleEvent(aEvent) {
    const target = this.findRoleHolder(aEvent.target);
    const originalTarget = (aEvent.target.nodeType == Node.ELEMENT_NODE)
                           ? aEvent.target
                           : aEvent.target.parentNode;
    if (!target)
      return;
    const role = EightML.capturing || target.getAttribute(this.kROLE_ATTR);

    const listener = EightML.listenerArray[role];
    const listenerName = "on" + aEvent.type;
    if (listener
        && listener[listenerName]
        && typeof listener[listenerName] == "function") {
      listener[listenerName](originalTarget, target, aEvent);
    }
  }

  findRoleHolder(aElement) {
    let elt = aElement;
    while (elt
           && elt.nodeType == Node.ELEMENT_NODE
           && !elt.hasAttribute(this.kROLE_ATTR))
      elt = elt.parentNode;
    return elt;
  }

  static addListener(aListener) {
    if (!aListener)
      return;

    console.log("### adding " + aListener.role);

    if (!EightML.listenerArray)
      EightML.listenerArray = {};

    EightML.listenerArray[aListener.role] = aListener;
  }

  static getComputedStyle(aElement, aProperty) {
    return document.defaultView.getComputedStyle(aElement, null)
                   .getPropertyValue(aProperty);
  }
}

(new EightML());
