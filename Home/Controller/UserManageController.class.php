<?php
namespace Home\Controller;
use Think\Controller;
class UserManageController extends Controller {
    public function login(){
        // getting user's account, probably students' id or teachers' id, and the password
        // seaching from user table to check if the user in the table. 
        // If do in table, seccess signal(1), user's name and user's account will be returned to indicate the user login successfully;
        // otherwise, unseccess signal(0) will be returned.
        if (I('post.type') == 1) {
            $userForm = M('assistant');
            $user_type = 1;
        } else {
            $userForm = M('manager');
            $user_type = 2;
        }
        $find_condition['id'] = I('post.id');
        $find_condition['passwd'] = I('post.passwd');
        $user = $userForm->where($find_condition)->limit(1)->select();
        // echo $userForm->getLastSql();
        if ($user) {
            cookie('userId', $user[0]['id'], 5 * 3600); //if user login successfully, a cookie will be set.
            cookie('type', $user_type, 5 * 3600);
            $data['success'] = 1;
            // $data['name'] = $user[0]['name'];
            // $data['account'] = $user[0]['account'];
        } else {
            $data['success'] = 0;
        }
        $this->ajaxReturn($data, 'JSON');
    }

    public function logoff() {
        if ($_COOKIE['userId'] != "") {
            cookie('userId', null); // if user logoff, the related cookie will be deleted.
            cookie('type', null);
        }
    }

    // 登陆界面
    public function loginForm() {
        if (I('cookie.userId') == "") {
            $this->display('LoginInForm');
            // $this->redirect('UserManage/LoginInForm');
        } else {
            $this->redirect('Index/HomePage');
        }
    }
}
