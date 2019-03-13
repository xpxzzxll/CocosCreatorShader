const ShaderComponent = require('ShaderComponent');
cc.Class({
    extends: ShaderComponent,
    editor: CC_EDITOR && {
        menu: 'Shader/AddedOneColorComponent',
        disallowMultiple: true,
        executeInEditMode: false,
        requireComponent: cc.RenderComponent,
    },
    properties: {
        AddedColor : {
            default : cc.Color.WHITE
        }
    },
    onLoad() {
        this.Material = require('AddedOneColorMaterial');
    },

    onEnable() {
        ShaderComponent.prototype.onEnable.call(this);

        this.material.AddedColor = this.AddedColor;
    }
});
