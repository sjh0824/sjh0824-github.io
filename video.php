<?php
	// 指定文档类型
	header('Content-Type:application/json; charset=utf-8');
	$result = file_get_contents('./images.json');
	$result = json_decode($result, true);
	$video= $_GET['video'];

    echo json_encode($result[$video]);
?>