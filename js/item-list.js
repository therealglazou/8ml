/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Original contributor: Daniel Glazman
 */

import { EightML } from "./main.js";
import { EightML_base } from "./base.js";

export class EightML_item_list extends EightML_base {

  get role() { return "item-list" }

  getItem(aElement) {
    let item = aElement;
    while (item
           && item.nodeType == Node.ELEMENT_NODE
           && item.nodeName.toLowerCase() != "li")
      item = item.parentNode;

    if (item && item.nodeName.toLowerCase() != "li")
      item = null;

    return item;
  }

  onclick(aOriginalTarget, aTarget, aEvent) {
    let item = this.getItem(aOriginalTarget)

    if (!item)
      return;

    const currentlySelected = aTarget.querySelectorAll("[data-8ml-selected]");
    for (let i = 0; i < currentlySelected.length; i++) {
      currentlySelected[i].removeAttribute("data-8ml-selected");
    }

    item.setAttribute("data-8ml-selected", "true");
    item.focus();
  }

  onkeydown(aOriginalTarget, aTarget, aEvent) {
    let item = this.getItem(aOriginalTarget)

    if (!item)
      return;

    switch (aEvent.which) {
      case 32:
        this.onclick(aOriginalTarget, aTarget, aEvent);
        break;
      case 39:
      case 40: // next
        if (item.nextElementSibling)
          this.onclick(item.nextElementSibling, aTarget, aEvent);
        break;
      case 37:
      case 38: // previous
        if (item.previousElementSibling)
          this.onclick(item.previousElementSibling, aTarget, aEvent);
        break;
      default: break;
    }
  }
}

(new EightML_item_list());
