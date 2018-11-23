import shiner from './shiner';

export const app = shiner();

app._event.on('injectCallback', key => {
	if (process.env.NODE_ENV !== 'production' && !/^on[A-Z]/.test(key)) {
		console.error('[代码规范] connect中callbacks的命名必须是`onXXX`的形式，谁写了这个鬼：', key);
	}
});

export const connect = app.connect;
