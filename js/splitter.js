/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Original contributor: Daniel Glazman
 */

import { EightML } from "./main.js";
import { EightML_base } from "./base.js";

export class EightML_splitter extends EightML_base {

  get role() { return "splitter" }

  constructor() {
    super();

    this.originalX = 0;
    this.originalY = 0;
    this.x = 0;
    this.y = 0;
    this.selected = null;
  }

  onmousedown(aOriginalTarget, aTarget, aEvent) {
    this.selected = aTarget;
    this.originalX = aEvent.clientX;
    this.originalY = aEvent.clientY;
    this.x = 0;
    this.y = 0;
    EightML.capturing = this.role;

    switch (this.selected.parentNode.getAttribute("data-8ml-direction")) {
      case "row":
        this.property = "width";
        break;
      case "column":
      default:
        this.property = "height";
        break;
    }
    return false;
  }

  onmousemove(aOriginalTarget, aTarget, aEvent) {
    this.x = aEvent.clientX;
    this.y = aEvent.clientY;
    if (this.selected) {
        if (this.property == "row")
          this.selected.style.left = (this.x - this.originalX) + 'px';
        else
          this.selected.style.top = (this.y - this.originalY) + 'px';
    }
  }

  onmouseup(aOriginalTarget, aTarget, aEvent) {
    EightML.capturing = null;
    this.x = aEvent.clientX;
    this.y = aEvent.clientY;
    if (this.selected) {
      const prev = this.selected.previousElementSibling;
      let delta = 0;
      switch (this.selected.parentNode.getAttribute("data-8ml-direction")) {
        case "row":
          delta = this.x - this.originalX;
          break;
        case "column":
        default:
          delta = this.y - this.originalY;
          break;
      }
      const value = parseFloat(EightML.getComputedStyle(prev, this.property));
      prev.removeAttribute("data-8ml-flex");
      prev.style.setProperty(this.property, (value + delta) + "px");
      this.selected.style = "";
    }
    this.selected = null;
  }
}

(new EightML_splitter());
