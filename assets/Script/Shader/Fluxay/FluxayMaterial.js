const RE = cc.renderer.renderEngine;
const Material = RE.Material;
const renderer = RE.renderer;
const gfx = RE.gfx;
const FluxayMaterial = cc.Class({
    extends: Material,
    statics: {
        Shadder: 'fluxay'
    },
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

        time: {
            set(val) {
                this._effect.setProperty('time', val);
            },
            
        },
        _mainTech : null,
        _texture : null
    },

    ctor() {
        let lib = cc.renderer._forward._programLib;
        if (!lib._templates[FluxayMaterial.Shadder]) {
            lib.define(FluxayMaterial.Shadder,
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
                #define TAU 6.12
                #define MAX_ITER 5
                precision lowp float;
                uniform sampler2D texture;
                varying mediump vec2 uv0;
                uniform lowp vec4 color;
                uniform float time;
                void main()
                {
                    float time = time * 0.5 + 5.0;
                    vec2 uv = uv0.xy;
                    vec2 p = mod(uv * TAU, TAU) - 250.0;
                    vec2 i = vec2(p);
                    float c = 1.0;
                    float inten = 0.0045;
                    for (int n = 0; n < MAX_ITER; n++) {
                        float t = time * (1.0 - (3.5 / float(n + 1)));
                        i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(1.5 * t + i.x));
                        c += 1.0 / length(vec2(p.x / (cos(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
                    }
                    c /= float(MAX_ITER);
                    c = 1.17 - pow(c, 1.4);
                    vec4 tex = texture2D(texture, uv);
                    vec3 colour = vec3(pow(abs(c), 20.0));
                    colour = clamp(colour + vec3(0.0, 0.0, 0.0), 0.0, tex.a);

                    float alpha = c * tex[3];
                    tex[0] = tex[0] + colour[0] * alpha;
                    tex[1] = tex[1] + colour[1] * alpha;
                    tex[2] = tex[2] + colour[2] * alpha;
                    gl_FragColor = color * tex;
                }
                `,
                [] 
                );
        }

        Material.call(this, false);

        var pass = new renderer.Pass(FluxayMaterial.Shadder);
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
                name: 'time',
                type: renderer.PARAM_FLOAT
            }],
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
                'time': 0,
            },
            []
        );

        this._mainTech = mainTech;
        this._texture = null;
    },

    
});
