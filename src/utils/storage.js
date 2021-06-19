//本地存储

export const getItem = (name) => {
    const data = window.localStorage.getItem(name);
    try {
        return JSON.parse(data);
    } catch (err) {
        return data;
    }
};

export const setItem = (name, value) => {
    //如果value是对象就把value 转为json格式字符串
    if (typeof value === "object") {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(name, value);
};

export const removeItem = (name) => {
    window.localStorage.removeItem(name);
};
