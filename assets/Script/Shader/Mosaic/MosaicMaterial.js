const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'mosaic',
            override : true
        },
        fsh: {
            default: `
                uniform sampler2D texture;
                uniform lowp vec4 color;
                varying vec2 uv0;
                void main() {
                    float len = 18.0;
                    float TR = 0.866025;
                    float x = uv0.x;
                    float y = uv0.y;
                    int wx = int(x / 1.5 / len);
                    int wy = int(y / TR / len);
                    vec2 v1, v2, vn;
                    if (wx / 2 * 2 == wx) {
                        if (wy / 2 * 2 == wy) {
                            v1 = vec2(len * 1.5 * float(wx), len * TR * float(wy));
                            v2 = vec2(len * 1.5 * (float(wx) + 1.0), len * TR * (float(wy) + 1.0));
                        } else {
                            v1 = vec2(len * 1.5 * float(wx), len * TR * (float(wy) + 1.0));
                            v2 = vec2(len * 1.5 * (float(wx) + 1.0), len * TR * float(wy));
                        }
                    } else {
                        if (wy / 2 * 2 == wy) {
                            v1 = vec2(len * 1.5 * float(wx), len * TR * (float(wy) + 1.0));
                            v2 = vec2(len * 1.5 * (float(wx) + 1.0), len * TR * float(wy));
                        } else {
                            v1 = vec2(len * 1.5 * float(wx), len * TR * float(wy));
                            v2 = vec2(len * 1.5 * (float(wx) + 1.0), len * TR * (float(wy) + 1.0));
                        }
                    }
                    float s1 = sqrt(pow(v1.x - x, 2.0) + pow(v1.y - y, 2.0));
                    float s2 = sqrt(pow(v2.x - x, 2.0) + pow(v2.y - y, 2.0));
                    if (s1 < s2) {
                        vn = v1;
                    }else {
                        vn = v2;
                    }
                    gl_FragColor = texture2D(texture, vn);
                }
            `,
            override: true
        },
    },
});