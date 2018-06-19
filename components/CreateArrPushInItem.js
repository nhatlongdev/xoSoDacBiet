import React, {Component} from 'react';
import {

} from 'react-native';


function createArrPushInItem(data){
    // console.log("GIA TRI MANG: " + JSON.stringify(data));
   var data_detector_statistic = {};
   var _MB = [], _XSDacNong=[], _XSDakLak=[], _XSGiaLai=[], _XSTTH=[], _XSKhanhHoa=[], _XSKontum=[], _XSNinhThuan=[],
    _XSPhuYen=[], _XSQuangBinh=[], _XSQuangNam=[], _XSQuangNgai=[], _XSQuangTri=[], _XSDaNang=[], _XSAnGiang=[],
    _XSVungTau=[], _XSBacLieu=[], _XSBenTre=[], _XSBinhDuong=[], _XSBinhPhuoc=[], _XSBinhThuan=[], _XSCaMau=[],
    _XSCanTho = [], _XSHauGiang=[], _XSKienGiang=[], _XSLongAn=[], _XSSocTrang=[], _XSTayNinh=[], _XSTienGiang=[],
    _XSTPHCM =[], _XSTraVinh=[], _XSVinhLong=[], _XSDaLat=[], _XSDongNai=[], _XSDongThap=[];
   for(var i=0; i< data.length; i++){
       var item = [];
       if(data[i].s1 != '' && data[i].s1 != null){
            var number = data[i].s1.split(' - ');
            if(number.length > 0){
                for(var j =0; j< number.length; j++){
                    var key = 's1' + j;
                    var s1={};
                    var key_item = 's1' + j + data[i].rd + data[i].pc;
                    s1.key = key_item;
                    s1.number = number[j];
                    s1.giai = 'Giải đặc biệt'; s1.date = data[i].rd; s1.code = data[i].pc;
                    item.push(s1);
                }
            }
       }
       if(data[i].s2 != '' && data[i].s2 != null){
            var number = data[i].s2.split(' - ');
            if(number.length > 0){
                for(var j =0; j< number.length; j++){
                    var key = 's2' + j;
                    var s2={};
                    var key_item = 's2' + j + data[i].rd + data[i].pc;
                    s2.key = key_item;
                    s2.number = number[j];
                    s2.giai = 'Giải đặc biệt'; s2.date = data[i].rd; s2.code = data[i].pc;
                    item.push(s2);
                }
            }
       }
       if(data[i].p1 != '' && data[i].p1 != null){
            var number = data[i].p1.split(' - ');
            if(number.length > 0){
                for(var j =0; j< number.length; j++){
                    var key = 'p1' + j;
                    var p1={};
                    var key_item = 'p1' + j + data[i].rd + data[i].pc;
                    p1.key = key_item;
                    p1.number = number[j];
                    p1.giai = 'Giải nhất'; p1.date = data[i].rd; p1.code = data[i].pc;
                    item.push(p1);
                }
            }
       }
       if(data[i].p2 != '' && data[i].p2 != null){
            var number = data[i].p2.split(' - ');
            if(number.length > 0){
                for(var j =0; j< number.length; j++){
                    var key = 'p2' + j;
                    var p2={};
                    var key_item = 'p2' + j + data[i].rd + data[i].pc;
                    p2.key = key_item;
                    p2.number = number[j];
                    p2.giai = 'Giải nhì'; p2.date = data[i].rd; p2.code = data[i].pc;
                    item.push(p2);
                }
            }
        }
        if(data[i].p3 != '' && data[i].p3 != null){
            var number = data[i].p3.split(' - ');
            if(number.length > 0){
                for(var j =0; j< number.length; j++){
                    var key = 'p3' + j;
                    var p3={};
                    var key_item = 'p3' + j + data[i].rd + data[i].pc;
                    p3.key = key_item;
                    p3.number = number[j];
                    p3.giai = 'Giải ba'; p3.date = data[i].rd; p3.code = data[i].pc;
                    item.push(p3);
                }
            }
        }
        if(data[i].p4 != '' && data[i].p4 != null){
            var number = data[i].p4.split(' - ');
            if(number.length > 0){
                for(var j =0; j< number.length; j++){
                    var key = 'p4' + j;
                    var p4={};
                    var key_item = 'p4' + j + data[i].rd + data[i].pc;
                    p4.key = key_item;
                    p4.number = number[j];
                    p4.giai = 'Giải tư'; p4.date = data[i].rd; p4.code = data[i].pc;
                    item.push(p4);
                }
            }
        }
        if(data[i].p5 != '' && data[i].p5 != null){
            var number = data[i].p5.split(' - ');
            if(number.length > 0){
                for(var j =0; j< number.length; j++){
                    var key = 'p5' + j;
                    var p5={};
                    var key_item = 'p5' + j + data[i].rd + data[i].pc;
                    p5.key = key_item;
                    p5.number = number[j];
                    p5.giai = 'Giải năm'; p5.date = data[i].rd; p5.code = data[i].pc;
                    item.push(p5);
                }
            }
        }
        if(data[i].p6 != '' && data[i].p6 != null){
            var number = data[i].p6.split(' - ');
            if(number.length > 0){
                for(var j =0; j< number.length; j++){
                    var key = 'p6' + j;
                    var p6={};
                    var key_item = 'p6' + j + data[i].rd + data[i].pc;
                    p6.key = key_item;
                    p6.number = number[j];
                    p6.giai = 'Giải sáu'; p6.date = data[i].rd; p6.code = data[i].pc;
                    item.push(p6);
                }
            }
        }
        if(data[i].p7 != '' && data[i].p7 != null){
            var number = data[i].p7.split(' - ');
            if(number.length > 0){
                for(var j =0; j< number.length; j++){
                    var key = 'p7' + j;
                    var p7={};
                    var key_item = 'p7' + j + data[i].rd + data[i].pc;
                    p7.key = key_item;
                    p7.number = number[j];
                    p7.giai = 'Giải bảy'; p7.date = data[i].rd; p7.code = data[i].pc;
                    item.push(p7);
                }
            }
        }

        if(data[i].p8 != '' && data[i].p8 != null){
            var number = data[i].p8.split(' - ');
            if(number.length > 0){
                for(var j =0; j< number.length; j++){
                    var key = 'p8' + j;
                    var p8={};
                    var key_item = 'p8' + j + data[i].rd + data[i].pc;
                    p8.key = key_item;
                    p8.number = number[j];
                    p8.giai = 'Giải tám'; p8.date = data[i].rd; p8.code = data[i].pc;
                    item.push(p8);
                }
            }
        }

        if(data[i].pc == 'MB'){
            _MB.push(item);
        }else if(data[i].pc == 'XSDacNong'){
            _XSDacNong.push(item);
        }else if(data[i].pc == 'XSDakLak'){
            _XSDakLak.push(item);
        }else if(data[i].pc == 'XSGiaLai'){
            _XSGiaLai.push(item);
        }else if(data[i].pc == 'XSTTH'){
            _XSTTH.push(item);
        }else if(data[i].pc == 'XSKhanhHoa'){
            _XSKhanhHoa.push(item);
        }else if(data[i].pc == 'XSKontum'){
            _XSKontum.push(item);
        }else if(data[i].pc == 'XSNinhThuan'){
            _XSNinhThuan.push(item);
        }else if(data[i].pc == 'XSPhuYen'){
            _XSPhuYen.push(item);
        }else if(data[i].pc == 'XSQuangBinh'){
            _XSQuangBinh.push(item);
        }else if(data[i].pc == 'XSQuangNam'){
            _XSQuangNam.push(item);
        }else if(data[i].pc == 'XSQuangNgai'){
            _XSQuangNgai.push(item);
        }else if(data[i].pc == 'XSQuangTri'){
            _XSQuangTri.push(item);
        }else if(data[i].pc == 'XSDaNang'){
            _XSDaNang.push(item);
        }else if(data[i].pc == 'XSAnGiang'){
            _XSAnGiang.push(item);
        }else if(data[i].pc == '_XSVungTau'){
            _XSVungTau.push(item);
        }else if(data[i].pc == 'XSBacLieu'){
            _XSBacLieu.push(item);
        }else if(data[i].pc == 'XSBenTre'){
            _XSBenTre.push(item);
        }else if(data[i].pc == 'XSBinhDuong'){     
            _XSBinhDuong.push(item);
        }else if(data[i].pc == 'XSBinhPhuoc'){
            _XSBinhPhuoc.push(item);
        }else if(data[i].pc == 'XSBinhThuan'){
            _XSBinhThuan.push(item);
        }else if(data[i].pc == 'XSCaMau'){
            _XSCaMau.push(item);
        }else if(data[i].pc == 'XSCanTho'){
            _XSCanTho.push(item);
        }else if(data[i].pc == 'XSHauGiang'){
            _XSHauGiang.push(item);
        }else if(data[i].pc == 'XSKienGiang'){
            _XSKienGiang.push(item);
        }else if(data[i].pc == 'XSLongAn'){
            _XSLongAn.push(item);
        }else if(data[i].pc == 'XSSocTrang'){
            _XSSocTrang.push(item);
        }else if(data[i].pc == 'XSTayNinh'){
            _XSTayNinh.push(item);
        }else if(data[i].pc == 'XSTienGiang'){
            _XSTienGiang.push(item);
        }else if(data[i].pc == 'XSTPHCM'){
            _XSTPHCM.push(item);
        }else if(data[i].pc == 'XSTraVinh'){
            _XSTraVinh.push(item);
        }else if(data[i].pc == '_XSVinhLong'){
            _XSVinhLong.push(item);
        }else if(data[i].pc == 'XSDaLat'){
            _XSDaLat.push(item);
        }else if(data[i].pc == 'XSDongNai'){
            _XSDongNai.push(item);
        }else if(data[i].pc == 'XSDongThap'){
            _XSDongThap.push(item);
        }
   }
    data_detector_statistic.MB = _MB.reverse(); data_detector_statistic.XSDacNong = _XSDacNong.reverse(); data_detector_statistic.XSDakLak = _XSDakLak.reverse();
    data_detector_statistic.XSGiaLai = _XSGiaLai.reverse(); data_detector_statistic.XSTTH = _XSTTH.reverse();
    data_detector_statistic.XSKhanhHoa = _XSKhanhHoa.reverse(); data_detector_statistic.XSKontum = _XSKontum.reverse(); data_detector_statistic.XSNinhThuan = _XSNinhThuan.reverse();
    data_detector_statistic.XSPhuYen = _XSPhuYen.reverse(); data_detector_statistic.XSQuangBinh = _XSQuangBinh.reverse();
    data_detector_statistic.XSQuangNam = _XSQuangNam.reverse(); data_detector_statistic.XSVungTau = _XSVungTau.reverse(); data_detector_statistic.XSQuangTri = _XSQuangTri.reverse();
    data_detector_statistic.XSDaNang = _XSDaNang.reverse(); data_detector_statistic.XSAnGiang = _XSAnGiang.reverse();
    data_detector_statistic.XSBinhDuong = _XSBinhDuong.reverse(); data_detector_statistic.XSQuangNgai = _XSQuangNgai.reverse(); data_detector_statistic.XSBacLieu = _XSBacLieu.reverse(); 
    data_detector_statistic.XSCanTho = _XSCanTho.reverse(); data_detector_statistic.XSVinhLong = _XSVinhLong.reverse();
    data_detector_statistic.XSKienGiang = _XSKienGiang.reverse(); data_detector_statistic.XSCaMau = _XSCaMau.reverse(); data_detector_statistic.XSTayNinh = _XSTayNinh.reverse(); 
    data_detector_statistic.XSTraVinh = _XSTraVinh.reverse(); data_detector_statistic.XSDaLat = _XSDaLat.reverse();
    data_detector_statistic.XSHauGiang = _XSHauGiang.reverse(); data_detector_statistic.XSBinhPhuoc = _XSBinhPhuoc.reverse(); data_detector_statistic.XSSocTrang = _XSSocTrang.reverse();
    data_detector_statistic.XSTPHCM = _XSTPHCM.reverse(); data_detector_statistic.XSDongNai = _XSDongNai.reverse();
    data_detector_statistic.XSBenTre = _XSBenTre.reverse(); data_detector_statistic.XSLongAn = _XSLongAn.reverse(); data_detector_statistic.XSBinhThuan = _XSBinhThuan.reverse();
    data_detector_statistic.XSTienGiang = _XSTienGiang.reverse(); data_detector_statistic.XSDongThap = _XSDongThap.reverse();
    return data_detector_statistic;
};

export {createArrPushInItem};