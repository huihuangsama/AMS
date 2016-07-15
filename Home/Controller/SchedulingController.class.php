<?php
namespace Home\Controller;
use Think\Controller;
use Think\Model;

class SchedulingController extends Controller {
    // ����Ű��
    public function setScheduling() {
        $Model = new Model();
        $schedule = I('post.scheduling');
        $did = I('post.did');
        $Model->execute("DELETE FROM ams_schedule
                        WHERE aid in (
                            SELECT aid
                            FROM ams_assistant
                            WHERE ams_assistant.did = '$did' )");
        foreach ($schedule as $key => $value) {
            $aid = substr($value, 0, 8);
            $weekday = substr($value, 8, 1);
            $stime = substr($value, 9, 4);
            $etime = substr($value, 13, 4);
            $Model->execute("INSERT INTO ams_schedule (aid, stime, etime, weekday) VALUES ('$aid', '$stime', '$etime', '$weekday')");
        }
        $response['success'] = 1;
        $this->ajaxReturn($response,'JSON');
    }

    // �鿴�r�g��������ĕr�g��͹���T�鿴�Լ���ݠ������Ű��
    public function getScheduling() {
        $user_id = I('cookie.userId');
        
        $Model = new Model();
        // ��������������򷵻��Լ����Ű�ʱ��
        if (I('cookie.type') == 1) {
            $result = $Model->query("SELECT aid, stime, etime, weekday FROM ams_schedule s WHERE aid = '$user_id' ORDER BY weekday ASC");
            if (!empty($result)) {
                $response['success'] = 1;
                $scheduling = array();
                foreach ($result as $key => $scheduling_item) {
                    $scheduling[] = $scheduling_item['aid'].$scheduling_item['weekday'].$scheduling_item['stime'].$scheduling_item['etime'];
                }
                $response['data'] = $scheduling;
            } else {
                // ��δ�Ű�
                $response['success'] = 0;
            }
            // ����ǹ���Ա�����򷵻��ض���������������Ű�ʱ��
        } else if (I('cookie.type') == 2) {
            $did = I("post.did");
            $sql = "SELECT s.aid, s.stime, s.etime, s.weekday FROM ams_manage m INNER JOIN ams_schedule s ON m.aid = s.aid WHERE m.mid = '$user_id' AND m.did = '$did'";
            $result = $Model->query($sql);
            if (!empty($result)) {
                $response['success'] = 1;
                $scheduling = array();
                foreach ($result as $key => $scheduling_item) {
                    $scheduling[] = $scheduling_item['aid'].$scheduling_item['weekday'].$scheduling_item['stime'].$scheduling_item['etime'];
                }
                $response['data'] = $scheduling;
            } else {
                $response['success'] = 0;
            }
        }

        $this->ajaxReturn($response, 'JSON');
    }

    // ȡ����һ���Y���µĹ��r
    public function getLastMonthWorkingHour() {
        $Model = new Model();
        $mid = I('cookie.userId');
        $last_counting_time = $Model->query("SELECT MAX(time) AS time FROM ams_counting_time WHERE mid = '$mid'");
        $last_counting_time = $last_counting_time[0]['time'];
        $sql = "SELECT amsa.id, amsa.name, amsa.email, amsa.phone, amsw.lel_time, amsw.lel_work_hour, amsw.work_hour FROM ams_work_hour amsw 
                INNER JOIN ams_assistant amsa
                ON amsw.aid = amsa.id
                WHERE amsw.time = '$last_counting_time'";
        $result = $Model->query($sql);
        $response['success'] = 1;
        $response['data'] = $result;
        $this->ajaxReturn($result,'JSON');
    }

    // �Y�㹤�r
    public function countWorkingHour() {
        $Model = new Model();
        $date = date("Ymd");
        $mid = I("cookie.userId");
        // ȡ������Ű��ʱ��
        $last_counting_time = $Model->query("SELECT MAX(time) AS time FROM ams_counting_time WHERE mid = '$mid'");
        $last_counting_time = $last_counting_time[0]['time'];
        // $last_counting_time = '00000000';
        // SELECT Tempa.id AS aid, Tempa.name, Tempa.email, Tempa.phone, Temps.stime, Temps.etime, Tempc.bias 
        // FROM ((SELECT aid, id, stime, etime
        //     FROM ams_schedule 
        //     WHERE EXISTS 
        //         (SELECT * 
        //         FROM ams_manage 
        //         WHERE ams_manage.mid = '$mid'  AND ams_schedule.aid = ams_manage.aid)) AS Temps 
        // INNER JOIN (SELECT sid, bias 
        //     FROM ams_checkInOutInfo 
        //     WHERE date > '$last_counting_time' AND EXISTS 
        //         (SELECT * 
        //         FROM ams_manage 
        //         WHERE ams_manage.mid = '$mid' AND ams_checkInOutInfo.aid = ams_manage.aid)) AS Tempc ON Temps.id = Tempc.sid
        // INNER JOIN ams_assistant AS Tempa ON Temps.aid = Tempa.id
        // )
        // dump($last_counting_time);

        $sql = "SELECT Temps.aid, Temps.stime, Temps.etime, Tempc.bias 
                FROM ((SELECT aid, id, stime, etime
                    FROM ams_schedule 
                    WHERE EXISTS 
                        (SELECT * 
                        FROM ams_manage 
                        WHERE ams_manage.mid = '$mid'  AND ams_schedule.aid = ams_manage.aid)) AS Temps 
                INNER JOIN (SELECT sid, bias 
                    FROM ams_check_in_out_info 
                    WHERE date > '$last_counting_time' AND EXISTS 
                        (SELECT * 
                        FROM ams_manage 
                        WHERE ams_manage.mid = '$mid' AND ams_check_in_out_info.aid = ams_manage.aid)) AS Tempc ON Temps.id = Tempc.sid
                )";
        $result = $Model->query($sql);
        if (empty($result)) {
            $response['success'] = 0;
        }
        $id = array();
        // ���㹤ʱ�ͳٵ��������
        foreach ($result as $outterk => $outterv) {
            if (in_array($outterv['aid'], $id)) {
                if ($outterv['bias'] < 0) {
                    $lel_time[$outterv['aid']] += 1;
                    $lel_work_hour[$outterv['aid']] += $time;
                } else {
                    $work_hour[$outterv['aid']] += $time;
                }
            } else {
                $id[] = $outterv['aid'];
                $temp = intval($outterv['etime']) - intval($outterv['stime']);
                $time = (int)($temp / 100) + (($temp % 100) / 60);
                $lel_time[$outterv['aid']] = 0;
                $lel_work_hour[$outterv['aid']] = 0;
                $work_hour[$outterv['aid']] = 0;
                // dump($time);
                if ($outterv['bias'] < 0) {
                    $lel_time[$outterv['aid']] += 1;
                    $lel_work_hour[$outterv['aid']] += $time;
                } else {
                    $work_hour[$outterv['aid']] += $time;
                }
            }
        }
        // �����㹤ʱ������빤ʱ����
        foreach ($id as $key => $aid) {
            $Model->execute("INSERT INTO ams_work_hour (aid, time, lel_time, lel_work_hour, work_hour) 
                VALUES ('$aid', '$date', '$lel_time[$aid]', '$lel_work_hour[$aid]', '$work_hour[$aid]')");
        }
        $Model->execute("INSERT INTO ams_counting_time (mid, time) VALUES ('$mid', '$date')");
        $response['success'] = 1;
        $this->ajaxReturn($response,'JSON');
    }

    // չʾ��ʱ
    public function showWorkingHour() {
        $Model = new Model();
        $mid = I("cookie.userId");
        $last_counting_time = $Model->query("SELECT MAX(time) AS time FROM ams_counting_time WHERE mid = '$mid'");
        $last_counting_time = $last_counting_time[0]['time'];
        $Model = new Model();
        $date = date("Ymd");
        $work_hour = $Model->query("SELECT awh.aid, awh.lel_time, awh.lel_work_hour, awh.work_hour, aa.name, aa.phone, aa.email, ad.name AS dname
                                    FROM ams_work_hour AS awh
                                    INNER JOIN ams_assistant AS aa
                                    ON awh.aid = aa.id
                                    INNER JOIN ams_department AS ad
                                    ON aa.did = ad.id
                                    WHERE awh.time = '$date'");
        if (!empty($work_hour)) {
            $response['success'] = 1;
            $response['data'] = $work_hour;
        } else {
            $response['success'] = 0;
        }
        
        $this->ajaxReturn($response,'JSON');
    }
    // ����Ű��ҳ��
    public function getSchedulingForm() {
        if (I('cookie.userId') == "") {
            $this->redirect('UserManage/loginForm');
        } else {
            $this->display('ShowSchedulingForm');
        }
    }

    // �Ű�ҳ��
    public function schedulingForm() {
        if (I('cookie.userId') == "") {
            $this->redirect('UserManage/loginForm');
        } else {
            $this->display('SchedulingForm');
        }
    }

    // ͳ�ƹ�ʱ
    public function workingHourForm() {
        if (I('cookie.userId') == "") {
            $this->redirect('UserManage/loginForm');
        } else {
            $this->display('WorkHour');
        }
    }
}