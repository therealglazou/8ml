/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Original contributor: Daniel Glazman
 */

import { EightML } from "./main.js";
import { EightML_base } from "./base.js";

export class EightML_item_list_header extends EightML_base {

  get role() { return "item-list-header" }

  onclick(aOriginalTarget, aTarget, aEvent) {
    const list = aTarget.nextElementSibling;
    if (aTarget.getAttribute("data-8ml-open") == "true") {
      if (list && list.getAttribute("data-8ml-role") == "item-list")
        list.style.maxHeight = EightML.getComputedStyle(list, "height");
      setTimeout(() => { aTarget.removeAttribute("data-8ml-open"); }, 1);
    }
    else {
      aTarget.setAttribute("data-8ml-open", "true");
      //list.style.maxHeight = "";
      setTimeout(() => { list.style.removeProperty("max-height"); }, 101);
    }
  }

  onkeydown(aOriginalTarget, aTarget, aEvent) {
  }
}

(new EightML_item_list_header());
