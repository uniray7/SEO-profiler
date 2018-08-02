class Rule{
    constructor(scope) {
        this._scope = scope;
        this._tag = null;
        this._attr = null;
        this._cond = null;
        this._thres = null;

    }

    tag(target) {
        this._tag = target;
        return this
    }

    notHasAttr(attr, value) {
        this._attr = {};
        this._attr.key = attr
        if(value) {
            this._attr.value = value;
        }
        this._attr.exist = false;
        return this;
    }

    hasAttr(attr, value) {
        this._attr = {};
        this._attr.key = attr
        if(value) {
            this._attr.value = value;
        }
        this._attr.exist = true;
        return this;
    }


    gt(num) {
        this._cond = 'gt';
        this._thres = num;
        return this;
    }
}


module.exports = Rule;
