<?php
	// ָ���ĵ�����
	header('Content-Type:application/json; charset=utf-8');
	$result = file_get_contents('./images.json');
	$result = json_decode($result, true);
	$item = $_GET['item'];

    echo json_encode($result[$item]);
?>