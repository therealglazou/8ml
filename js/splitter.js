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

  onmousedown(aTarget, aEventName) {
    console.log("### " + aEventName + " " + this.role);
  }

  onmouseup(aTarget, aEventName) {
    console.log("### " + aEventName + " " + this.role);
  }
}

(new EightML_splitter());
