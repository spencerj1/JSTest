<?php
	$i = 2;
	while ($i<2000) {
		$flag = true;
		$j = 2;
		while ($j<$i) {
			$flag = $i%$j > 0;
			if (!$flag) break;
			$j++;
		}
		if ($flag) print "$i\n";
		$i++;
	}
?>