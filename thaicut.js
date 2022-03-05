// Project: thai-cut-slim
// CreatedBy: Comdevx
// Email: comdevx@gmail.com
// Created: 2019/10/25

var dicthai;
var client = new XMLHttpRequest();
	client.open('GET', 'dict.txt');
	client.onreadystatechange = function() {
	  dicthai = client.responseText.split('\n');
}
client.send();


function thaicut (w) {
	   var arr = []

    for (var i = 0; i < w.length;) {

        var sub = []

        dicthai.forEach(v2 => {

            if (w[i] + w[i + 1] === v2[0] + v2[1]) sub.push([v2, v2.length])

        })

        sub.sort((a, b) => b[1] - a[1])

        for (var ii = 0; ii < sub.length; ii++) {

            var l = sub[ii][1] + i
            var s = w.substring(i, l)

            if (sub[ii][0] === s) {

                i = l - 1
                arr.push(s)
                ii = sub.length

            }

        }

        i++

    }

    return arr

}
