"use strict";
/* tslint:disable quotemark */
Object.defineProperty(exports, "__esModule", { value: true });
// TODO:
// test mark-tick with the following test cases,
// looking at mark-point.test.ts as inspiration
//
// After finishing all test, make sure all lines in mark-tick.ts is tested
// (except the scaffold labels() method)
var chai_1 = require("chai");
var channel_1 = require("../../../src/channel");
var tick_1 = require("../../../src/compile/mark/tick");
var util_1 = require("../../util");
describe('Mark: Tick', function () {
    describe('with stacked x', function () {
        // This is a simplified example for stacked tick.
        // In reality this will be used as stacked's overlayed marker
        var model = util_1.parseUnitModelWithScaleMarkDefLayoutSize({
            "mark": "tick",
            "encoding": {
                "x": { "aggregate": "sum", "field": "a", "type": "quantitative" },
                "color": { "field": "b", "type": "ordinal" }
            },
            "data": { "url": "data/barley.json" },
            "config": { "stack": "zero" }
        });
        var props = tick_1.tick.encodeEntry(model);
        it('should use stack_end on x', function () {
            chai_1.assert.deepEqual(props.xc, { scale: channel_1.X, field: 'sum_a_end' });
        });
    });
    describe('with stacked y', function () {
        // This is a simplified example for stacked tick.
        // In reality this will be used as stacked's overlayed marker
        var model = util_1.parseUnitModelWithScaleMarkDefLayoutSize({
            "mark": "tick",
            "encoding": {
                "y": { "aggregate": "sum", "field": "a", "type": "quantitative" },
                "color": { "field": "b", "type": "ordinal" }
            },
            "data": { "url": "data/barley.json" },
            "config": { "stack": "zero" }
        });
        var props = tick_1.tick.encodeEntry(model);
        it('should use stack_end on y', function () {
            chai_1.assert.deepEqual(props.yc, { scale: channel_1.Y, field: 'sum_a_end' });
        });
    });
    describe('with quantitative x', function () {
        var model = util_1.parseUnitModelWithScaleMarkDefLayoutSize({
            'mark': 'tick',
            'encoding': { 'x': { 'field': 'Horsepower', 'type': 'quantitative' } },
            'data': { 'url': 'data/cars.json' }
        });
        var props = tick_1.tick.encodeEntry(model);
        it('should be centered on y', function () {
            chai_1.assert.deepEqual(props.yc, { value: 10.5 });
        });
        it('should scale on x', function () {
            chai_1.assert.deepEqual(props.xc, { scale: channel_1.X, field: 'Horsepower' });
        });
        it('width should tick thickness with orient vertical', function () {
            chai_1.assert.deepEqual(props.width, { value: 1 });
        });
    });
    describe('with quantitative y', function () {
        var model = util_1.parseUnitModelWithScaleMarkDefLayoutSize({
            'mark': 'tick',
            'encoding': { 'y': { 'field': 'Cylinders', 'type': 'quantitative' } },
            'data': { 'url': 'data/cars.json' }
        });
        var props = tick_1.tick.encodeEntry(model);
        it('should be centered on x', function () {
            chai_1.assert.deepEqual(props.xc, { value: 10.5 });
        });
        it('should scale on y', function () {
            chai_1.assert.deepEqual(props.yc, { scale: channel_1.Y, field: 'Cylinders' });
        });
        it('height should tick thickness with orient horizontal', function () {
            chai_1.assert.deepEqual(props.height, { value: 1 });
        });
    });
    describe('with quantitative x and ordinal y', function () {
        var model = util_1.parseUnitModelWithScaleMarkDefLayoutSize({
            'mark': 'tick',
            'encoding': {
                'x': { 'field': 'Horsepower', 'type': 'quantitative' },
                'y': { 'field': 'Cylinders', 'type': 'ordinal' }
            },
            'data': { 'url': 'data/cars.json' }
        });
        var props = tick_1.tick.encodeEntry(model);
        it('should scale on x', function () {
            chai_1.assert.deepEqual(props.xc, { scale: channel_1.X, field: 'Horsepower' });
        });
        it('should scale on y', function () {
            chai_1.assert.deepEqual(props.yc, { scale: channel_1.Y, field: 'Cylinders' });
        });
        it('wiidth should be tick thickness with default orient vertical', function () {
            chai_1.assert.deepEqual(props.width, { value: 1 });
        });
        it('height should be matched to field with default orient vertical', function () {
            chai_1.assert.deepEqual(props.height, { value: 14 });
        });
    });
    describe('width should be mapped to size', function () {
        var model = util_1.parseUnitModelWithScaleMarkDefLayoutSize({
            'mark': 'tick',
            'config': { 'mark': { 'orient': 'vertical' } },
            'encoding': {
                'x': { 'field': 'Horsepower', 'type': 'quantitative' },
                'y': { 'field': 'Cylinders', 'type': 'ordinal' },
                'size': { 'field': 'Acceleration', 'type': 'quantitative' }
            },
            'data': { 'url': 'data/cars.json' },
        });
        var props = tick_1.tick.encodeEntry(model);
        it('width should change with size field', function () {
            chai_1.assert.deepEqual(props.height, { 'field': 'Acceleration', 'scale': channel_1.SIZE });
        });
    });
    describe('height should be mapped to size', function () {
        var model = util_1.parseUnitModelWithScaleMarkDefLayoutSize({
            'mark': 'tick',
            'encoding': {
                'x': { 'field': 'Horsepower', 'type': 'quantitative' },
                'y': { 'field': 'Cylinders', 'type': 'ordinal' },
                'size': { 'field': 'Acceleration', 'type': 'quantitative' }
            },
            'data': { 'url': 'data/cars.json' },
        });
        var props = tick_1.tick.encodeEntry(model);
        it('height should change with size field', function () {
            chai_1.assert.deepEqual(props.height, { 'field': 'Acceleration', 'scale': channel_1.SIZE });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGljay50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGVzdC9jb21waWxlL21hcmsvdGljay50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4QkFBOEI7O0FBRzlCLFFBQVE7QUFDUixnREFBZ0Q7QUFDaEQsK0NBQStDO0FBQy9DLEVBQUU7QUFDRiwwRUFBMEU7QUFDMUUsd0NBQXdDO0FBQ3hDLDZCQUE0QjtBQUM1QixnREFBZ0Q7QUFDaEQsdURBQW9EO0FBQ3BELG1DQUFvRTtBQUVwRSxRQUFRLENBQUMsWUFBWSxFQUFFO0lBQ3JCLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUN6QixpREFBaUQ7UUFDakQsNkRBQTZEO1FBQzdELElBQU0sS0FBSyxHQUFHLCtDQUF3QyxDQUFDO1lBQ3JELE1BQU0sRUFBRSxNQUFNO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLEdBQUcsRUFBRSxFQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFDO2dCQUMvRCxPQUFPLEVBQUUsRUFBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUM7YUFDM0M7WUFDRCxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsa0JBQWtCLEVBQUM7WUFDbkMsUUFBUSxFQUFFLEVBQUMsT0FBTyxFQUFHLE1BQU0sRUFBQztTQUM3QixDQUFDLENBQUM7UUFFSCxJQUFNLEtBQUssR0FBRyxXQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRDLEVBQUUsQ0FBQywyQkFBMkIsRUFBRTtZQUM5QixhQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsV0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFHSCxRQUFR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