"use strict";
	/********************************************************************************
		Errorer.
		Copyright (C) 2017 <davidiglesanchez@gmail.com>

		This program is free software: you can redistribute it and/or modify
		it under the terms of the GNU General Public License as published by
		the Free Software Foundation, either version 3 of the License, or
		(at your option) any later version.

		This program is distributed in the hope that it will be useful,
		but WITHOUT ANY WARRANTY; without even the implied warranty of
		MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
		GNU General Public License for more details.

		You should have received a copy of the GNU General Public License
		along with this program.  If not, see <http://www.gnu.org/licenses/>

	**********************************************************************************/
var INITIAL_ROWS=3;var tableElement;var table_total_rows=0;var xPos=0;var yPos=0;var VALORES=new Array(300);var defaultError=0;var mValue=1;var DEBUG=true;var AllowedKeyCodes=[8,198,190,9,189,122,27,116];var AllowedKeys=["Backspace",",","."];var LatexTEMPLATE={inicio_a:"\\begin{tabular}{|c|c|c|}\n\\hline\n$x_i$ & $y_i$ & $\\Delta y_i$\\\\\n\\hline\n\\hline\n",fin:"\\hline\n\\end{tabular}",inicio_b_a:"\\begin{tabular}{|c|c|c|c|c|c|}\n\\hline\n\t$x_i^m$\t&\t$x_i^{2m}$\t&\t",inicio_b_b:"$x_iy_i^m$\t&\t$|x_i^m|$\t&\t$|x_i^m|\\Delta y_i$\\\\\n \\hline\n\\hline\n"};window.onload=function(){tableElement=document.getElementById("main_table");for(var a=0;a<INITIAL_ROWS;a++){addRow()}document.getElementById("c_0_r_0").select();document.body.onkeydown=function(d){var b=false;var c;for(c in AllowedKeyCodes){if(d.keyCode==AllowedKeyCodes[c]){b=true;break}}if(!b){for(c in AllowedKeys){if(d.key==AllowedKeys[c]){b=true;break}}}if(!isNaN(d.key)||b){}else{switch(d.keyCode){case 37:irIzquierda();break;case 38:irArriba();break;case 39:irDerecha();break;case 40:irAbajo();break;case 69:setDefaultError();break;case 65:ajuste();break;case 77:setExponent();break;case 13:computeValues();break;default:if(DEBUG){console.log(d.keyCode)}break}d.preventDefault()}}};var addRow=function(){if(tableElement){var e="<tr>";var f=tableElement.insertRow(table_total_rows+1);f.setAttribute("id","row_"+(table_total_rows+1));var c=f.insertCell(0);var b=f.insertCell(1);var a=f.insertCell(2);c.innerHTML='<td><input type="text" id="c_0_r_'+table_total_rows+'" onfocus="selectiona(this.id)" oninput="textChanged(this)"></input>';b.innerHTML='<td><input type="text" id="c_1_r_'+table_total_rows+'" onfocus="selectiona(this.id)" oninput="textChanged(this)"></input>';a.innerHTML='<td><input type="text" id="c_2_r_'+table_total_rows+'" onfocus="selectiona(this.id)" oninput="textChanged(this)"></input>';f.insertCell(3).setAttribute("class","black");for(var d=4;d<=8;d++){f.insertCell(d).setAttribute("id","fila_"+(table_total_rows)+"_columna_"+d)}table_total_rows++}};function irIzquierda(){if(xPos>0&&xPos<=2){xPos--}updatePosition()}function irArriba(){if(yPos>0&&yPos<=table_total_rows){yPos--}updatePosition()}function irDerecha(){if(xPos>=0&&xPos<2){xPos++}updatePosition()}function irAbajo(){if(yPos>=0&&yPos<table_total_rows-1){yPos++}else{addRow();yPos++}updatePosition()}function updatePosition(){if(DEBUG){console.log("c_"+xPos+"_r_"+yPos)}document.getElementById("c_"+xPos+"_r_"+yPos).select()}function selectiona(b){var a=b.replace("c_","").replace("_r_","X").split("X");xPos=parseInt(a[0]);yPos=parseInt(a[1])}function textChanged(a){}var setDefaultError=function(){if(document.getElementById("c_2_r_0").value&&document.getElementById("c_2_r_0").value!==undefined&&document.getElementById("c_2_r_0").value!=""&&defaultError==0){defaultError=document.getElementById("c_2_r_0").value}fillDefaultError()};var fillDefaultError=function(){for(var a=0;a<table_total_rows;a++){document.getElementById("c_2_r_"+a).value=defaultError}};var addValueToRow=function(a,c,b){if(tableElement){if(DEBUG){console.log("fila_"+c+"_columna_"+a)}document.getElementById("fila_"+c+"_columna_"+a).innerHTML=b}};var computeValues=function(){var a,d,c,e;for(var b=0;b<table_total_rows;b++){a=parseFloat(parseNumber(document.getElementById("c_0_r_"+b).value));d=parseFloat(parseNumber(document.getElementById("c_1_r_"+b).value));c=parseFloat(parseNumber(document.getElementById("c_2_r_"+b).value));e=Math.pow(a,mValue);if(isNaN(a)||isNaN(d)||isNaN(c)){}else{addValueToRow(4,b,redondear(e));addValueToRow(5,b,redondear(Math.abs(e)));addValueToRow(6,b,redondear(e*e));addValueToRow(7,b,redondear(a*Math.pow(d,mValue)));addValueToRow(8,b,redondear(Math.abs(e)*c))}}};function setExponent(){mValue=parseFloat(prompt("Valor para el exponente (por defecto, m=1)"));document.getElementById("footer_info_exp").innerHTML=mValue;document.getElementById("footer_info_ajuste").innerHTML="ax<sup>"+mValue+"</sup>";computeValues()}function setYError(){defaultError=parseFloat(prompt("Error para la y:"));fillDefaultError();computeValues()}function createLatexA(){var e=LatexTEMPLATE.inicio_a;var a,d,c;for(var b=0;b<table_total_rows;b++){a=parseFloat(document.getElementById("c_0_r_"+b).value);d=parseFloat(document.getElementById("c_1_r_"+b).value);c=parseFloat(document.getElementById("c_2_r_"+b).value);if(isNaN(a)){a=""}if(isNaN(d)){d=""}if(isNaN(c)){c=""}e+=a+"\t&\r"+d+"\t&\t"+c+"\\\\ \n"}e+=LatexTEMPLATE.fin;writeXportTool(e)}function createLatexB(){var n=LatexTEMPLATE.inicio_b_a;n+=LatexTEMPLATE.inicio_b_b;var h,g,o,m,l,k;for(var j=0;j<table_total_rows;j++){for(var g=4;g<=8;g++){h=parseFloat(document.getElementById("fila_"+j+"_columna_"+g).innerHTML);if(isNaN(h)){h=""}n+="\t"+h+"\t";if(g<8){n+="&"}}n+="\\\\\n"}n+=LatexTEMPLATE.fin;writeXportTool(n)}function closeXportTool(){document.getElementById("XportTool").style.display="none"}function writeXportTool(a){document.getElementById("textXportTool").innerHTML=a.replace(/\n/g,"<br>");document.getElementById("XportTool").style.display="block"}var redondear=function(a){return parseFloat(Math.round(a*10000000)/10000000)};var ajuste=function(){computeValues();var g="=== RESULTADO DEL AJUSTE ===\n";var m=0;var b=0;var h=0;var o=0;var n=0;var l,k,j;for(var f=0;f<table_total_rows;f++){l=parseFloat(document.getElementById("fila_"+f+"_columna_6").innerHTML);k=parseFloat(document.getElementById("fila_"+f+"_columna_7").innerHTML);j=parseFloat(document.getElementById("fila_"+f+"_columna_8").innerHTML);if(!isNaN(l)&&!isNaN(k)&&!isNaN(j)){b+=k;h+=l;n+=j}}m=b/h;o=n/h;document.getElementById("footer_info_a").innerHTML=m;document.getElementById("footer_info_da").innerHTML=o;g+="a = "+redondear(m)+"\n";g+="&Delta;a = "+o+"\n";writeXportTool(g)};var rellenar=function(d){var c=redondear(parseFloat(parseNumber(prompt("Valor inicial:"))));var f=redondear(parseFloat(parseNumber(prompt("Valor final:"))));var g=redondear(parseFloat(parseNumber(prompt("Incremento:"))));var b=0;if(c>=f){alert("Eso no posible es:/ Valor inicial mayor al final...");return 0}for(var e=c;e<=f;e+=g){if(b>=table_total_rows){addRow()}document.getElementById("c_"+d+"_r_"+b).value=redondear(e);b++}};var parseNumber=function(a){return a.replace(",",".")};var aiudaa=function(){var a="=== AYUDA! ===\nPara introducir valores, selecione una fila y una columna e introduzca el valor. Puede moverse a trav&eacute;s de la tabla utilizando las flechas. Las filas se a&ntilde;aden autom&aacute;ticamente. Para generar los valores de las columnas de la derecha, pulse ENTER o clicar en AJUSTE.\n\n=== CAMBIAR PAR&Aacute;METROS ===\nPara cambiar el valor del exponente (llamado m), pulsar CAMBIAR M en el men&uacute;.Para cambiar el valor del error en y, pulsar [Error en y].\n\n=== INFORMACI&Oacute;N SOBRE RELLENO ===\nSi los valores de x<sub>i</sub>, y<sub>i</sub> o &Delta;y<sub>i</sub> son una serie (por ejemplo, los valores de x<sub>i</sub> son 2 4 6 8 10 ...), pulse RELLENAR: [x<sub>i</sub>, y<sub>i</sub>, &Delta;y<sub>i</sub>] seg&uacute;n corresponda e introduzca el valor inicial (en el ejemplo, el 2), el valor final, y el incremento(en el ejemplo, 2).";writeXportTool(a)};window.onbeforeunload=function(){if(!DEBUG){return"Desea salir?"}};
