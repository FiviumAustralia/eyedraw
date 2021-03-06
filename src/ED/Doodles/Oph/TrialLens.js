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
 * TrialLens
 *
 * @class TrialLens
 * @property {String} className Name of doodle subclass
 * @param {Drawing} _drawing
 * @param {Object} _parameterJSON
 */
ED.TrialLens = function(_drawing, _parameterJSON) {
	// Set classname
	this.className = "TrialLens";

	// Derived parameters
	this.axis = '0';

	// Saved parameters
	this.savedParameterArray = ['rotation'];

	// Call super-class constructor
	ED.Doodle.call(this, _drawing, _parameterJSON);
}

/**
 * Sets superclass and constructor
 */
ED.TrialLens.prototype = new ED.Doodle;
ED.TrialLens.prototype.constructor = ED.TrialLens;
ED.TrialLens.superclass = ED.Doodle.prototype;

/**
 * Sets default dragging attributes
 */
ED.TrialLens.prototype.setPropertyDefaults = function() {
	this.isDeletable = false;
	this.isShowHighlight = false;
	this.isMoveable = false;
	this.addAtBack = true;
	this.isUnique = true;

	// Add complete validation arrays for derived parameters
	this.parameterValidationArray['axis'] = {
		kind: 'derived',
		type: 'mod',
		range: new ED.Range(0, 180),
		clock: 'bottom',
		animate: true
	};
}

/**
 * Sets default parameters (Only called for new doodles)
 * Use the setParameter function for derived parameters, as this will also update dependent variables
 */
ED.TrialLens.prototype.setParameterDefaults = function() {
	this.setParameterFromString('axis', '0');
}

/**
 * Calculates values of dependent parameters. This function embodies the relationship between simple and derived parameters
 * The returned parameters are animated if their 'animate' property is set to true
 *
 * @param {String} _parameter Name of parameter that has changed
 * @value {Undefined} _value Value of parameter to calculate
 * @returns {Array} Associative array of values of dependent parameters
 */
ED.TrialLens.prototype.dependentParameterValues = function(_parameter, _value) {
	var returnArray = new Array();

	switch (_parameter) {
		case 'rotation':
			returnArray['axis'] = (360 - 180 * _value / Math.PI) % 180;
			break;

		case 'axis':
			returnArray['rotation'] = (180 - _value) * Math.PI / 180;
			break;
	}

	return returnArray;
}

/**
 * Draws doodle or performs a hit test if a Point parameter is passed
 *
 * @param {Point} _point Optional point in canvas plane, passed if performing hit test
 */
ED.TrialLens.prototype.draw = function(_point) {
	// Get context
	var ctx = this.drawing.context;

	// Call draw method in superclass
	ED.TrialLens.superclass.draw.call(this, _point);

	// Radius of outer curve just inside ora on right and left fundus diagrams
	var ro = 360;
	var ri = 180;

	// Boundary path
	ctx.beginPath();

	// Arc across to mirror image point on the other side
	ctx.arc(0, 0, ro, 0, 2 * Math.PI, true);

	// Move to start of next arc
	ctx.moveTo(ri, 0);

	// Arc back to mirror image point on the other side
	ctx.arc(0, 0, ri, 2 * Math.PI, 0, false);

	// Set line attributes
	ctx.lineWidth = 4;
	ctx.fillStyle = "rgba(255,100,100,1)";
	ctx.strokeStyle = "gray";

	// Draw boundary path (also hit testing)
	this.drawBoundary(_point);

	// Other paths and drawing here
	if (this.drawFunctionMode == ED.drawFunctionMode.Draw) {
		var d = 20;
		ctx.beginPath();
		ctx.moveTo(ro - d, 0);
		ctx.lineTo(ri + d, 0);
		ctx.moveTo(-ro + d, 0);
		ctx.lineTo(-ri - d, 0);

		ctx.lineWidth = 16;
		ctx.strokeStyle = "black";
		ctx.stroke();
	}

	// Return value indicating successful hit test
	return this.isClicked;
}
