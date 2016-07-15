<?php
namespace Home\Controller;
use Think\Controller;
use Think\Model;

class CheckInOutController extends Controller {
    public function checkIn() {
        $Model = new Model();
        $sid = I('post.sid');
        $aid = I('cookie.userId');
        $bias = intval(I('post.bias'));
        $date = date("Ymd");

        if ($bias < 0) {
            $bias *= 10;
        }
        $result = $Model->execute("INSERT INTO ams_check_in_out_info (sid, aid, date, bias) VALUES ('$sid', '$aid', '$date', '$bias')");
        if($result) {
            $response['success'] = 1;
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($response,'JSON');
    }
    public function checkOut() {
        $Model = new Model();
        $condition['sid'] = I('post.sid');
        $condition['date'] = date("Ymd");
        $bias = intval(I('post.bias'));
        if ($bias < 0) {
            $bias *= 10;
        }
        $Model->table('ams_check_in_out_info')->where($condition)->setInc('bias',$bias);
    }
    public function getCheckInfo() {

    }
    // 上下班登记界面
    public function checkInOutForm() {
        if (I('cookie.userId') == "") {
            $this->redirect('UserManage/loginForm');
        } else {
            $this->display('WorkRegister');
        }
    }

    public function getScheduling() {
        $user_id = I('cookie.userId');
        $Model = new Model();
        $result = $Model->query("SELECT s.id AS sid, s.stime, s.etime, s.weekday FROM ams_schedule s WHERE s.aid = '$user_id'");
        if (!empty($result)) {
            $response['success'] = 1;
            $scheduling = array();
            foreach ($result as $key => $scheduling_item) {
                $temp['sid'] = $scheduling_item['sid'];
                $temp['time'] = $scheduling_item['weekday'].$scheduling_item['stime'].$scheduling_item['etime'];
                $scheduling[] = $temp;
            }
            $response['data'] = $scheduling;
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($response, 'JSON');
    }
}
