const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'fluxay',
            override : true
        },
        fsh: {
            default: `
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
            override: true
        },
        time: {
            set(val) {
                this.effect.setProperty('time', val);
            },
        },
    },

    ctor() {
        ShaderMaterial.call(this, false);

        this.uniform(
            'time',
            renderer.PARAM_FLOAT,
            0.0
        );
    },

    
});
