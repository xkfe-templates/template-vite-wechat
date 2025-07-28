/*
 * @Author: 小凯同学 xkfe16@gmail.com
 * @Description: 事件总线
*/

import mitt from 'mitt'

type Events = {};

const emitter = mitt<Events>();

export default emitter;
