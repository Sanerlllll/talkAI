// 验证账号
const  loginIdValidator = new FieldValidator('txtLoginId',async function(val){
    if(!val){
        return '请填写账号';
    };
    const resp = await API.exists(val);
    if(resp.data){
        return '该账号已存在'
    } 
})
// 验证昵称
const nickNameValidator = new FieldValidator('txtNickname',function(val){
    if(!val){
        return '请输入昵称';
    }
})
// 验证密码
const loginPwdValidator = new FieldValidator('txtLoginPwd', function(val){
    if(!val){
        return '请填写密码';
    }

})
// 确认密码
const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm', function(val){
    if(!val){
        return '请填写密码';
    }
    if(val !== loginPwdValidator.input.value){
        return '两次密码不一致 '
    }
})
const form = $('.user-form');
form.onsubmit = async function(e){
    e.preventDefault();//阻止事件默认
    const result = await FieldValidator.validate(loginIdValidator,nickNameValidator,loginPwdValidator,loginPwdConfirmValidator);
    if(!result){
        return;//验证未通过 ，结束
    }
    // 浏览器提供的构造函数 用于组装表单数据
    // const formData = new FormData(form);//传入表单dom，得到一个表单数据对象
    // const data = Object.fromEntries(formData.entries());
    // console.log(data)
    const resp = await API.reg({
        "loginId":loginIdValidator.input.value,
        "loginPwd":loginPwdValidator.input.value,
        "nickname":nickNameValidator.input.value
    })
    // console.log(resp);
    if(resp.code ===0){
        alert('注册成功,点击确定，跳转到登录页');
        location.href = './login.html';
    }
    
}
