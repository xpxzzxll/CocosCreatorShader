cc.Class({
    extends: cc.Component,
    editor: CC_EDITOR && {
        disallowMultiple: true,
        executeInEditMode: false,
        requireComponent: cc.RenderComponent,
    },
    properties: {
        range: {
            default: 0,
            type: cc.Float,
            range: [0, 1, 0.01],
            slide: true,
            notify: function () {
                this._updateRange();
            }
        },
    },
    onLoad() {
        this.forward = true;
    },

    onEnable() {
    },
    
    _updateRange () {
        this.node.getComponent(cc.RenderComponent).getMaterial(0).setProperty('range', this.range);
    },


    update(dt) {
        if (this.forward) {
            this.range += 0.005;
            if (this.range >= 1.0) {
                this.forward = false;
            }
        }else {
            this.range -= 0.005;
            if (this.range <= 0.0) {
                this.forward = true;
            }
        }
    }
});
