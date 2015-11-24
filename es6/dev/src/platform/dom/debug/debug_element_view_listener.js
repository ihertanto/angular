var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CONST_EXPR, isPresent, NumberWrapper } from 'angular2/src/facade/lang';
import { Map } from 'angular2/src/facade/collection';
import { Injectable, Provider } from 'angular2/src/core/di';
import { AppViewListener } from 'angular2/src/core/linker/view_listener';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import { Renderer } from 'angular2/src/core/render/api';
import { DebugElement_ } from 'angular2/src/core/debug/debug_element';
const NG_ID_PROPERTY = 'ngid';
const INSPECT_GLOBAL_NAME = 'ng.probe';
const NG_ID_SEPARATOR = '#';
// Need to keep the views in a global Map so that multiple angular apps are supported
var _allIdsByView = new Map();
var _allViewsById = new Map();
var _nextId = 0;
function _setElementId(element, indices) {
    if (isPresent(element)) {
        DOM.setData(element, NG_ID_PROPERTY, indices.join(NG_ID_SEPARATOR));
    }
}
function _getElementId(element) {
    var elId = DOM.getData(element, NG_ID_PROPERTY);
    if (isPresent(elId)) {
        return elId.split(NG_ID_SEPARATOR).map(partStr => NumberWrapper.parseInt(partStr, 10));
    }
    else {
        return null;
    }
}
export function inspectNativeElement(element) {
    var elId = _getElementId(element);
    if (isPresent(elId)) {
        var view = _allViewsById.get(elId[0]);
        if (isPresent(view)) {
            return new DebugElement_(view, elId[1]);
        }
    }
    return null;
}
export let DebugElementViewListener = class {
    constructor(_renderer) {
        this._renderer = _renderer;
        DOM.setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
    }
    onViewCreated(view) {
        var viewId = _nextId++;
        _allViewsById.set(viewId, view);
        _allIdsByView.set(view, viewId);
        for (var i = 0; i < view.elementRefs.length; i++) {
            var el = view.elementRefs[i];
            _setElementId(this._renderer.getNativeElementSync(el), [viewId, i]);
        }
    }
    onViewDestroyed(view) {
        var viewId = _allIdsByView.get(view);
        _allIdsByView.delete(view);
        _allViewsById.delete(viewId);
    }
};
DebugElementViewListener = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [Renderer])
], DebugElementViewListener);
export const ELEMENT_PROBE_PROVIDERS = CONST_EXPR([
    DebugElementViewListener,
    CONST_EXPR(new Provider(AppViewListener, { useExisting: DebugElementViewListener })),
]);
export const ELEMENT_PROBE_BINDINGS = ELEMENT_PROBE_PROVIDERS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWdfZWxlbWVudF92aWV3X2xpc3RlbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kZWJ1Zy9kZWJ1Z19lbGVtZW50X3ZpZXdfbGlzdGVuZXIudHMiXSwibmFtZXMiOlsiX3NldEVsZW1lbnRJZCIsIl9nZXRFbGVtZW50SWQiLCJpbnNwZWN0TmF0aXZlRWxlbWVudCIsIkRlYnVnRWxlbWVudFZpZXdMaXN0ZW5lciIsIkRlYnVnRWxlbWVudFZpZXdMaXN0ZW5lci5jb25zdHJ1Y3RvciIsIkRlYnVnRWxlbWVudFZpZXdMaXN0ZW5lci5vblZpZXdDcmVhdGVkIiwiRGVidWdFbGVtZW50Vmlld0xpc3RlbmVyLm9uVmlld0Rlc3Ryb3llZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7T0FBTyxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFnQixNQUFNLDBCQUEwQjtPQUNyRixFQUFhLEdBQUcsRUFBYyxNQUFNLGdDQUFnQztPQUNwRSxFQUFDLFVBQVUsRUFBVyxRQUFRLEVBQUMsTUFBTSxzQkFBc0I7T0FDM0QsRUFBQyxlQUFlLEVBQUMsTUFBTSx3Q0FBd0M7T0FFL0QsRUFBQyxHQUFHLEVBQUMsTUFBTSx1Q0FBdUM7T0FDbEQsRUFBQyxRQUFRLEVBQUMsTUFBTSw4QkFBOEI7T0FDOUMsRUFBZSxhQUFhLEVBQUMsTUFBTSx1Q0FBdUM7QUFFakYsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDO0FBQzlCLE1BQU0sbUJBQW1CLEdBQUcsVUFBVSxDQUFDO0FBRXZDLE1BQU0sZUFBZSxHQUFHLEdBQUcsQ0FBQztBQUU1QixxRkFBcUY7QUFDckYsSUFBSSxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQW1CLENBQUM7QUFDL0MsSUFBSSxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQW1CLENBQUM7QUFFL0MsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBRWhCLHVCQUF1QixPQUFPLEVBQUUsT0FBaUI7SUFD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YUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDM0JBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO0lBQy9CQSxDQUFDQTtBQUNISCxDQUFDQTtBQXJCRDtJQUFDLFVBQVUsRUFBRTs7NkJBcUJaO0FBRUQsYUFBYSx1QkFBdUIsR0FBVSxVQUFVLENBQUM7SUFDdkQsd0JBQXdCO0lBQ3hCLFVBQVUsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxlQUFlLEVBQUUsRUFBQyxXQUFXLEVBQUUsd0JBQXdCLEVBQUMsQ0FBQyxDQUFDO0NBQ25GLENBQUMsQ0FBQztBQUVILGFBQWEsc0JBQXNCLEdBQUcsdUJBQXVCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NPTlNUX0VYUFIsIGlzUHJlc2VudCwgTnVtYmVyV3JhcHBlciwgU3RyaW5nV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TWFwV3JhcHBlciwgTWFwLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgcHJvdmlkZSwgUHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7QXBwVmlld0xpc3RlbmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvdmlld19saXN0ZW5lcic7XG5pbXBvcnQge0FwcFZpZXd9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3JztcbmltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7UmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlbmRlci9hcGknO1xuaW1wb3J0IHtEZWJ1Z0VsZW1lbnQsIERlYnVnRWxlbWVudF99IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RlYnVnL2RlYnVnX2VsZW1lbnQnO1xuXG5jb25zdCBOR19JRF9QUk9QRVJUWSA9ICduZ2lkJztcbmNvbnN0IElOU1BFQ1RfR0xPQkFMX05BTUUgPSAnbmcucHJvYmUnO1xuXG5jb25zdCBOR19JRF9TRVBBUkFUT1IgPSAnIyc7XG5cbi8vIE5lZWQgdG8ga2VlcCB0aGUgdmlld3MgaW4gYSBnbG9iYWwgTWFwIHNvIHRoYXQgbXVsdGlwbGUgYW5ndWxhciBhcHBzIGFyZSBzdXBwb3J0ZWRcbnZhciBfYWxsSWRzQnlWaWV3ID0gbmV3IE1hcDxBcHBWaWV3LCBudW1iZXI+KCk7XG52YXIgX2FsbFZpZXdzQnlJZCA9IG5ldyBNYXA8bnVtYmVyLCBBcHBWaWV3PigpO1xuXG52YXIgX25leHRJZCA9IDA7XG5cbmZ1bmN0aW9uIF9zZXRFbGVtZW50SWQoZWxlbWVudCwgaW5kaWNlczogbnVtYmVyW10pIHtcbiAgaWYgKGlzUHJlc2VudChlbGVtZW50KSkge1xuICAgIERPTS5zZXREYXRhKGVsZW1lbnQsIE5HX0lEX1BST1BFUlRZLCBpbmRpY2VzLmpvaW4oTkdfSURfU0VQQVJBVE9SKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2dldEVsZW1lbnRJZChlbGVtZW50KTogbnVtYmVyW10ge1xuICB2YXIgZWxJZCA9IERPTS5nZXREYXRhKGVsZW1lbnQsIE5HX0lEX1BST1BFUlRZKTtcbiAgaWYgKGlzUHJlc2VudChlbElkKSkge1xuICAgIHJldHVybiBlbElkLnNwbGl0KE5HX0lEX1NFUEFSQVRPUikubWFwKHBhcnRTdHIgPT4gTnVtYmVyV3JhcHBlci5wYXJzZUludChwYXJ0U3RyLCAxMCkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNwZWN0TmF0aXZlRWxlbWVudChlbGVtZW50KTogRGVidWdFbGVtZW50IHtcbiAgdmFyIGVsSWQgPSBfZ2V0RWxlbWVudElkKGVsZW1lbnQpO1xuICBpZiAoaXNQcmVzZW50KGVsSWQpKSB7XG4gICAgdmFyIHZpZXcgPSBfYWxsVmlld3NCeUlkLmdldChlbElkWzBdKTtcbiAgICBpZiAoaXNQcmVzZW50KHZpZXcpKSB7XG4gICAgICByZXR1cm4gbmV3IERlYnVnRWxlbWVudF8odmlldywgZWxJZFsxXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVidWdFbGVtZW50Vmlld0xpc3RlbmVyIGltcGxlbWVudHMgQXBwVmlld0xpc3RlbmVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyKSB7XG4gICAgRE9NLnNldEdsb2JhbFZhcihJTlNQRUNUX0dMT0JBTF9OQU1FLCBpbnNwZWN0TmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBvblZpZXdDcmVhdGVkKHZpZXc6IEFwcFZpZXcpIHtcbiAgICB2YXIgdmlld0lkID0gX25leHRJZCsrO1xuICAgIF9hbGxWaWV3c0J5SWQuc2V0KHZpZXdJZCwgdmlldyk7XG4gICAgX2FsbElkc0J5Vmlldy5zZXQodmlldywgdmlld0lkKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcuZWxlbWVudFJlZnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBlbCA9IHZpZXcuZWxlbWVudFJlZnNbaV07XG4gICAgICBfc2V0RWxlbWVudElkKHRoaXMuX3JlbmRlcmVyLmdldE5hdGl2ZUVsZW1lbnRTeW5jKGVsKSwgW3ZpZXdJZCwgaV0pO1xuICAgIH1cbiAgfVxuXG4gIG9uVmlld0Rlc3Ryb3llZCh2aWV3OiBBcHBWaWV3KSB7XG4gICAgdmFyIHZpZXdJZCA9IF9hbGxJZHNCeVZpZXcuZ2V0KHZpZXcpO1xuICAgIF9hbGxJZHNCeVZpZXcuZGVsZXRlKHZpZXcpO1xuICAgIF9hbGxWaWV3c0J5SWQuZGVsZXRlKHZpZXdJZCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEVMRU1FTlRfUFJPQkVfUFJPVklERVJTOiBhbnlbXSA9IENPTlNUX0VYUFIoW1xuICBEZWJ1Z0VsZW1lbnRWaWV3TGlzdGVuZXIsXG4gIENPTlNUX0VYUFIobmV3IFByb3ZpZGVyKEFwcFZpZXdMaXN0ZW5lciwge3VzZUV4aXN0aW5nOiBEZWJ1Z0VsZW1lbnRWaWV3TGlzdGVuZXJ9KSksXG5dKTtcblxuZXhwb3J0IGNvbnN0IEVMRU1FTlRfUFJPQkVfQklORElOR1MgPSBFTEVNRU5UX1BST0JFX1BST1ZJREVSUzsiXX0=