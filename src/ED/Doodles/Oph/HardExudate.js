/**
 * OpenEyes
 *
 * Copyright (C) OpenEyes Foundation, 2011-2017
 * This file is part of OpenEyes.
 * OpenEyes is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * OpenEyes is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License along with OpenEyes in a file titled COPYING. If not, see <http://www.gnu.org/licenses/>.
 *
 * @package OpenEyes
 * @link http://www.openeyes.org.uk
 * @author OpenEyes <info@openeyes.org.uk>
 * @copyright Copyright 2011-2017, OpenEyes Foundation
 * @license http://www.gnu.org/licenses/agpl-3.0.html The GNU Affero General Public License V3.0
 */

/**
 * Hard exudate
 *
 * @class HardExudate
 * @property {String} className Name of doodle subclass
 * @param {Drawing} _drawing
 * @param {Object} _parameterJSON
 */
ED.HardExudate = function(_drawing, _parameterJSON) {
	// Set classname
	this.className = "HardExudate";

	// Saved parameters
	this.savedParameterArray = ['originX', 'originY'];
	
	// Call superclass constructor
	ED.Doodle.call(this, _drawing, _parameterJSON);
}

/**
 * Sets superclass and constructor
 */
ED.HardExudate.prototype = new ED.Doodle;
ED.HardExudate.prototype.constructor = ED.HardExudate;
ED.HardExudate.superclass = ED.Doodle.prototype;

/**
 * Sets default parameters (Only called for new doodles)
 * Use the setParameter function for derived parameters, as this will also update dependent variables
 */
ED.HardExudate.prototype.setParameterDefaults = function() {
	this.setOriginWithDisplacements(50, 30);
}

/**
 * Draws doodle or performs a hit test if a Point parameter is passed
 *
 * @param {Point} _point Optional point in canvas plane, passed if performing hit test
 */
ED.HardExudate.prototype.draw = function(_point) {
	// Get context
	var ctx = this.drawing.context;

	// Call draw method in superclass
	ED.HardExudate.superclass.draw.call(this, _point);

	// Exudate radius
	var r = 14;

	// Boundary path
	ctx.beginPath();

	// Exudate
	ctx.arc(0, 0, r, 0, 2 * Math.PI, true);

	// Set attributes
	ctx.lineWidth = 1;
	ctx.strokeStyle = "rgba(220,220,0,1)";
	ctx.fillStyle = "rgba(220,220,0,1)";

	// Draw boundary path (also hit testing)
	this.drawBoundary(_point);

	// Return value indicating successful hittest
	return this.isClicked;
}

/**
 * Returns a String which, if not empty, determines the root descriptions of multiple instances of the doodle
 *
 * @returns {String} Group description
 */
ED.HardExudate.prototype.groupDescription = function() {
	return "Hard exudates";
}
