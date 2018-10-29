function addMember() {
    var _account = $('#contact-email').val();
    var _password = $('#contact-password').val();
    var _confirmpsd= $('#confirm_password').val();
    var _name = $('#contact-name').val();


    if(!_account || !_password || !_confirmpsd || !_name){
       alert('請輸入未填欄位!')
    }
    else if(_password != _confirmpsd){
        alert('確認密碼不相同!')
    }
    else{
        $.post("http://localhost:3000/member/addMember",{'name':_name,'email':_account,'password':_password},function(res){
            if(res.status==1){
             $('#errormsg').text(res.msg)
            }
            else{
                alert('註冊成功!');
            }
        });
    }
   
}