function login(){
    var _email = $('#contact-email').val();
    var _password = $('#contact-password').val();
   


    if(!_email || !_password ){
        alert('請輸入帳號密碼!');
    }
    else{
        $.post("/member/login",{'email':_email,'password':_password},function(res){
            if(res.status==1){
             alert(res.msg);
            }
            else{
                $.cookie('userName',res.user.name);
                $.cookie('userID',res.user.email)
                $.cookie('token',res.token)
                alert('登入成功!');
                location.href='/public/index.html';
            }
        });
    }
}