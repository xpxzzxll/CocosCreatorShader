# CocosCreatorShader

基于CococCreator2.0.9版本的ShaderDemo

目前可以使用在cc.Sprite和dragonBones.ArmatureDisplay

简单的收录一些游戏开发过程中常用的特效

## glsl与cg常用数据结构对应关系

| glsl         | cg                                                        |
| ------------ | --------------------------------------------------------- |
| vec2         | float2                                                    |
| vec3         | float3                                                    |
| vec4         | float4                                                    |
| mat2         | float2x2                                                  |
| mat3         | float3x3                                                  |
| mat4         | float4x4                                                  |
| iGlobalTime  | Time.y                                                    |
| mod          | fmod                                                      |
| mix          | lerp                                                      |
| fract        | frac                                                      |
| texture2D    | tex2D                                                     |
| iResolution  | _ScreenParams                                             |
| gl_FragCoord | ((_iParam.scrPos.xy/_iParam.srcPos.w) * _ScreenParams.xy) |
| pi           | 3.1415926                                                 |
| PI2          | (pi * 2)                                                  |
| halfpi       | (pi * 0.5)                                                |
| oneoverpi    | (1.0 / pi)                                                |