<?php
namespace Home\Controller;
use Think\Controller;
use Think\Model;

class FreeTimeManageController extends Controller {
    public function addFreeTime() {
        $aid = I('cookie.userId');
        $Model = new Model();
        $free_time_array = I('post.free_time');
        $Model->execute("DELETE FROM ams_free_time WHERE aid = '$aid'");
        foreach ($free_time_array as $key => $value) {
            $weekday = $value[0];
            $stime = substr($value, 1, 4);
            $etime = substr($value, 5, 4);
            $result = $Model->execute("INSERT INTO ams_free_time (aid, stime, etime, weekday) VALUES ('$aid', '$stime', '$etime', '$weekday')");
            if ($result) {
                $response['success'] = 1;
            } else {
                $response['success'] = 0;
            }
        }
        $this->ajaxReturn($response,'JSON');

    }
    // 查看特定助理的空闲时间
    public function getFreeTime() {
        $Model = new Model();
        $aid = I('cookie.userId');
        $free_time_of_a_assistant = $Model->query("SELECT * FROM ams_free_time f WHERE f.aid = '$aid' ORDER BY weekday ASC");
        $free_time = array();
        if (!empty($free_time_of_a_assistant)) {
            foreach ($free_time_of_a_assistant as $key => $value) {
                $free_time[] = $value['weekday'].$value['stime'].$value['etime'];
            }
            $response['success'] = 1;
            $response['free_time'] = $free_time;
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($response,'JSON');
    }

    // 取得所有該管理員管轄助理的空閒時間
    public function getAllFreeTime() {
        $Model = new Model();
        $mid = I('cookie.userId');
        $did = I('post.did');
        $sql = "SELECT * FROM ams_free_time f INNER JOIN ams_manage m ON f.aid = m.aid WHERE m.mid = '$mid' AND m.did = '$did'";
        $result = $Model->query($sql);
        // dump($result);
        // echo $Model->getLastSql();
        $free_time = array();
        if ($result) {
            foreach ($result as $key => $value) {
                $free_time[] = $value['aid'].$value['weekday'].$value['stime'].$value['etime'];
            }
            $response['success'] = 1;
            $response['free_time'] = $free_time;
        } else {
            $response['success'] = 0;
        }
        // dump($free_time);
        $this->ajaxReturn($response,'JSON');
    }
    // 空闲时间管理界面
    public function freeTimeManageForm() {
        if (I('cookie.userId') == "") {
            $this->redirect('UserManage/loginForm');
        } else {
            $this->display('FreeTimeForm');
        }
    }
}
