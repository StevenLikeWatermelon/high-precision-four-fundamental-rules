const API = {};

//生成num个0的字符串
function _makeZero(num) {
    let str = '';
    for (let i = 0; i < num; i++) {
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
    let eIndex = value.indexOf('E');
    if (eIndex == -1) {
        eIndex = value.indexOf('e')
    };
    if (eIndex != -1) {
        let doubleStr = value.substring(0, eIndex); //e前面的值
        let eStr = parseInt(value.substring(eIndex + 1, value.length)); //e后面的值
        let doubleStrArr = doubleStr.split('.');
        let doubleStr1 = doubleStrArr[0] || "";
        let doubleStr2 = doubleStrArr[1] || "";

        if (eStr < 0) { //e- 很小的数
            let str1Len = doubleStr1.length;
            let eStrs = Math.abs(eStr);
            if (str1Len > eStrs) {
                let nums = doubleStr1.substring(0, eStrs);
                let nume = doubleStr1.substring(eStrs, str1Len);
                doubleStr = nums + "." + nume + nume;
            } else if (str1Len < eStrs) {
                let indexNum = eStrs - str1Len;
                let str = _makeZero(indexNum); //用0补齐
                doubleStr = '0.' + str + doubleStr1 + doubleStr2;
            } else {
                doubleStr = '0.' + doubleStr1 + doubleStr2;
            }
        } else { //e+ 很大的数
            let str2Len = doubleStr2.length;
            if (str2Len > eStr) {
                let _nums = doubleStr2.substring(0, eStr);
                let _nume = doubleStr2.substring(eStr, str2Len);
                doubleStr = doubleStr1 + _nums + '.' + _nume;
            } else if (str2Len < eStr) {
                let _indexNum = eStr - str2Len;
                let _str = _makeZero(_indexNum); //用0补齐
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
    let re = {
        r1: 0, //数字去掉小数点后的值，也就是 r1*r2 的结果
        r2: 1 //小数部分，10的长度次幂
    };
    if (isInteger(num)) { //整数直接返回
        re.r1 = num;
        return re;
    }
    let snum = scienceNum(num + ""); //处理0.123e-10类似问题
    let dotPos = snum.indexOf("."); //小数点位置
    let len = snum.substr(dotPos + 1).length; //小数点长度
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
    let xx = Number(x == undefined ? 0 : x);
    let yy = Number(y == undefined ? 0 : y);

    //
    let a = science(xx);
    let b = science(yy);

    let na = a.r1;
    let nb = b.r1;

    let ta = a.r2;
    let tb = b.r2;
    let maxt = Math.max(ta, tb);

    //精度值处理
    let result = 0;
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
        return Number(Number(result).toFixed(parseInt(acc)));
    } else {
        return Number(result);
    }
}

/**
 * 默认toFixed方法为四舍六入五成双算法
 * 重写toFixed方法调整为四舍五入算法
 */
Number.prototype.toFixed = function(length) {
    let carry = 0; //存放进位标志
    let num, multiple; //num为原浮点数放大multiple倍后的数，multiple为10的length次方
    let str = this + ''; //将调用该方法的数字转为字符串
    let dot = str.indexOf("."); //找到小数点的位置
    if (str.substr(dot + length + 1, 1) >= 5) carry = 1; //找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1
    multiple = Math.pow(10, length); //设置浮点数要扩大的倍数
    num = Math.floor(this * multiple) + carry; //去掉舍入位后的所有数，然后加上我们的手动进位数
    let result = num / multiple + ''; //将进位后的整数再缩小为原浮点数
    /*
     * 处理进位后无小数
     */
    dot = result.indexOf(".");
    if (dot < 0) {
        result += '.';
        dot = result.indexOf(".");
    }
    /*
     * 处理多次进位
     */
    let len = result.length - (dot + 1);
    if (len < length) {
        for (let i = 0; i < length - len; i++) {
            result += 0;
        }
    }
    return result;
}

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
