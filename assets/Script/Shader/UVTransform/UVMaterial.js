const RE = cc.renderer.renderEngine;
const Material = RE.Material;
const renderer = RE.renderer;
const gfx = RE.gfx;
cc.Class({
    extends: Material,
    properties: {
        effect : {
            get() {
                return this._effect;
            }
        },
        texture : {
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
        color : {
            get() {
                return this._color;
            },
            set(val) {
                var color = this._color;
                color.r = val.r / 255;
                color.g = val.g / 255;
                color.b = val.b / 255;
                color.a = val.a / 255;
                this._effect.setProperty('color', color);
            }
        },

        u_offset : {
            set(val) {
                this._effect.setProperty('u_offset', val);
            },
            // get() {
            //     return this._effect.getProperty('u_offset');
            // }
            
        },

        u_offset_tiling : {
            set(val) {
                this._effect.setProperty('u_offset_tiling', val);
            },
            // get() {
            //     return this._effect.getProperty('u_offset_tiling');
            // }
        },
        _mainTech : null,
        _texture : null
    },

    ctor() {
        let lib = cc.renderer._forward._programLib;
        if (!lib._templates['uv_transform']) {
            lib.define('uv_transform', 
                `
                uniform mat4 viewProj;
                attribute vec3 a_position;
                attribute mediump vec2 a_uv0;
                varying mediump vec2 uv0;
                void main()
                {
                    vec4 pos = viewProj * vec4(a_position, 1);
                    gl_Position = pos;
                    uv0 = a_uv0;
                }
                `, 
                `
                precision lowp float;
                uniform sampler2D texture;
                varying mediump vec2 uv0;
                uniform lowp vec4 color;
                uniform vec2 u_offset;
                uniform vec2 u_offset_tiling;
                void main()
                {
                    vec2 uv = uv0;
                    uv = uv * u_offset_tiling + u_offset;
                    uv = fract(uv);
                    gl_FragColor = color * texture2D(texture, uv);
                }
                `,
                [] 
                );
        }

        Material.call(this, false);

        var pass = new renderer.Pass('uv_transform');
        pass.setDepth(false, false);
        pass.setCullMode(gfx.CULL_NONE);
        pass.setBlend(
            gfx.BLEND_FUNC_ADD,
            gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA,
            gfx.BLEND_FUNC_ADD,
            gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA
        );

        var mainTech = new renderer.Technique(
            ['transparent'],
            /**定义shader中出现的uniform变量
             * texture 内置
             * color 内置
             */
            [{
                name: 'texture',
                type: renderer.PARAM_TEXTURE_2D
            },{
                name: 'color',
                type: renderer.PARAM_COLOR4
            },
            {
                name: 'u_offset',
                type: renderer.PARAM_FLOAT2
            },
            {
                name: 'u_offset_tiling',
                type: renderer.PARAM_FLOAT2
            }
            ],
            [pass]
        );

        this._color = {
            r: 1,
            g: 1,
            b: 1,
            a: 1
        };

        this._effect = new renderer.Effect(
            [
                mainTech
            ],
            /**设置shader中定义的uniform变量的初始值
             */
            {
                'color': this._color,
                'u_offset': cc.v2(0, 0),
                'u_offset_tiling': cc.v2(1, 1)
            },
            []
        );

        this._mainTech = mainTech;
        this._texture = null;
    },

    
});
