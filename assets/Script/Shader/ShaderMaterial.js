const Material = cc.renderer.renderEngine.Material;
const renderer = cc.renderer.renderEngine.renderer;
const gfx = cc.renderer.renderEngine.gfx;
const ShaderMaterial = cc.Class({
    name: 'cc.ShaderMaterial',
    extends: Material,
    properties: {
        name: 'default',
        vsh: `
            // uniform mat4 viewProj;
            // attribute vec3 a_position;
            // attribute mediump vec2 a_uv0;
            // varying mediump vec2 uv0;
            // void main()
            // {
            //     vec4 pos = viewProj * vec4(a_position, 1);
            //     gl_Position = pos;
            //     uv0 = a_uv0;
            // }

            uniform mat4 viewProj;
            #ifdef use2DPos
                attribute vec2 a_position;
            #else
                attribute vec3 a_position;
            #endif

            attribute lowp vec4 a_color;

            #ifdef useModel
                uniform mat4 model;
            #endif
            #ifdef useTexture
                attribute mediump vec2 a_uv0;
                varying mediump vec2 uv0;
            #endif
            #ifndef useColor
                varying lowp vec4 v_fragmentColor;
            #endif
            void main() {
                mat4 mvp;
                #ifdef useModel
                    mvp = viewProj * model;
                #else
                    mvp = viewProj;
                #endif
                #ifdef use2DPos
                    vec4 pos = mvp * vec4(a_position, 0, 1);
                #else
                    vec4 pos = mvp * vec4(a_position, 1);
                #endif
                #ifndef useColor
                    v_fragmentColor = a_color;
                #endif
                #ifdef useTexture
                    uv0 = a_uv0;
                #endif
                gl_Position = pos;
            }
        `,
        fsh: '',
        _mainTech : {
            default : null,
            type: renderer.Technique
        },
        mainTech : {
            get() {
                return this._mainTech;
            }
        },
        _effect: {
            default : null,
            type: renderer.Effect
        },
        effect: {
            get() {
                return this._effect;
            }
        },

        _texture : {
            default : null,
            type : cc.Texture2D
        },
        texture: {
            get() {
                return this._texture;
            },
            set(val) {
                if (this._texture !== val) {
                    this._texture = val;
                    this._effect.setProperty('texture', val.getImpl());
                    this._texIds['texture'] = val.getId();
                }
            }
        },

        _color : {
            default: new cc.Color(255, 255, 255, 255)
        },
        color: {
            get() {
                return this._color;
            },
            set(val) {
                if (!val.equals(this._color)) {
                    this._color = val;
                    var color = {};
                    color.r = val.r / 255;
                    color.g = val.g / 255;
                    color.b = val.b / 255;
                    color.a = val.a / 255;
                    this._effect.setProperty('color', color);
                }
            }
        },
    },

    ctor(batch) {
        this.init(batch);
    },

    init() {
        if ('' == this.fsh || '' == this.vsh) {
            return;
        }
        let lib = cc.renderer._forward._programLib;
        if (!lib._templates[this.name]) {
            lib.define(this.name, this.vsh, this.fsh, []);
        }
        var pass = new renderer.Pass(this.name);
        pass.setDepth(false, false);
        pass.setCullMode(gfx.CULL_NONE);
        pass.setBlend(
            gfx.BLEND_FUNC_ADD,
            gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA,
            gfx.BLEND_FUNC_ADD,
            gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA
        );

        this._mainTech = new renderer.Technique(
            ['transparent'],
            /**定义shader中出现的uniform变量
             * texture 内置
             * color 内置
             */
            [{
                    name: 'texture',
                    type: renderer.PARAM_TEXTURE_2D
                },
                {
                    name: 'color',
                    type: renderer.PARAM_COLOR4
                }
            ],
            [pass]
        );

        this._effect = new renderer.Effect(
            [
                this._mainTech
            ],
            /**设置shader中定义的uniform变量的初始值
             */
            {
                'color': {
                    r: 1,
                    g: 1,
                    b: 1,
                    a: 1
                }
            },
            [
                { name: 'useColor', value: true },
                { name: 'useTexture', value: true },
                { name: 'useModel', value: true },
                { name: 'alphaTest', value: true },
                { name: 'use2DPos', value: true },
                { name: 'useTint', value: true },
            ]
        );
    },

    /**添加shader中uniform变量, 并且赋初始值 */
    uniform(name, type, val) {
        this._mainTech._parameters.push({
            name: name,
            type: type
        });
        this._effect.setProperty(name, val);
    }
});
ShaderMaterial.batch = true;