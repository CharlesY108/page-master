export const fieldMapping = {
  WeiJiang_LiuXingZhiShu: '尾浆-流性指数',
  WeiJiang_ChouDuXiShu: '尾浆-稠度系数',
  ShuiNiJiangYongLiang_WeiJiangMiDu: '水泥浆用量-尾浆密度',
  YouQiQin_ShuiNiJiangTiXi_WeiJiangMingCheng: '油气侵-水泥浆体系-尾浆名称',
  GuJingQian_ZuanJingYeXingNeng_MiDu: '固井前-钻井液性能-密度',
  YiLiu_GuJingFangShi: '溢流-固井方式',
  QuanJiaoBianHuaLv: '全角变化率',
  ChongXiYe_GeLiYe_YongLiang: '冲洗液＋隔离液-用量',
  GuJingQian_ZuanJingYeXingNeng_SuXingNianDu: '固井前-钻井液性能-塑性粘度',
  JingLou_GuJingFangShi: '井漏-固井方式',
  YouQiQin_LingJiangXingNeng_24hKangYaQiangDu: '油气侵-领浆性能-24h抗压强度',
  JingBie: '井别',
  ZuiDaJingXieJiao: '最大井斜角',
  YouQiQin_WeiJiangXingNeng_24hKangYaQiangDu: '油气侵-尾浆性能-24h抗压强度',
  ZuanTouTaoGuanChiCun: '钻头套管尺寸',
  LingJiang_ChouDuXiShu: '领浆-稠度系数',
  YouQiQin_WeiJiangXingNeng_AZhi: '油气侵-尾浆性能-A值',
  ShuiNiJiangYongLiang_LingJiangMiDu: '水泥浆用量-领浆密度',
  YouQiQin_WeiJiangXingNeng_SPNZhi: '油气侵-尾浆性能-SPN值',
  JingLou_ChengYaNengLi_GuanZhuDianLouShiDangLiangMiDu: '井漏-承压能力-关注点漏失当量密度',
  JingJingKuoDaLv: '井径扩大率',
  ZhongJiang: '中浆用量',
  YouQiQin_LingJiangXingNeng_AZhi: '油气侵-领浆性能-A值',
  TaoGuanJuZhongDu: '套管居中度',
  JingXing: '井型',
  YouQiQin_ShuiNiJiangTiXi_LingJiangMingCheng: '油气侵-水泥浆体系-领浆名称',
  LingJiang_LiuXingZhiShu: '领浆-流性指数',
  ShuiNiJiangYongLiang_LingJiang: '水泥浆用量-领浆',
  ShuiNiJiangYongLiang_WeiJiang: '水泥浆用量-尾浆',
  YouQiQin_LingJiangXingNeng_SPNZhi: '油气侵-领浆性能-SPN值'
}

// 井基础信息
export const wellBaseInfoMapping = {
  XiangMuZu: '项目组',
  JingLeiBie: '井类别',
  RenWuLeiXing: '任务类型',
  XiangMuBu: '项目部',
  ShigongRenwu: '施工任务',
  Qukuai: '区块',
  Duihao: '队号',
  ZuanjingDangqianZhuangtai: '钻井当前状态',
  ShejiZhuangtai: '设计状态',
  DangriShigongjing: '当日施工井'
}

// 具体指标-二级指标得分
export const jtzbScoreMapping = {
  RuJingLiuTiShiYan_ShuiNiJiangChouHuaFuJiaShiJian: '入井流体试验-水泥浆稠化附加时间',
  RuJingLiuTiShiYan_ChuShiChouDu: '入井流体试验-初始稠度',
  RuJingLiuTiShiYan_ShuiNiShi24HKangYaQiangDu: '入井流体试验-水泥石24h抗压强度',
  RuJingLiuTiShiYan_ShuiNiJiangJingZhiHouShangXiaMiDuCha: '入井流体试验-水泥浆静止后上下密度差',
  JingYanTiaoJian_HuanKongShangFanSuDu: '井眼条件-环空上返速度',
  JingYanTiaoJian_ZuanJingYeXunHuanZhouCi: '井眼条件-钻井液循环周次',
  JingYanTiaoJian_JinChuKouMiDuCha: '井眼条件-进出口密度差',
  JingYanTiaoJian_ShangCuanSuDu: '井眼条件-上窜速度',
  JingYanTiaoJian_GuJingQianZuanJingYeSuXingNianDu: '井眼条件-固井前钻井液塑性粘度',
  JingYanTiaoJian_ZuanTou_TaoGuanChiCun_HuanKongJianXi: '井眼条件-钻头套管尺寸环空间隙',
  JingYanTiaoJian_JingJingKuoDaLv: '井眼条件-井径扩大率',
  XiaTaoGuan_TaoGuanJuZhongDu: '下套管-套管居中度',
  XiaTaoGuan_RenGongJingDiJuYouCengDiJie: '下套管-人工井底距油层底界',
  XiaTaoGuan_YouJingZuLiuHuanYuFuXieJianJu: '下套管-油层阻流环与扶鞋间距',
  GuJingShiGong_QianZhiYeTiJiLiangZhanLuoYanHuanKongGaoDu: '固井施工-前置液体积量占裸眼环空高度',
  GuJingShiGong_QianZhiYeWenLiuJieChuShiJian: '固井施工-前置液紊流接触时间',
  GuJingShiGong_JiangZhuMiDuCha: '固井施工-浆柱密度差',
  GuJingShiGong_GeLiYeZaiXunHuanWenDuXia_DongSuBi: '固井施工-隔离液在循环温度下动塑比',
  GuJingShiGong_GeLiYeLvShiLiang: '固井施工-隔离液流失量',
  GuJingShiGong_ShuiNiJiangMiDuJiLuPianCha: '固井施工-水泥浆密度记录偏差',
  GuJingShiGong_CeLiangJiLuJianGe: '固井施工-测量记录间隔',
  GuJingShiGong_ZhongTingShiJian: '固井施工-中停时间',
  GuJingShiGong_ShiGongCanShuJiLu_PaiLiang_YaLi_ShuiNiJiangMiDu_ZhuRuLiangDeng: '固井施工-施工参数记录(排量、压力、水泥浆密度、注入量等)',
  GuJingShiGong_ZhuShuiNiJiangLiang_BengZhuPaiLiangFuHeSheJiYaoQiu: '固井施工-注水泥浆量/泵注排量符合设计要求',
  GuJingShiGong_JiaoSaiRuJing: '固井施工-胶塞入井',
  GuJingShiGong_TiLiangFuHeGuJingShiGongSheJiYaoQiu: '固井施工-替量符合固井施工设计要求',
  GuJingShiGong_DingTiGuoChengLianXu: '固井施工-顶替过程连续',
  GuJingShiGong_YaLiYouJianKongJiLu: '固井施工-压力有监控记录',
  GuJingShiGong_PaiLiangYouJianKongJiLu: '固井施工-排量有监控记录',
  GuJingShiGong_JingKouFanChuQingKuangYouJianKongJiLu: '固井施工-井口返出情况有监控记录',
  GuJingShiGong_PengYa: '固井施工-碰压',
  GuJingShiGong_WuPengYaXianXiang_DingTiLiangSheJiDingTiLiang: '固井施工-无碰压现象/顶替量设计顶替量',
  GuJingShiGong_XiaoPaiLiangPengYa_PengYaFuJiaZhi: '固井施工-小排量碰压/碰压附加值',
  GuJingShiGong_XiaJiaoSaiQingShuiJingYaChuanTouYaLi: '固井施工-下胶塞清水顶压/蹿头压力',
  ShuiNiJiangFanGao_BiaoCengTaoGuan: '水泥浆返高-表层套管',
  ShuiNiJiangFanGao_JiShuTaoGuan: '水泥浆返高-技术套管',
  ShuiNiJiangFanGao_ShengChanTaoGuan: '水泥浆返高-生产套管'
}

// 一级指标得分
export const yjzbScoreMapping = {
  RuJingLiuTiShiYan: '入井流体试验',
  JingYanTiaoJian: '井眼条件',
  XiaTaoGuan: '下套管',
  GuJingShiGong: '固井施工',
  ShuiNiJiangFanGao: '水泥浆返高'
}

// 特征重要度
export const featureTreeOrigin = [
  {
    name: '井身结构',
    key: 'JingShenJieGou',
    children: [
      {
        name: '井型',
        key: 'JingXing'
      },
      {
        name: '井别',
        key: 'JingBie'
      },
      {
        name: '钻头套管尺寸',
        key: 'ZuanTouTaoGuanChiCun'
      }
    ]
  },
  {
    name: '复杂地质条件',
    key: 'FuZaDiZhiTiaoJian',
    children: [
      {
        name: '井漏-固井方式',
        key: 'JingLou_GuJingFangShi'
      },
      {
        name: '井漏-承压能力-关堵点漏失当量密度',
        key: 'JingLou_ChengYaNengLi_GuanDuDianLouShiDangLiangMiDu'
      },
      {
        name: '溢流-固井方式',
        key: 'YiLiu_GuJingFangShi'
      },
      {
        name: '油气侵-水泥浆体系-领浆名称',
        key: 'YouQiQin_ShuiNiJiangTiXi_LingJiangMingCheng'
      },
      {
        name: '油气侵-水泥浆体系-尾浆名称',
        key: 'YouQiQin_ShuiNiJiangTiXi_WeiJiangMingCheng'
      },
      {
        name: '油气侵-领浆性能-24h抗压强度',
        key: 'YouQiQin_LingJiangXingNeng_24hKangYaQiangDu'
      },
      {
        name: '油气侵-领浆性能-A值',
        key: 'YouQiQin_LingJiangXingNeng_AZhi'
      },
      {
        name: '油气侵-领浆性能-SPN值',
        key: 'YouQiQin_LingJiangXingNeng_SPNzhi'
      },
      {
        name: '油气侵-尾浆性能-24h抗压强度',
        key: 'YouQiQin_WeiJiangXingNeng_24hKangYaQiangDu'
      },
      {
        name: '油气侵-尾浆性能-A值',
        key: 'YouQiQin_WeiJiangXingNeng_AZhi'
      },
      {
        name: '油气侵-尾浆性能-SPN值',
        key: 'YouQiQin_WeiJiangXingNeng_SPNzhi'
      }
    ]
  },
  {
    name: '固井工艺',
    key: 'GuJingGongYi',
    children: [
      {
        name: '通井-钻具组合',
        key: 'TongJing_ZuanJuZuHe'
      },
      {
        name: '通井-次数',
        key: 'TongJing_CiShu'
      },
      {
        name: '冲洗液-隔离液-用量',
        key: 'ChongXiYe_GeLiYe_YongLiang'
      },
      {
        name: '套管居中度',
        key: 'TaoGuanJuZhongDu'
      }
    ]
  },
  {
    name: '水泥浆设计',
    key: 'ShuiNiJiangSheJi',
    children: [
      {
        name: '水泥浆用量-领浆密度',
        key: 'ShuiNiJiangYongLiang_LingJiangMiDu'
      },
      {
        name: '水泥浆用量-领浆',
        key: 'ShuiNiJiangYongLiang_LingJiang'
      },
      {
        name: '水泥浆用量-尾浆密度',
        key: 'ShuiNiJiangYongLiang_WeiJiangMiDu'
      },
      {
        name: '水泥浆用量-尾浆',
        key: 'ShuiNiJiangYongLiang_WeiJiang'
      },
      {
        name: '领浆-流性指数',
        key: 'LingJiang_LiuXingZhiShu'
      },
      {
        name: '领浆-稠度系数',
        key: 'LingJiang_ChouDuXiShu'
      },
      {
        name: '尾浆-流性指数',
        key: 'WeiJiang_LiuXingZhiShu'
      },
      {
        name: '尾浆-稠度系数',
        key: 'WeiJiang_ChouDuXiShu'
      }
    ]
  },
  {
    name: '井眼条件',
    key: 'JingYanTiaoJian',
    children: [
      {
        name: '最大井斜角',
        key: 'ZuiDaJingXieJiao'
      },
      {
        name: '全角变化率',
        key: 'QuanJiaoBianHuaLv'
      },
      {
        name: '井径扩大率',
        key: 'JingJingKuoDaLv'
      }
    ]
  },
  {
    name: '钻井液性能',
    key: 'ZhuanJingYeXingNeng',
    children: [
      {
        name: '固井前-钻井液性能-密度',
        key: 'GuJingQian_ZuanJingYeXingNeng_MiDu'
      },
      {
        name: '固井前-钻井液性能-塑性粘度',
        key: 'GuJingQian_ZuanJingYeXingNeng_SuXingNianDu'
      }
    ]
  }
]
