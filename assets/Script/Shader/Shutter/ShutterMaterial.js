const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'shutter',
            override : true
        },
        time: {
            set(val) {
                this.effect.setProperty('_Time', val);
            },
        },
        fsh: {
            default: `
                uniform sampler2D texture;
                uniform lowp vec4 color;
                varying vec2 uv0;
                uniform float _Time;
                void main() {
                    vec2 _TexSize = vec2(512, 512);
                    float _FenceWidth = 30.0;
                    float _AnimTime = 1.0;
                    float _DelayTime = 0.2;
                    float _LoopInterval = 3.0;
                    float looptimes = floor(_Time / _LoopInterval);
                    float starttime = looptimes * _LoopInterval; // 本次动画开始时间
                    float passtime = _Time - starttime; //本次动画流逝时间
                    if (passtime <= _DelayTime) {
                        if (int(mod(looptimes, 2.0)) == 0) {
                            gl_FragColor = vec4(0, 0, 0, 0);
                        }else {
                            gl_FragColor = texture2D(texture, uv0);
                        }
                    }else {
                        float progress = (passtime - _DelayTime) / _AnimTime; //底部右边界
                        float fence_rate = mod(uv0.x * _TexSize.x, _FenceWidth) / _FenceWidth;
                        if (progress < fence_rate) {
                            gl_FragColor = vec4(0, 0, 0, 0);
                        } else {
                            gl_FragColor = texture2D(texture, uv0);
                        }
                    }
                }
            `,
            override: true
        },
    },

    ctor() {
        this.uniform(
            '_Time',
            renderer.PARAM_FLOAT,
            0
        );
    },
});