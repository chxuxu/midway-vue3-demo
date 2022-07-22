 
 function Rule(target: any, propertyName: string){
    // 属性值
    let _val = target[propertyName];

    // 属性读取访问器
    const getter = () => {
        //console.log(`Get: ${propertyName} => ${_val}`);
        if(_val){
            console.log(`参数值 ${propertyName} 不能为空`);
        }
        return _val;
    };

    // 属性写入访问器
    const setter = newVal => {
        //console.log(`Set: ${propertyName} => ${newVal}`);
        _val = newVal;
    };

    Object.defineProperty(target, propertyName, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    });
 }
 class UserLoginDTO{
    @Rule
    usrename:string;

    @Rule
    password:string;

    isValid:boolean;

 }

export default UserLoginDTO;