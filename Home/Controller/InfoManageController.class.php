<?php
namespace Home\Controller;
use Think\Controller;
use Think\Model;

class InfoManageController extends Controller {
    public function updateUserInfo() {
        $Model = new Model();
        $userId = $_COOKIE['userId'];
        $email = I('post.email');
        $name = I('post.name');
        $phone = I('post.phone');
        $passwd = I('post.passwd');

        if (I("cookie.type") == 1) {
            if ($passwd == "") {
                $result = $Model->execute("UPDATE ams_assistant SET name='$name', email='$email', phone='$phone' WHERE id='$userId'");
            } else {
                $result = $Model->execute("UPDATE ams_assistant SET name='$name', email='$email', phone='$phone', passwd='$passwd' WHERE id='$userId'");
            }
        } else {
            if ($passwd == "") {
                $result = $Model->execute("UPDATE ams_manager SET name='$name', email='$email', phone='$phone' WHERE id='$userId'");
            } else {
                $result = $Model->execute("UPDATE ams_manager SET name='$name', email='$email', phone='$phone', passwd='$passwd' WHERE id='$userId'");
            }
        }
        if($result !== false) {
            $response['success'] = 1;
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($response,'JSON');
    }

    public function getUserInfo() {
        $Model = new Model();
        $userId = I('cookie.userId');
        if (I('cookie.type') == 1) {
            $res_data = $Model->query("SELECT a.name, a.phone, a.email, d.name AS department
                                FROM ams_assistant a
                                INNER JOIN ams_department d ON a.did = d.id
                                WHERE a.id = '$userId' LIMIT 1");
        } else {
            $res_data = $Model->query("SELECT name, phone, email
                                FROM ams_manager m
                                WHERE m.id = '$userId' LIMIT 1");
        }
        
        if(!empty($res_data)) {
            $res_data['account'] = $userId;
            $response['success'] = 1;
            $response['data'] = $res_data;
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($response,"JSON");
    }

    public function checkUser() {
        $Model = new Model();
        $passwd = I('post.passwd');
        $userId = I('cookie.userId');
        if (I("cookie.type") == 1) {
            $result = $Model->query("SELECT * FROM ams_assistant WHERE id = '$userId' AND passwd = '$passwd' LIMIT 1");
        } else {
            $result = $Model->query("SELECT * FROM ams_manager WHERE id = '$userId' AND passwd = '$passwd' LIMIT 1");
        }
        if (!empty($result)) {
            $response['success'] = 1;
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($response,'JSON');
    }
    // 个人信息管理界面
    public function infoManageForm() {
        if (I("cookie.userId") == '') {
            $this->redirect('UserManage/loginForm');
        } else {
            $this->display('PersonalInformationForm');
        }
    }
}