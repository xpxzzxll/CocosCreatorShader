const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'inner-glow',
            override : true
        },
        fsh: {
            default: `
                uniform sampler2D texture;
                uniform lowp vec4 color;
                varying vec2 uv0;
                void main() {
                    float _SampleRange = 7.0;
                    vec2 _SampleInterval = vec2(1, 1);
                    vec2 _TexSize = vec2(256, 256);
                    float _Factor = 1.0;
                    vec4 _Color = vec4(0, 1, 0, 1);
                    int range = int(_SampleRange);
                    float radiusX = _SampleInterval.x / _TexSize.x;
                    float radiusY = _SampleInterval.y / _TexSize.y;
                    float inner = 0.0;
                    float outter = 0.0;
                    int count = 0;
                    for (int k = -7; k <= 7; ++k) {
                        for (int j = -7; j <= 7; ++j) {
                            vec4 m = texture2D(texture, vec2(uv0.x + float(k) * radiusX, uv0.y + float(j) * radiusY));
                            outter += 1.0 - m.a;
                            inner += m.a;
                            count += 1;
                        }
                    }
                    inner /= float(count);
                    outter /= float(count);
                    vec4 col = texture2D(texture, uv0) * color;
                    float out_alpha = max(col.a, inner);
                    float in_alpha = min(out_alpha, outter);

                    col.rgb = col.rgb + in_alpha * _Factor * _Color.a * _Color.rgb;
                    gl_FragColor = col;
                }
            `,
            override: true
        },
    },
});