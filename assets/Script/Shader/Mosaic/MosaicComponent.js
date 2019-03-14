const ShaderComponent = require('ShaderComponent');
cc.Class({
    extends: ShaderComponent,
    editor: CC_EDITOR && {
        menu: 'Shader/MosaicComponent',
        disallowMultiple: true,
        executeInEditMode: false,
        requireComponent: cc.RenderComponent,
    },
    properties: {
    },
    onLoad() {
        this.Material = require('MosaicMaterial');
    },
});
