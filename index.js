const API = {};

//生成num个0的字符串
function _makeZero(num) {
    var str = '';
    for (var i = 0; i < num; i++) {
        str += '0';
    }
    return str;
}

/**
 * 判断是否为整数，字符整数也返回true
 *
 * @param num
 * @returns
 */
function isInteger(num) {
    return Math.floor(num) === Number(num);
}


/**
 * 将数值转为字符串
 * 
 * 通过移动小数点  扩大倍数或缩小倍数(解决出现e+、e-的问题)
 * 
 * JavaScript在以下情景会自动将数值转换为科学计数法：
 *   1）小数点前的数字多于21位。
 *   2）小数点后的零多于5个
 */
function scienceNum(value) {
    if (!value) {
        return value;
    }
    if (typeof value === 'number') {
        value = value + ""
    };
    var eIndex = value.indexOf('E');
    if (eIndex == -1) {
        eIndex = value.indexOf('e')
    };
    if (eIndex != -1) {
        var doubleStr = value.substring(0, eIndex); //e前面的值
        var eStr = parseInt(value.substring(eIndex + 1, value.length)); //e后面的值
        var doubleStrArr = doubleStr.split('.');
        var doubleStr1 = doubleStrArr[0] || "";
        var doubleStr2 = doubleStrArr[1] || "";

        if (eStr < 0) { //e- 很小的数
            var str1Len = doubleStr1.length;
            var eStrs = Math.abs(eStr);
            if (str1Len > eStrs) {
                var nums = doubleStr1.substring(0, eStrs);
                var nume = doubleStr1.substring(eStrs, str1Len);
                doubleStr = nums + "." + nume + nume;
            } else if (str1Len < eStrs) {
                var indexNum = eStrs - str1Len;
                var str = _makeZero(indexNum); //用0补齐
                doubleStr = '0.' + str + doubleStr1 + doubleStr2;
            } else {
                doubleStr = '0.' + doubleStr1 + doubleStr2;
            }
        } else { //e+ 很大的数
            var str2Len = doubleStr2.length;
            if (str2Len > eStr) {
                var _nums = doubleStr2.substring(0, eStr);
                var _nume = doubleStr2.substring(eStr, str2Len);
                doubleStr = doubleStr1 + _nums + '.' + _nume;
            } else if (str2Len < eStr) {
                var _indexNum = eStr - str2Len;
                var _str = _makeZero(_indexNum); //用0补齐
                doubleStr = doubleStr1 + doubleStr2 + _str;
            } else {
                doubleStr = doubleStr1 + doubleStr2;
            }
        }
        value = doubleStr;
    }
    return value;
}


/**
 * 将数值升级(10的X的次方)到整数
 */
function science(num) {
    var re = {
        r1: 0, //数字去掉小数点后的值，也就是 r1*r2 的结果
        r2: 1 //小数部分，10的长度次幂
    };
    if (isInteger(num)) { //整数直接返回
        re.r1 = num;
        return re;
    }
    var snum = scienceNum(num + ""); //处理0.123e-10类似问题
    var dotPos = snum.indexOf("."); //小数点位置
    var len = snum.substr(dotPos + 1).length; //小数点长度
    re.r2 = Math.pow(10, len);
    re.r1 = parseInt(snum.replace(".", ""));
    return re;
}



/**
 * 四则运算
 *
 * @param x
 * @param y
 * @param op 操作符，0：加；1：减；2：乘；3：除
 * @param acc 保留小数位个数，进行四舍五入
 */
function execute(x, y, op, acc) {
    var xx = Number(x == undefined ? 0 : x);
    var yy = Number(y == undefined ? 0 : y);

    //
    var a = science(xx);
    var b = science(yy);

    var na = a.r1;
    var nb = b.r1;

    var ta = a.r2;
    var tb = b.r2;
    var maxt = Math.max(ta, tb);

    //精度值处理
    var result = 0;
    switch (parseInt(op, 10)) {
        case 0: //加
            result = (xx * maxt + yy * maxt) / maxt;
            break;
        case 1: //减
            result = (xx * maxt - yy * maxt) / maxt;
            break;
        case 2: // 乘
            result = na * nb / (ta * tb);
            break;
        case 3: // 除
            result = na / nb * (tb / ta);
        default:
    }

    //小数位数处理
    if (acc) {
        return Number(result).toFixed(acc);
    } else {
        return Number(result);
    }
}

/**
 * 默认toFixed方法为四舍六入五成双算法
 * 重写toFixed方法调整为四舍五入算法
 */
Number.prototype.toFixed = function (d) {
    var s = this + "";
    if (!d) d = 0;
    if (typeof d == 'string') {
        d = Number(d);
    };
    if (s.indexOf(".") == -1) {
        s += ".";
    };
    s = scienceNum(s); //处理e+、e-情况
    s += new Array(d + 1).join("0");
    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
        var _s = "0" + RegExp.$2,
            pm = RegExp.$1,
            a = RegExp.$3.length,
            b = true;
        if (a == d + 2) {
            a = _s.match(/\d/g);
            if (parseInt(a[a.length - 1]) > 4) {
                for (var i = a.length - 2; i >= 0; i--) {
                    a[i] = parseInt(a[i]) + 1;
                    if (a[i] == 10) {
                        a[i] = 0;
                        b = i != 1;
                    } else break;
                }
            }
            _s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");
        }
        if (b) {
            _s = _s.substr(1);
        };
        return (pm + _s).replace(/\.$/, "");
    }
    return this + "";
};

//加法运算
API.add = function(x, y, acc) {
    return execute(x, y, 0, acc);
}

//减法运算
API.subtract = function(x, y, acc) {
    return execute(x, y, 1, acc);
}

//乘法运算
API.multiply = function(x, y, acc) {
    return execute(x, y, 2, acc);
}

//除法运算
API.divide = function(x, y, acc) {
    return execute(x, y, 3, acc);
}

module.exports.default = module.exports = API;
