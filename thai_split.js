var wordlist, li, pat_eng, pat_tcc;

var client = new XMLHttpRequest();
	client.open('GET', 'dict.txt');
	client.onreadystatechange = function() {
	  wordlist = client.responseText.split('\n');
}
client.send();

pat_eng = ['(?x)[-a-zA-Z]+','\d[\d,\.]*','[ \t]+|\r?\n'];
pat_tcc = ['เ[ก-ฮ]็[ก-ฮ]', 'เ[ก-ฮ][ก-ฮ][่-๋]?าะ', 'เ[ก-ฮ][ก-ฮ]ี[่-๋]?ยะ', 'เ[ก-ฮ][ก-ฮ]ี[่-๋]?ย(?=[เ-ไก-ฮ]|$)', 'เ[ก-ฮ][ก-ฮ]อะ', 'เ[ก-ฮ][ก-ฮ]็[ก-ฮ]', 'เ[ก-ฮ]ิ[ก-ฮ]์[ก-ฮ]', 'เ[ก-ฮ]ิ[่-๋]?[ก-ฮ]', 'เ[ก-ฮ]ี[่-๋]?ยะ?', 'เ[ก-ฮ]ื[่-๋]?อะ?', 'เ[ก-ฮ][ิีุู][่-๋]?ย(?=[เ-ไก-ฮ]|$)', 'เ[ก-ฮ][่-๋]?า?ะ?', '[ก-ฮ]ั[่-๋]?วะ', '[ก-ฮ][ัื][่-๋]?[ก-ฮ][ุิะ]?', '[ก-ฮ][ิุู]์', '[ก-ฮ][ะ-ู][่-๋]?', '[ก-ฮ]็', '[ก-ฮ][่-๋]?[ะาำ]?', 'แ[ก-ฮ]็[ก-ฮ]', 'แ[ก-ฮ][ก-ฮ]์', 'แ[ก-ฮ][่-๋]?ะ', 'แ[ก-ฮ][ก-ฮ]็[ก-ฮ]', 'แ[ก-ฮ][ก-ฮ][ก-ฮ]์', 'โ[ก-ฮ][่-๋]?ะ', '[เ-ไ][ก-ฮ][่-๋]?'];

function tcc() {
    function* js_generator(w) {
        var p, pat, m, n;
        p = 0;
        while (p < len(w)) {
			m = pat_tcc.join("|").exec(w.slice(p));
            if (m) {
                n = m.index;
            } else {
                n = 1;
            }
            yield w.slice(p, p + n);
            p += n;
        }
    }
    var result = js_generator.apply(this, arguments);
    result.send = result.next;
    return result;
};

if (!tcc.__argnames__) Object.defineProperties(tcc, {
    __argnames__ : {value: ["w"]}
});

function tcc_pos(text) {
    var p_set, p, w;
    p_set = set();
    p = 0;
    var ρσ_Iter0 = tcc(text);
    ρσ_Iter0 = ((typeof ρσ_Iter0[Symbol.iterator] === "function") ? (ρσ_Iter0 instanceof Map ? ρσ_Iter0.keys() : ρσ_Iter0) : Object.keys(ρσ_Iter0));
    for (var ρσ_Index0 of ρσ_Iter0) {
        w = ρσ_Index0;
        p += len(w);
        p_set.add(p);
    }
    return p_set;
};

if (!tcc_pos.__argnames__) Object.defineProperties(tcc_pos, {
    __argnames__ : {value: ["text"]}
});

function serialize() {
    function* js_generator(words_at, p, p2) {
        var p_, path, w;
        if (ρσ_in(p, words_at)) {
            var ρσ_Iter1 = words_at[(typeof p === "number" && p < 0) ? words_at.length + p : p];
            ρσ_Iter1 = ((typeof ρσ_Iter1[Symbol.iterator] === "function") ? (ρσ_Iter1 instanceof Map ? ρσ_Iter1.keys() : ρσ_Iter1) : Object.keys(ρσ_Iter1));
            for (var ρσ_Index1 of ρσ_Iter1) {
                w = ρσ_Index1;
                p_ = p + len(w);
                if ((p_ === p2 || typeof p_ === "object" && ρσ_equals(p_, p2))) {
                    yield ρσ_list_decorate([ w ]);
                } else if (p_ < p2) {
                    var ρσ_Iter2 = serialize(words_at, p_, p2);
                    ρσ_Iter2 = ((typeof ρσ_Iter2[Symbol.iterator] === "function") ? (ρσ_Iter2 instanceof Map ? ρσ_Iter2.keys() : ρσ_Iter2) : Object.keys(ρσ_Iter2));
                    for (var ρσ_Index2 of ρσ_Iter2) {
                        path = ρσ_Index2;
                        yield ρσ_list_decorate([ w ]) + path;
                    }
                }
            }
        }
    }
    var result = js_generator.apply(this, arguments);
    result.send = result.next;
    return result;
};
if (!serialize.__argnames__) Object.defineProperties(serialize, {
    __argnames__ : {value: ["words_at", "p", "p2"]}
});

function ArrPrefix(Arr,prefixs) {
	var tmp = [], result = [];
	for (var i = 0; i < prefixs.length ;i++) {
	tmp =  Arr.filter((found) => found.startsWith(prefixs[i]));
	result.concat(tmp);
	}
	return result;
}

function onecut() {
    function* js_generator(text) {
        var words_at, allow_pos, q, last_p, p, p_, w, paths, m, i, ww;
		var heap = new Heap();
        words_at = defaultdict(list);
        allow_pos = tcc_pos(text);
        q = ρσ_list_decorate([ 0 ]);
        last_p = 0;
        while (q[0] < len(text)) {
            p = heap.pop(q);
            var ρσ_Iter3 = ArrPrefix(wordlist,text.slice(p));
            ρσ_Iter3 = ((typeof ρσ_Iter3[Symbol.iterator] === "function") ? (ρσ_Iter3 instanceof Map ? ρσ_Iter3.keys() : ρσ_Iter3) : Object.keys(ρσ_Iter3));
            for (var ρσ_Index3 of ρσ_Iter3) {
                w = ρσ_Index3;
                p_ = p + len(w);
                if (ρσ_in(p_, allow_pos)) {
                    words_at[(typeof p === "number" && p < 0) ? words_at.length + p : p].append(w);
                    if (!ρσ_in(p_, q)) {
                        heap.push(q, p_);
                    }
                }
            }
            if (ρσ_equals(len(q), 1)) {
                paths = serialize(words_at, last_p, q[0]);
                var ρσ_Iter4 = ρσ_interpolate_kwargs.call(this, min, [paths].concat([ρσ_desugar_kwargs({key: len})]));
                ρσ_Iter4 = ((typeof ρσ_Iter4[Symbol.iterator] === "function") ? (ρσ_Iter4 instanceof Map ? ρσ_Iter4.keys() : ρσ_Iter4) : Object.keys(ρσ_Iter4));
                for (var ρσ_Index4 of ρσ_Iter4) {
                    w = ρσ_Index4;
                    yield w;
                }
                last_p = q[0];
            }
            if (ρσ_equals(len(q), 0)) {
                m = pat_eng.match(text.slice(p));
                if (m) {
                    i = p + m.end();
                } else {
                    var ρσ_Iter5 = range(p + 1, len(text));
                    ρσ_Iter5 = ((typeof ρσ_Iter5[Symbol.iterator] === "function") ? (ρσ_Iter5 instanceof Map ? ρσ_Iter5.keys() : ρσ_Iter5) : Object.keys(ρσ_Iter5));
                    for (var ρσ_Index5 of ρσ_Iter5) {
                        i = ρσ_Index5;
                        if (ρσ_in(i, allow_pos)) {
                            ww = (function() {
                                var ρσ_Iter = ArrPrefix(wordlist,text.slice(i)), ρσ_Result = [], w;
                                ρσ_Iter = ((typeof ρσ_Iter[Symbol.iterator] === "function") ? (ρσ_Iter instanceof Map ? ρσ_Iter.keys() : ρσ_Iter) : Object.keys(ρσ_Iter));
                                for (var ρσ_Index of ρσ_Iter) {
                                    w = ρσ_Index;
                                    if (ρσ_in(i + len(w), allow_pos)) {
                                        ρσ_Result.push(w);
                                    }
                                }
                                ρσ_Result = ρσ_list_constructor(ρσ_Result);
                                return ρσ_Result;
                            })();
                            m = pat_eng.match(text.slice(i));
                        }
                    }
                }
                w = text.slice(p, i);
                words_at[(typeof p === "number" && p < 0) ? words_at.length + p : p].append(w);
                yield w;
                last_p = i;
                heap.push(q,i);
            }
        }
    }
    var result = js_generator.apply(this, arguments);
    result.send = result.next;
    return result;
};
if (!onecut.__argnames__) Object.defineProperties(onecut, {
    __argnames__ : {value: ["text"]}
});

function mmcut(text) {
    return onecut(text).join();
};
if (!mmcut.__argnames__) Object.defineProperties(mmcut, {
    __argnames__ : {value: ["text"]}
});
