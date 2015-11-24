import { isBlank } from 'angular2/src/facade/lang';
const NG_CONTENT_SELECT_ATTR = 'select';
const NG_CONTENT_ELEMENT = 'ng-content';
const LINK_ELEMENT = 'link';
const LINK_STYLE_REL_ATTR = 'rel';
const LINK_STYLE_HREF_ATTR = 'href';
const LINK_STYLE_REL_VALUE = 'stylesheet';
const STYLE_ELEMENT = 'style';
const SCRIPT_ELEMENT = 'script';
const NG_NON_BINDABLE_ATTR = 'ng-non-bindable';
export function preparseElement(ast) {
    var selectAttr = null;
    var hrefAttr = null;
    var relAttr = null;
    var nonBindable = false;
    ast.attrs.forEach(attr => {
        let attrName = attr.name.toLowerCase();
        if (attrName == NG_CONTENT_SELECT_ATTR) {
            selectAttr = attr.value;
        }
        else if (attrName == LINK_STYLE_HREF_ATTR) {
            hrefAttr = attr.value;
        }
        else if (attrName == LINK_STYLE_REL_ATTR) {
            relAttr = attr.value;
        }
        else if (attrName == NG_NON_BINDABLE_ATTR) {
            nonBindable = true;
        }
    });
    selectAttr = normalizeNgContentSelect(selectAttr);
    var nodeName = ast.name.toLowerCase();
    var type = PreparsedElementType.OTHER;
    if (nodeName == NG_CONTENT_ELEMENT) {
        type = PreparsedElementType.NG_CONTENT;
    }
    else if (nodeName == STYLE_ELEMENT) {
        type = PreparsedElementType.STYLE;
    }
    else if (nodeName == SCRIPT_ELEMENT) {
        type = PreparsedElementType.SCRIPT;
    }
    else if (nodeName == LINK_ELEMENT && relAttr == LINK_STYLE_REL_VALUE) {
        type = PreparsedElementType.STYLESHEET;
    }
    return new PreparsedElement(type, selectAttr, hrefAttr, nonBindable);
}
export var PreparsedElementType;
(function (PreparsedElementType) {
    PreparsedElementType[PreparsedElementType["NG_CONTENT"] = 0] = "NG_CONTENT";
    PreparsedElementType[PreparsedElementType["STYLE"] = 1] = "STYLE";
    PreparsedElementType[PreparsedElementType["STYLESHEET"] = 2] = "STYLESHEET";
    PreparsedElementType[PreparsedElementType["SCRIPT"] = 3] = "SCRIPT";
    PreparsedElementType[PreparsedElementType["OTHER"] = 4] = "OTHER";
})(PreparsedElementType || (PreparsedElementType = {}));
export class PreparsedElement {
    constructor(type, selectAttr, hrefAttr, nonBindable) {
        this.type = type;
        this.selectAttr = selectAttr;
        this.hrefAttr = hrefAttr;
        this.nonBindable = nonBindable;
    }
}
function normalizeNgContentSelect(selectAttr) {
    if (isBlank(selectAttr) || selectAttr.length === 0) {
        return '*';
    }
    return selectAttr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVfcHJlcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX3ByZXBhcnNlci50cyJdLCJuYW1lcyI6WyJwcmVwYXJzZUVsZW1lbnQiLCJQcmVwYXJzZWRFbGVtZW50VHlwZSIsIlByZXBhcnNlZEVsZW1lbnQiLCJQcmVwYXJzZWRFbGVtZW50LmNvbnN0cnVjdG9yIiwibm9ybWFsaXplTmdDb250ZW50U2VsZWN0Il0sIm1hcHBpbmdzIjoiT0FDTyxFQUFDLE9BQU8sRUFBWSxNQUFNLDBCQUEwQjtBQUUzRCxNQUFNLHNCQUFzQixHQUFHLFFBQVEsQ0FBQztBQUN4QyxNQUFNLGtCQUFrQixHQUFHLFlBQVksQ0FBQztBQUN4QyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUM7QUFDNUIsTUFBTSxtQkFBbUIsR0FBRyxLQUFLLENBQUM7QUFDbEMsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUM7QUFDcEMsTUFBTSxvQkFBb0IsR0FBRyxZQUFZLENBQUM7QUFDMUMsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDO0FBQzlCLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQztBQUNoQyxNQUFNLG9CQUFvQixHQUFHLGlCQUFpQixDQUFDO0FBRS9DLGdDQUFnQyxHQUFtQjtJQUNqREEsSUFBSUEsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDdEJBLElBQUlBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO0lBQ3BCQSxJQUFJQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQTtJQUNuQkEsSUFBSUEsV0FBV0EsR0FBR0EsS0FBS0EsQ0FBQ0E7SUFDeEJBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBO1FBQ3BCQSxJQUFJQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtRQUN2Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsSUFB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QUNBO1FBQ25EQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQTtJQUNiQSxDQUFDQTtJQUNEQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQTtBQUNwQkEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0bWxFbGVtZW50QXN0fSBmcm9tICcuL2h0bWxfYXN0JztcbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5jb25zdCBOR19DT05URU5UX1NFTEVDVF9BVFRSID0gJ3NlbGVjdCc7XG5jb25zdCBOR19DT05URU5UX0VMRU1FTlQgPSAnbmctY29udGVudCc7XG5jb25zdCBMSU5LX0VMRU1FTlQgPSAnbGluayc7XG5jb25zdCBMSU5LX1NUWUxFX1JFTF9BVFRSID0gJ3JlbCc7XG5jb25zdCBMSU5LX1NUWUxFX0hSRUZfQVRUUiA9ICdocmVmJztcbmNvbnN0IExJTktfU1RZTEVfUkVMX1ZBTFVFID0gJ3N0eWxlc2hlZXQnO1xuY29uc3QgU1RZTEVfRUxFTUVOVCA9ICdzdHlsZSc7XG5jb25zdCBTQ1JJUFRfRUxFTUVOVCA9ICdzY3JpcHQnO1xuY29uc3QgTkdfTk9OX0JJTkRBQkxFX0FUVFIgPSAnbmctbm9uLWJpbmRhYmxlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcnNlRWxlbWVudChhc3Q6IEh0bWxFbGVtZW50QXN0KTogUHJlcGFyc2VkRWxlbWVudCB7XG4gIHZhciBzZWxlY3RBdHRyID0gbnVsbDtcbiAgdmFyIGhyZWZBdHRyID0gbnVsbDtcbiAgdmFyIHJlbEF0dHIgPSBudWxsO1xuICB2YXIgbm9uQmluZGFibGUgPSBmYWxzZTtcbiAgYXN0LmF0dHJzLmZvckVhY2goYXR0ciA9PiB7XG4gICAgbGV0IGF0dHJOYW1lID0gYXR0ci5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGF0dHJOYW1lID09IE5HX0NPTlRFTlRfU0VMRUNUX0FUVFIpIHtcbiAgICAgIHNlbGVjdEF0dHIgPSBhdHRyLnZhbHVlO1xuICAgIH0gZWxzZSBpZiAoYXR0ck5hbWUgPT0gTElOS19TVFlMRV9IUkVGX0FUVFIpIHtcbiAgICAgIGhyZWZBdHRyID0gYXR0ci52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGF0dHJOYW1lID09IExJTktfU1RZTEVfUkVMX0FUVFIpIHtcbiAgICAgIHJlbEF0dHIgPSBhdHRyLnZhbHVlO1xuICAgIH0gZWxzZSBpZiAoYXR0ck5hbWUgPT0gTkdfTk9OX0JJTkRBQkxFX0FUVFIpIHtcbiAgICAgIG5vbkJpbmRhYmxlID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICBzZWxlY3RBdHRyID0gbm9ybWFsaXplTmdDb250ZW50U2VsZWN0KHNlbGVjdEF0dHIpO1xuICB2YXIgbm9kZU5hbWUgPSBhc3QubmFtZS50b0xvd2VyQ2FzZSgpO1xuICB2YXIgdHlwZSA9IFByZXBhcnNlZEVsZW1lbnRUeXBlLk9USEVSO1xuICBpZiAobm9kZU5hbWUgPT0gTkdfQ09OVEVOVF9FTEVNRU5UKSB7XG4gICAgdHlwZSA9IFByZXBhcnNlZEVsZW1lbnRUeXBlLk5HX0NPTlRFTlQ7XG4gIH0gZWxzZSBpZiAobm9kZU5hbWUgPT0gU1RZTEVfRUxFTUVOVCkge1xuICAgIHR5cGUgPSBQcmVwYXJzZWRFbGVtZW50VHlwZS5TVFlMRTtcbiAgfSBlbHNlIGlmIChub2RlTmFtZSA9PSBTQ1JJUFRfRUxFTUVOVCkge1xuICAgIHR5cGUgPSBQcmVwYXJzZWRFbGVtZW50VHlwZS5TQ1JJUFQ7XG4gIH0gZWxzZSBpZiAobm9kZU5hbWUgPT0gTElOS19FTEVNRU5UICYmIHJlbEF0dHIgPT0gTElOS19TVFlMRV9SRUxfVkFMVUUpIHtcbiAgICB0eXBlID0gUHJlcGFyc2VkRWxlbWVudFR5cGUuU1RZTEVTSEVFVDtcbiAgfVxuICByZXR1cm4gbmV3IFByZXBhcnNlZEVsZW1lbnQodHlwZSwgc2VsZWN0QXR0ciwgaHJlZkF0dHIsIG5vbkJpbmRhYmxlKTtcbn1cblxuZXhwb3J0IGVudW0gUHJlcGFyc2VkRWxlbWVudFR5cGUge1xuICBOR19DT05URU5ULFxuICBTVFlMRSxcbiAgU1RZTEVTSEVFVCxcbiAgU0NSSVBULFxuICBPVEhFUlxufVxuXG5leHBvcnQgY2xhc3MgUHJlcGFyc2VkRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBQcmVwYXJzZWRFbGVtZW50VHlwZSwgcHVibGljIHNlbGVjdEF0dHI6IHN0cmluZywgcHVibGljIGhyZWZBdHRyOiBzdHJpbmcsXG4gICAgICAgICAgICAgIHB1YmxpYyBub25CaW5kYWJsZTogYm9vbGVhbikge31cbn1cblxuXG5mdW5jdGlvbiBub3JtYWxpemVOZ0NvbnRlbnRTZWxlY3Qoc2VsZWN0QXR0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKGlzQmxhbmsoc2VsZWN0QXR0cikgfHwgc2VsZWN0QXR0ci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gJyonO1xuICB9XG4gIHJldHVybiBzZWxlY3RBdHRyO1xufVxuIl19