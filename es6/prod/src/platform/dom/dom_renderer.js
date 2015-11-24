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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from 'angular2/src/core/di';
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
import { isPresent, isBlank, RegExpWrapper, CONST_EXPR, stringify } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { DomSharedStylesHost } from './shared_styles_host';
import { wtfLeave, wtfCreateScope } from 'angular2/src/core/profile/profile';
import { Renderer, RenderViewWithFragments, EventManager } from 'angular2/core';
import { DOCUMENT } from './dom_tokens';
import { createRenderView, encapsulateStyles } from 'angular2/src/core/render/view_factory';
import { DefaultProtoViewRef } from 'angular2/src/core/render/view';
import { camelCaseToDashCase } from './util';
import { ViewEncapsulation } from 'angular2/src/core/metadata';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
const NAMESPACE_URIS = CONST_EXPR({ 'xlink': 'http://www.w3.org/1999/xlink', 'svg': 'http://www.w3.org/2000/svg' });
export class DomRenderer extends Renderer {
    getNativeElementSync(location) {
        return resolveInternalDomView(location.renderView).boundElements[location.boundElementIndex];
    }
    getRootNodes(fragment) { return resolveInternalDomFragment(fragment); }
    attachFragmentAfterFragment(previousFragmentRef, fragmentRef) {
        var previousFragmentNodes = resolveInternalDomFragment(previousFragmentRef);
        if (previousFragmentNodes.length > 0) {
            var sibling = previousFragmentNodes[previousFragmentNodes.length - 1];
            let nodes = resolveInternalDomFragment(fragmentRef);
            moveNodesAfterSibling(sibling, nodes);
            this.animateNodesEnter(nodes);
        }
    }
    /**
     * Iterates through all nodes being added to the DOM and animates them if necessary
     * @param nodes
     */
    animateNodesEnter(nodes) {
        for (let i = 0; i < nodes.length; i++)
            this.animateNodeEnter(nodes[i]);
    }
    attachFragmentAfterElement(elementRef, fragmentRef) {
        var parentView = resolveInternalDomView(elementRef.renderView);
        var element = parentView.boundElements[elementRef.boundElementIndex];
        var nodes = resolveInternalDomFragment(fragmentRef);
        moveNodesAfterSibling(element, nodes);
        this.animateNodesEnter(nodes);
    }
    hydrateView(viewRef) { resolveInternalDomView(viewRef).hydrate(); }
    dehydrateView(viewRef) { resolveInternalDomView(viewRef).dehydrate(); }
    createTemplateAnchor(attrNameAndValues) {
        return this.createElement('script', attrNameAndValues);
    }
    createText(value) { return DOM.createTextNode(isPresent(value) ? value : ''); }
    appendChild(parent, child) { DOM.appendChild(parent, child); }
    setElementProperty(location, propertyName, propertyValue) {
        var view = resolveInternalDomView(location.renderView);
        DOM.setProperty(view.boundElements[location.boundElementIndex], propertyName, propertyValue);
    }
    setElementAttribute(location, attributeName, attributeValue) {
        var view = resolveInternalDomView(location.renderView);
        var element = view.boundElements[location.boundElementIndex];
        var dashCasedAttributeName = camelCaseToDashCase(attributeName);
        if (isPresent(attributeValue)) {
            DOM.setAttribute(element, dashCasedAttributeName, stringify(attributeValue));
        }
        else {
            DOM.removeAttribute(element, dashCasedAttributeName);
        }
    }
    setElementClass(location, className, isAdd) {
        var view = resolveInternalDomView(location.renderView);
        var element = view.boundElements[location.boundElementIndex];
        if (isAdd) {
            DOM.addClass(element, className);
        }
        else {
            DOM.removeClass(element, className);
        }
    }
    setElementStyle(location, styleName, styleValue) {
        var view = resolveInternalDomView(location.renderView);
        var element = view.boundElements[location.boundElementIndex];
        var dashCasedStyleName = camelCaseToDashCase(styleName);
        if (isPresent(styleValue)) {
            DOM.setStyle(element, dashCasedStyleName, stringify(styleValue));
        }
        else {
            DOM.removeStyle(element, dashCasedStyleName);
        }
    }
    invokeElementMethod(location, methodName, args) {
        var view = resolveInternalDomView(location.renderView);
        var element = view.boundElements[location.boundElementIndex];
        DOM.invoke(element, methodName, args);
    }
    setText(viewRef, textNodeIndex, text) {
        var view = resolveInternalDomView(viewRef);
        DOM.setText(view.boundTextNodes[textNodeIndex], text);
    }
    setEventDispatcher(viewRef, dispatcher) {
        resolveInternalDomView(viewRef).setEventDispatcher(dispatcher);
    }
}
export let DomRenderer_ = class extends DomRenderer {
    constructor(_eventManager, _domSharedStylesHost, _animate, document) {
        super();
        this._eventManager = _eventManager;
        this._domSharedStylesHost = _domSharedStylesHost;
        this._animate = _animate;
        this._componentTpls = new Map();
        /** @internal */
        this._createRootHostViewScope = wtfCreateScope('DomRenderer#createRootHostView()');
        /** @internal */
        this._createViewScope = wtfCreateScope('DomRenderer#createView()');
        /** @internal */
        this._detachFragmentScope = wtfCreateScope('DomRenderer#detachFragment()');
        this._document = document;
    }
    registerComponentTemplate(template) {
        this._componentTpls.set(template.id, template);
        if (template.encapsulation !== ViewEncapsulation.Native) {
            var encapsulatedStyles = encapsulateStyles(template);
            this._domSharedStylesHost.addStyles(encapsulatedStyles);
        }
    }
    createProtoView(componentTemplateId, cmds) {
        return new DefaultProtoViewRef(this._componentTpls.get(componentTemplateId), cmds);
    }
    resolveComponentTemplate(templateId) {
        return this._componentTpls.get(templateId);
    }
    createRootHostView(hostProtoViewRef, fragmentCount, hostElementSelector) {
        var s = this._createRootHostViewScope();
        var element = DOM.querySelector(this._document, hostElementSelector);
        if (isBlank(element)) {
            wtfLeave(s);
            throw new BaseException(`The selector "${hostElementSelector}" did not match any elements`);
        }
        return wtfLeave(s, this._createView(hostProtoViewRef, element));
    }
    createView(protoViewRef, fragmentCount) {
        var s = this._createViewScope();
        return wtfLeave(s, this._createView(protoViewRef, null));
    }
    _createView(protoViewRef, inplaceElement) {
        var dpvr = protoViewRef;
        var view = createRenderView(dpvr.template, dpvr.cmds, inplaceElement, this);
        var sdRoots = view.nativeShadowRoots;
        for (var i = 0; i < sdRoots.length; i++) {
            this._domSharedStylesHost.addHost(sdRoots[i]);
        }
        return new RenderViewWithFragments(view, view.fragments);
    }
    destroyView(viewRef) {
        var view = viewRef;
        var sdRoots = view.nativeShadowRoots;
        for (var i = 0; i < sdRoots.length; i++) {
            this._domSharedStylesHost.removeHost(sdRoots[i]);
        }
    }
    animateNodeEnter(node) {
        if (DOM.isElementNode(node) && DOM.hasClass(node, 'ng-animate')) {
            DOM.addClass(node, 'ng-enter');
            this._animate.css()
                .addAnimationClass('ng-enter-active')
                .start(node)
                .onComplete(() => { DOM.removeClass(node, 'ng-enter'); });
        }
    }
    animateNodeLeave(node) {
        if (DOM.isElementNode(node) && DOM.hasClass(node, 'ng-animate')) {
            DOM.addClass(node, 'ng-leave');
            this._animate.css()
                .addAnimationClass('ng-leave-active')
                .start(node)
                .onComplete(() => {
                DOM.removeClass(node, 'ng-leave');
                DOM.remove(node);
            });
        }
        else {
            DOM.remove(node);
        }
    }
    detachFragment(fragmentRef) {
        var s = this._detachFragmentScope();
        var fragmentNodes = resolveInternalDomFragment(fragmentRef);
        for (var i = 0; i < fragmentNodes.length; i++) {
            this.animateNodeLeave(fragmentNodes[i]);
        }
        wtfLeave(s);
    }
    createElement(name, attrNameAndValues) {
        var nsAndName = splitNamespace(name);
        var el = isPresent(nsAndName[0]) ?
            DOM.createElementNS(NAMESPACE_URIS[nsAndName[0]], nsAndName[1]) :
            DOM.createElement(nsAndName[1]);
        this._setAttributes(el, attrNameAndValues);
        return el;
    }
    mergeElement(existing, attrNameAndValues) {
        DOM.clearNodes(existing);
        this._setAttributes(existing, attrNameAndValues);
    }
    _setAttributes(node, attrNameAndValues) {
        for (var attrIdx = 0; attrIdx < attrNameAndValues.length; attrIdx += 2) {
            var attrNs;
            var attrName = attrNameAndValues[attrIdx];
            var nsAndName = splitNamespace(attrName);
            if (isPresent(nsAndName[0])) {
                attrName = nsAndName[0] + ':' + nsAndName[1];
                attrNs = NAMESPACE_URIS[nsAndName[0]];
            }
            var attrValue = attrNameAndValues[attrIdx + 1];
            if (isPresent(attrNs)) {
                DOM.setAttributeNS(node, attrNs, attrName, attrValue);
            }
            else {
                DOM.setAttribute(node, nsAndName[1], attrValue);
            }
        }
    }
    createRootContentInsertionPoint() {
        return DOM.createComment('root-content-insertion-point');
    }
    createShadowRoot(host, templateId) {
        var sr = DOM.createShadowRoot(host);
        var tpl = this._componentTpls.get(templateId);
        for (var i = 0; i < tpl.styles.length; i++) {
            DOM.appendChild(sr, DOM.createStyleElement(tpl.styles[i]));
        }
        return sr;
    }
    on(element, eventName, callback) {
        this._eventManager.addEventListener(element, eventName, decoratePreventDefault(callback));
    }
    globalOn(target, eventName, callback) {
        return this._eventManager.addGlobalEventListener(target, eventName, decoratePreventDefault(callback));
    }
};
DomRenderer_ = __decorate([
    Injectable(),
    __param(3, Inject(DOCUMENT)), 
    __metadata('design:paramtypes', [EventManager, DomSharedStylesHost, AnimationBuilder, Object])
], DomRenderer_);
function resolveInternalDomView(viewRef) {
    return viewRef;
}
function resolveInternalDomFragment(fragmentRef) {
    return fragmentRef.nodes;
}
function moveNodesAfterSibling(sibling, nodes) {
    if (nodes.length > 0 && isPresent(DOM.parentElement(sibling))) {
        for (var i = 0; i < nodes.length; i++) {
            DOM.insertBefore(sibling, nodes[i]);
        }
        DOM.insertBefore(nodes[0], sibling);
    }
}
function decoratePreventDefault(eventHandler) {
    return (event) => {
        var allowDefaultBehavior = eventHandler(event);
        if (!allowDefaultBehavior) {
            // TODO(tbosch): move preventDefault into event plugins...
            DOM.preventDefault(event);
        }
    };
}
var NS_PREFIX_RE = /^@([^:]+):(.+)/g;
function splitNamespace(name) {
    if (name[0] != '@') {
        return [null, name];
    }
    let match = RegExpWrapper.firstMatch(NS_PREFIX_RE, name);
    return [match[1], match[2]];
}
