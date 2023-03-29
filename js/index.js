//验证是否登录，如果没有登录则跳转到登录页，如果有，则获取到用户的登录信息
(async function (){
    // API.loginOut();
    const resp = await API.profile();
    console.log(resp);
    const user = resp.data;
    if(!user){
        alert('未登录或登录已过期');
        location.href = './login.html';
        return;
    }
    // 登录成功状态
   const doms = {
    nickname:$('#nickname'),
    loginId:$('#loginId'),
    close:$('.close'),
    chatContainer:$('.chat-container'),
    txtMsg:$('#txtMsg'),
    msgContainer:$('.msg-container'),
   }

//  加载历史记录
await loadHistory();
async function loadHistory(){
    const resp =await API.getHistory();
    // console.log(resp);
    for(const item of resp.data){
        addChat(item);
    }
    scrollBottom();
}
// 发送消息事件
doms.msgContainer.onsubmit = function(e){
    e.preventDefault();
    sendChat();
}
  
//    设置用户信息
setUserInfo();
   function setUserInfo(){
    doms.nickname.innerText = user.nickname;
    doms.loginId.innerText = user.loginId;
   }
// 注销事件
doms.close.onclick = function(){
    API.loginOut();
    location.href = './login.html';
}
// 根据消息对象,将其添加到页面中
function addChat(chatInfo){
    const div = $$$('div');
    div.classList.add('chat-item');
    if(chatInfo.from){
        div.classList.add('me');
    }
    const img = $$$('img');
    img.className = 'chat-avatar';
   img.src = chatInfo.from ? './asset/avatar.png' : './asset/robot-avatar.jpg';
   const content = $$$('div');
   content.className = 'chat-content';
   content.innerText = chatInfo.content;
   const date = $$$('div');
   date.className = 'chat-date';
   date.innerText = formatDate(chatInfo.createdAt);

   div.appendChild(img);
   div.appendChild(content);
   div.appendChild(date);
   doms.chatContainer.appendChild(div);
}
// 滚动条事件
function scrollBottom(){
    // console.log(doms.chatContainer.scrollHeight)
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
}
// 发送消息
async function sendChat(){
    const content = doms.txtMsg.value.trim();
    if(!content){
        return ;
    }
    addChat({
        content,
        createdAt:Date.now(),
        from: user.loginId,
        to: null
    });
    doms.txtMsg.value = '';
    scrollBottom();
     const resp = await API.sendChat({content});
     console.log(resp);
     addChat({
        from: null,
        to:user.loginId,
        ...resp.data
     })
     scrollBottom(); 
     
}
//   根据时间戳得到年月日
function formatDate(timestamp){
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth()+1).toString().padStart(2,'0');
    const day = date.getDate().toString().padStart(2,'0');
    const hour = date.getHours().toString().padStart(2,'0');
    const minute = date.getMinutes().toString().padStart(2,'0');
    const second = date.getSeconds().toString().padStart(2,'0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
addChat({ 
    content: "芳龄几许？",
    createdAt: 1657190324432,
    from: "gugu",
    to: null
})
})()
