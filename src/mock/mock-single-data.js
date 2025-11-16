export const mockSingleData = {
  sample_1: {
    JingHao: [
      '白465-471-8'
    ],
    data_formation: [
      {
        XiangMuZu: '页岩油',
        JingLeiBie: '一类',
        RenWuLeiXing: '完井',
        XiangMuBu: '一部',
        ShigongRenwu: null,
        Qukuai: null,
        Duihao: null,
        ZuanjingDangqianZhuangtai: null,
        ShejiZhuangtai: null,
        DangriShigongjing: null
      }
    ],
    E_fx: 0.61,
    // 预测为合格的概率，概率越低，说明越不可能预测为合格
    fx: [
      0.28
    ],
    // 预测结果
    predicted_class: [
      '不合格'
    ],
    // 实际结果
    true_class: [
      '不合格'
    ],
    shap_values: {
      WeiJiang_LiuXingZhiShu: -0.27,
      WeiJiang_ChouDuXiShu: -0.23,
      ShuiNiJiangYongLiang_WeiJiangMiDu: -0.07,
      YouQiQin_ShuiNiJiangTiXi_WeiJiangMingCheng: -1.0,
      GuJingQian_ZuanJingYeXingNeng_MiDu: -0.09,
      YiLiu_GuJingFangShi: 0.05,
      QuanJiaoBianHuaLv: 0.03,
      ChongXiYe_GeLiYe_YongLiang: 0.0,
      GuJingQian_ZuanJingYeXingNeng_SuXingNianDu: -0.0,
      JingLou_GuJingFangShi: 0.05,
      YouQiQin_LingJiangXingNeng_24hKangYaQiangDu: -0.34,
      JingBie: 0.01,
      ZuiDaJingXieJiao: 0.27,
      YouQiQin_WeiJiangXingNeng_24hKangYaQiangDu: -0.24,
      ZuanTouTaoGuanChiCun: -0.05,
      LingJiang_ChouDuXiShu: 0.04,
      YouQiQin_WeiJiangXingNeng_AZhi: 0.27,
      ShuiNiJiangYongLiang_LingJiangMiDu: 0.01
    },
    data_raw: [
      {
        WeiJiang_LiuXingZhiShu: 0.49,
        WeiJiang_ChouDuXiShu: 2.78,
        ShuiNiJiangYongLiang_WeiJiangMiDu: 1.9,
        GuJingQian_ZuanJingYeXingNeng_MiDu: 1.08,
        QuanJiaoBianHuaLv: 5.86,
        YouQiQin_LingJiangXingNeng_24hKangYaQiangDu: 4.2,
        ZuiDaJingXieJiao: 29.48,
        YouQiQin_WeiJiangXingNeng_24hKangYaQiangDu: 28.6,
        ZuanTouTaoGuanChiCun: 82.5,
        LingJiang_ChouDuXiShu: 4.0,
        YouQiQin_WeiJiangXingNeng_AZhi: 0.03,
        ShuiNiJiangYongLiang_LingJiangMiDu: 1.18
      }
    ]
  }
}
