const ShaderComponent = require('ShaderComponent');
cc.Class({
    extends: ShaderComponent,
    editor: CC_EDITOR && {
        menu: 'Shader/DissolveComponent',
        disallowMultiple: true,
        executeInEditMode: false,
        requireComponent: cc.RenderComponent,
    },
    properties: {
        tex: {
            default: null,
            type: cc.Texture2D
        },
        range: {
            default: 0,
            type: 'Float',
            range: [0, 1, 0.01],
            slide: true,
            notify: function () {
                this._updateRange();
            }
        },
    },
    onLoad() {
        this.Material = require('DissolveMaterial');
        this.forward = true;
    },

    onEnable() {
        ShaderComponent.prototype.onEnable.call(this);
        this.material.texture1 = this.tex;
        this.material.range = this.range;
    },
    
    _updateRange () {
        if (!CC_EDITOR) {
            this.material.range = this.range;
        }
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
