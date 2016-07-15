<?php
namespace Home\Controller;
use Think\Controller;
use Think\Model;

class DepartmentManageController extends Controller {
    public function getAllDepartment() {
        $Model = new Model();
        $temp = $Model->query("SELECT * FROM ams_department");
        if (!empty($temp)) {
            $did_depart = array();
            // dump($temp);
            foreach ($temp as $key => $value) {
               $did_depart[$value['id']] = $value['name'];
            }
            $response['success'] = 1;
            $response['did_depart'] = $did_depart;
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($response,'JSON');
    }

    public function delDepartment() {
        $Model = new Model();
        $did = I("post.did");
        $result = $Model->execute("DELETE FROM ams_department WHERE id = '$did'");
        if ($result !== false) {
            $response['success'] = 1;
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($response,'JSON');
    }

    public function addDepartment() {
        $Model = new Model();
        $dname = I("post.dname");
        $result = $Model->query("SELECT * FROM ams_department WHERE name = '$dname'");
        if (I('post.passwd') == 'admin') {
            if(empty($result)) {
                $dpt['name'] = I('post.dname');
                $did = $Model->table('ams_department')->add($dpt);
                $response['success'] = 1;
                $response['did'] = $did;
            } else {
                $response['success'] = 0;
            }
        } else {
            $response['success'] = 2;
        }
        $this->ajaxReturn($response,'JSON');
    }

    public function getRelatedDepartment() {
        $Model = new Model();
        $mid = I("cookie.userId");
        if (I("cookie.type") == 1) {
            $response['success'] = 1;
            $response['did_depart'] = 0;
            $this->ajaxReturn($response,'JSON');
        }
        $temp = $Model->query("SELECT DISTINCT m.did, p.name
                            FROM ams_manage m
                            INNER JOIN ams_department p ON p.id = m.did
                            WHERE m.mid = '$mid'");
        if (!empty($temp)) {
            $did_depart = array();
            // dump($temp);
            foreach ($temp as $key => $value) {
               $did_depart[$value['did']] = $value['name'];
            }
            $response['success'] = 1;
            $response['did_depart'] = $did_depart;
        } else {
            $response['success'] = 0;
        }
        $this->ajaxReturn($response,'JSON');
    }
}