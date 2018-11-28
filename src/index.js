import React from 'react';
import Route from './routers';
import {app} from './connect';
import models from './models';
import {onInit} from './handler';
import './styles/base.scss';
import * as serviceWorker from './serviceWorker';

app.model(models);

app.start('#root', Route, ({dispatch, getState}) => {
	/**
	 * @callback 初始化回调
	 * @note 对外暴露的接口以及可以复用的callback处理方法
	 */
	onInit({dispatch, getState});
});

serviceWorker.unregister();
