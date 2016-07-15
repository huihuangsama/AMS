<?php
namespace Home\Controller;
use Think\Controller;
use Think\Model;

class AssistantManageController extends Controller {
    public function addAssistant() {
        // if return 1, assistant is added successfully; if 0, the assistant already existd.
        // if 3, assistant is added failed;
        $Model = new Model();
        $aid = I('post.aid');
        
        // the code below checks if the assistant is existed aready.
        $found = $Model->query("SELECT * FROM ams_assistant WHERE id='$aid' LIMIT 1");
        if (!empty($found)) {
            $response['success'] = 0;
        } else {

            // Adding management infomation in table ams_manage (aid, mid)
            $mid = I('cookie.userId');
            $did = I('post.did');
            // Adding assistant in table ams_assistant
            $aresult = $Model->execute("INSERT INTO ams_assistant (id, passwd, did) VALUES ('$aid', '$aid', '$did')");
            $mresult = $Model->execute("INSERT INTO ams_manage (aid, mid, did) VALUES ('$aid', '$mid', '$did')");
            if(!empty($aresult) && !empty($mresult)) {
                $response['success'] = 1;
            } else {
                $response['success'] = 3;
            }
        }
        $this->ajaxReturn($response,"JSON");
    }

    public function delAssistant() {
        // if flag bit is 1, which indicates the assistant is deleted successfully;

        $assistantForm = M('assistant');
        $map['id'] = I('post.aid');
        $assistantForm->where($map)->delete();
        $response['success'] = 1;
        $this->ajaxReturn($response,"JSON");
    }

    public function getAllAssistants() {
        $Model = new Model();
        $mid = I('cookie.userId');
        $all_info = $Model->query("SELECT a.id, a.name AS name, a.phone, a.email, a.did
                                FROM ams_assistant a
                                INNER JOIN ams_department d ON a.did = d.id
                                INNER JOIN ams_manage m ON a.id = m.aid
                                WHERE m.mid = '$mid'"
                                );
        $temp = $Model->query("SELECT m.did, p.name
                            FROM ams_manage m
                            INNER JOIN ams_department p ON p.id = m.did
                            WHERE mid = '$mid'");
        // dump($temp);
        $response['success'] = 0;
        if (!empty($all_info)) {
            // dump($temp);
            $response['success'] = 1;
            $response['all_info'] = $all_info;
        }
        if (!empty($temp)) {
            $did_depart = array();
            $response['success'] = 1;
            foreach ($temp as $key => $value) {
               $did_depart[$value['did']] = $value['name'];
            }
            $response['did_depart'] = $did_depart;
        }
        $this->ajaxReturn($response,'JSON');
    }

    // 管理助理页面
    public function assistantManageForm() {
        if (I('cookie.userId') == "") {
            $this->redirect('UserManage/loginForm');
        } else {
            $this->display('ManageAssistantForm');
        }
    }
}
