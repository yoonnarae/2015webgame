var arrayInt = new Array();
arrayInt.push(3);
arrayInt.push(36);
arrayInt.push(369);
arrayInt.push(222);
document.writeln();
for(var i=0; i<arrayInt.length; i++) {
	document.writeln(i + "번 인덱스의 원소 값 : " + arrayInt[i]);
}
document.writeln("arrayInt 배열의 원소 수 : " + arrayInt.length);