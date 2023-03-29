/** 用户登录和注册的表单验证的通用js */

/** 
 * 对某一个表单进行验证的构造函数
*/
class FieldValidator{
    /**
     * 
     * @param {String} txtId  文本框的id属性
     * @param {Function} validatorFunc 验证规则函数，当需要对文本框进行验证时调用该函数
     */
   constructor(txtId,validatorFunc){
    //拿到表单的input属性和p元素
    this.input = $('#'+txtId);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    // 文本框失去焦点时触发 调用验证方法
    this.input.onblur =()=>{
        this.validate();
    }
   }
   /**
    * 验证方法:成功返回true，失败返回flase
    */
   async validate(){
    const err = await this.validatorFunc(this.input.value);
    if(err){
        this.p.innerText = err;
        return false;
    }else{
        this.p.innerText = '';
        return true;
    }
   }

   /**
    * 
    * @param  {FieldValidator[]} validators:FieldValidator类型的数组
    */
   static async validate(...validators){
    const proms = validators.map((v) => v.validate());
    const results = await Promise.all(proms);
    return results.every((r) => r);
   }
}


