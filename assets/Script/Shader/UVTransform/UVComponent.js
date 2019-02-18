const UVMaterial = require('UVMaterial');
const ShaderComponent = require('ShaderComponent');
cc.Class({
    extends: ShaderComponent,
    editor: CC_EDITOR && {
        menu: 'Shader/UVComponent',
        disallowMultiple: true,
        executeInEditMode: false,
        requireComponent: cc.Sprite,
    },
    properties: {
        _uvOffset: cc.v2(0.0, 0.0),
        offset: {
            get () {
                return this._uvOffset;
            },
            set (val) {
                this._uvOffset.x = val.x;
                this._uvOffset.y = val.y;
                this.material.u_offset = this._uvOffset;
            }
        },

        _uvTiling: cc.v2(1.0, 1.0),
        tiling: {
            get () {
                return this._uvTiling;
            },
            set (val) {
                this._uvTiling.x = val.x;
                this._uvTiling.y = val.y;
                this.material.u_offset_tiling = this._uvTiling;
            }
        },
    },

    onLoad() {
        this.Material = UVMaterial;
    },

    update(dt) {
        this.offset = cc.v2(this.offset.x + 0.001, this.offset.y);
    },
});
