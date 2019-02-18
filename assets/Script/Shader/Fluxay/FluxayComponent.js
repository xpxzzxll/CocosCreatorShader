const FluxayMaterial = require('FluxayMaterial');
const ShaderComponent = require('ShaderComponent');
cc.Class({
    extends: ShaderComponent,
    editor: CC_EDITOR && {
        menu: 'Shader/FluxayComponent',
        disallowMultiple: true,
        executeInEditMode: false,
        requireComponent: cc.RenderComponent,
    },
    properties: {
        _time: 0,
        time: {
            get () {
                return this._time;
            },
            set (val) {
                this._time = val;
                this.material.time = val;
            },
            visible : false
        },
    },
    onLoad() {
        this.Material = FluxayMaterial;
    },

    update(dt) {
        if (this._time > 65535) {
            this._time = 0;
        }
        this.time += dt;
    },
});
