<?php
namespace Home\Controller;
use Think\Controller;
use Think\Model;

class ManagerManageController extends Controller {
    public function addManager() {
        $Model = new Model();
        if (I('post.passwd') == 'admin') {
            $mid = I('post.mid');
            $result = $Model->query("SELECT * FROM ams_manager WHERE id = '$mid' LIMIT 1");
            if (empty($result)) {
                $did_arr = I("post.did");
                $Model->execute("INSERT INTO ams_manager (id, passwd) VALUES ('$mid', '$mid')");
                $time = date("Ymd");
                $Model->execute("INSERT INTO ams_counting_time (mid, time) VALUES ('$mid', '$time')");
                foreach ($did_arr as $key => $value) {
                    $Model->execute("INSERT INTO ams_manage (mid, did) VALUES ('$mid', '$value')");
                    // dump($value);
                }
                $response['success'] = 1;
            } else {
                $response['success'] = 0;
            }
        } else {
            $response['success'] = 2;
        }
        $this->ajaxReturn($response,'JSON');
    }

    public function getAllManager() {
        $Model = new Model();
        $temp = $Model->query("SELECT id, name FROM ams_manager");
        if (!empty($temp)) {
            $result = array();
            foreach ($temp as $key => $value) {
                # code...
                $result[$value['id']] = $value['name'];
            }
            $response['success'] = 1;
            $response['manager'] = $result;
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($response,'JSON');
    }

    public function delManager() {
        $Model = new Model();
        $mid = I('post.mid');
        $result = $Model->execute("DELETE FROM ams_manager WHERE id='$mid'");
        if ($result !== false) {
            $response['success'] = 1;
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($response,'JSON');
    }
}