const ShaderComponent = require('ShaderComponent');
cc.Class({
    extends: ShaderComponent,
    editor: CC_EDITOR && {
        menu: 'Shader/MultiTextureComponent',
        disallowMultiple: true,
        executeInEditMode: false,
        requireComponent: cc.RenderComponent,
    },
    properties: {
        tex: {
            default: null,
            type: cc.Texture2D
        },
    },
    onLoad() {
        this.Material = require('MultiTextureMaterial');
    },

    onEnable() {
        ShaderComponent.prototype.onEnable.call(this);
        this.material.texture1 = this.tex;
    }
});
