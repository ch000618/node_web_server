<?php
echo start();
//主程式
function start(){
	//獲得年月
	//如果有獲得年份就作獲得的年份否則為當前年份
	$year = $_GET['y']?$_GET['y']:date("Y");
	//如果有獲得年份就作獲得的月份否則為當前月份
	$mon = $_GET['m']?$_GET['m']:date("n");
	$str ="";
	$str.="<html>\n";
	$str.="<head>\n";
	$str.="<title>月曆</title>\n";
	$str.="<meta charset=\"utf-8\">\n";
	$str.="<link href=\" css/5.css\" rel=\"stylesheet\" type=\"text/css\">\n";
	$str.="</head>\n";
	$str.="<body>\n";
	$str.="<table class=\"tb1\">\n";
	$str.=print_title($year,$mon);
	$str.=print_week();
	$str.=print_mday($year,$mon);
	$str.="</table>\n";
	$str.="</body>\n";
	$str.="</html>\n";
	return $str;
}
//存放節日陣列
/*

*/
function festival($mon,$dd){
	$festival[1][1] = array("元旦");
	$festival[2][28] = array("和平紀念日");
	$festival[3][8] = array("婦女節");
	$festival[3][21] = array("世界森林日");
	$festival[4][1] = array("愚人節");
	$festival[4][3] = array("兒童節");
	$festival[4][5] = array("清明節");
	$festival[5][1] = array("勞動節");
	$festival[6][1] = array("國際兒童節");
	$festival[7][15] = array("中元節");
	$festival[8][8] = array("父親節");
	$festival[9][3] = array("軍人節");
	$festival[10][1] = array("[中]國慶日");
	$festival[10][10] = array("國慶日");
	$festival[10][31] = array("萬聖節");
	$festival[11][11] = array("世界青年節");
	$festival[12][1] = array("世界愛滋病日");
	$festival[12][10] = array("世界人權日");
	$festival[12][25] =array("聖誕節","行憲紀念日",);
	$festival[12][31] =array("放假前一天","跨年夜",);
	$str.=$festival[$mon][$dd];
	//回傳陣列裡的值
	return $str;
}
//非固定節日日期
function festa($mon,$toweek){
	$festa[1][2]="[日]成人節";
	$festa[5][2]="母親節";
	$festa[5][3]="助殘節";
	$festa[11][4]="[美]感恩節";
	$festa[10][2]="[加]感恩節";
	return  $festa[$mon][$toweek];
}

/*空白字串
$a=數字,$b=字串
	當a-b字串的數量剩餘的數為空白數量
	如果b為空白則只補a數的空白
*/
function C_SPACE($a,$b) {
	//取出$b位數,算出要補幾個空格
	$c = $a - strlen($b);
	//產出要補得空格 $d
	$d = str_repeat(' ',$c);
	//把值後面加上空格
	$e=$d.$b;
	return $e;
}
/*標題文字與上下月和回到當月
$year 年 $mon月
	1.定義按鈕變數與限制條件超過12月進入下一年小於1月回到上一年
	2.製作上個月下個月的按鈕
	3.印出月曆最上方的年月跟切換月份的按鈕
*/
function print_title($year,$mon){
    $td_cen="<td align=center>";
	$th5="<th colspan=5>";
	//定義按鈕變數與限制條件
	$prey=$year;//上一年
	$prem=$mon;//上一月
	$nexty=$year;//下一年
	$nextm=$mon;//下一月
	//上個月
	if($prem<=1){ //判斷月份小於1月
		$prem = 12; //條件成立月份為12月
		$prey--;	//年分返回上個年度
	}else{
		$prem--;
	}
	//下個月
	if($nextm>=12){ //判斷月份大於12月
		$nextm = 1; //條件成立月份為1月
		$nexty++; //年份進入下個年度y
	}else{
		$nextm++;
	}
	//上個月下個月的按鈕
	$pre_m="<td><a href=index.php?y=".$prey."&m=".$prem.">上個月</a></td>";
	$next_m="<td><a href=index2.php?y=".$nexty."&m=".$nextm.">下個月</a></td>";
	$to_m="<a href=index2.php><span>回到當月</span></a>";
    //印出月曆最上放的年月跟切換月份的按鈕
	$str='';
	$str.= C_SPACE(9,'<tr>')."\n";
	$str.= C_SPACE(8,'').$pre_m.C_SPACE(8,'')."\n";
	$str.= C_SPACE(8,'').$th5;
	$str.= "<h1>".$year."年".$mon."月"."<br>"."</h1>"."\n";
	$str.= C_SPACE(8,'').$to_m."\n";
	$str.= C_SPACE(13,'</th>');
	$str.= "\n".C_SPACE(8,'').$next_m;
	$str.= "\n".C_SPACE(10,'</tr>')."\n";
	return $str;
}
/*周日到周六欄位填滿
	1.宣告一個陣列從放禮拜日到禮拜六的字串
	2.用for迴圈從日排到六
*/
function print_week() {
	$str.=C_SPACE(5,'');
	$str.="<tr class=\"tr01\">";
	//禮拜日到禮拜六欄位陣列
	$week=array(
	1=>"日",2=>"一",3=>"二",
	4=>"三",5=>"四",6=>"五",
	7=>"六"
);
//星期欄位從第一格到第七格依序將日到六產生字串跟表格
	for($a=1; $a<=7;$a++){
		$str.="\n".C_SPACE(12,'<td>');
		$str.=$week[$a]."</td>";
	}
	$str.= "\n".C_SPACE(10,'</tr>')."\n";
	return $str;
}
/* 一個月的每一天的日期
$dd是循環天數
$i為星期,$d今天
$year 年 $mon月
	1.印出每個月的日期
	2.判斷第一天從第幾格開始第幾天結束
	3.判斷哪些天是禮拜六禮拜天
	4.判斷那些天是節日
*/
function print_mday($year,$mon,$day){
	$n="&nbsp;";//產生空白
	//css class
	$td67="<td class=\"td67\">";
	$td123="<td class=\"td123\">";
	$today="<td class=\"today\">";
	$d=date("j");//每個月的今天
	$maxday=date("t",mktime(0,0,0,$mon,1,$year));//計算當月有多少天
	$w=date("w",mktime(0,0,0,$mon,1,$year));//當前月份的1號是星期幾
	$dd=1;//循環天數存放日期
	while($dd<=$maxday){//循環天數小於最大天數
		$str.=C_SPACE(5,'')."<tr class=\"tr02\">";
		//i為星期
		//從星期一增加到日為止
		for($i=0; $i<7;$i++){
			//如果這個月1號的星期大於
			//星期 且 循環天數為1 或是循環天數
			//大於 最大天數 則輸出空白表格
			if(($w>$i && $dd==1)||$dd>$maxday){
				$str.="\n".C_SPACE(12,'<td>').$n."</td>";
				continue;
			}
			//每個月的今天會標記
			if($dd==$d){
				$str.="\n".C_SPACE(8,'').$today.$dd.
				"<div><p>".
				"</p><div></td>";
				$dd++;
				continue;
			}
			//否則每個禮拜六禮拜日則以紅色文字輸出
			if(($i%7==0)||($i%7==6)){
				$str.="\n".C_SPACE(8,'').$td67.$dd.
				"<div><p>".
				showfesta($mon,$dd,$i,5,7,15,2,0).
				showfesta($mon,$dd,$i,5,14,22,3,0).
				"</p></div></td>";
				$dd++;
				continue;
			}
			//不是星期六或日使用一般格式
			else{
				$str.="\n".C_SPACE(12,'<td>').$dd.
				"<div><p>".
				showfesta($mon,$dd,$i,1,7,15,2,1).
				showfesta($mon,$dd,$i,11,21,29,4,4).
				showfesta($mon,$dd,$i,10,7,15,2,1).
				"</p></div></td>";
				$dd++;
			}
		}
		$str.="\n".C_SPACE(10,'</tr>')." \n";
	}
	return $str;
}
//判斷特定月特定周節日
/*
	由於有閏年閏月的問題採取以日期範圍取特定日的方式較為準確
	i是存放禮拜天到禮拜六的日期的格子 
	dd是日期 
	m對照的月份
	daymin則是指定日期的最小值 
	daymax則是最大值
	weekday為禮拜幾 
	toweek則是該月份第幾個周幾
*/
function showfesta($mon,$dd,$i,$m,$daymin,$daymax,$toweek,$weekday){
			if(($mon==$m)&&($dd>$daymin)&&($dd<$daymax)&&($i%7==$weekday)){
				$str.=festa($mon,$toweek);
				$dd++;
				return $str;
				continue;
			}
}
//判斷月日是否有節日
/*
$mon月 $dd 日
 如果月跟日有節日則顯示節日
 如果月跟日沒有節日則空白
*/
function showfestival($mon,$dd,$num){

}
?>