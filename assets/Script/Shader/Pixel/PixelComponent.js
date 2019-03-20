const ShaderComponent = require('ShaderComponent');
cc.Class({
    extends: ShaderComponent,
    editor: CC_EDITOR && {
        menu: 'Shader/PixelComponent',
        disallowMultiple: true,
        executeInEditMode: false,
        requireComponent: cc.RenderComponent,
    },
    properties: {
    },
    onLoad() {
        this.Material = require('PixelMaterial');
    },
});
