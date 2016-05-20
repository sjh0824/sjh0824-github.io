<?php

	// 服务端验证
	if($_POST['name']) {
		// 只要有一个表单项填写了内容，即认为注册成功
		$arr = array(
			'code'=>10000,
			'msg'=>'注册成功',
			'result'=>array('name'=>'itcast', 'age'=>10)
		);
	} else {
		$arr = array(
			'code'=>10002,
			'msg'=>'注册失败',
			'result'=>'一些信息'
		);
	}

	// sleep(5);

	/**
	 * 接口化开发
	 * 前后端会事先约定传递的参数格式，以及返回的数据格式
	 */

	echo json_encode($arr);

	sleep(2);

?>