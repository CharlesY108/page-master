export const mockSingleData = {
  "sample_1": {
    //井号
    "JingHao": [
      "陇60-10"
    ],
    //井的基础信息
    "data_formation": [
      {
        //项目组
        "XiangMuZu": "页岩油",
        //井类别
        "JingLeiBie": "一类",
        //任务类型
        "RenWuLeiXing": "完井",
        //项目部
        "XiangMuBu": "一部",
        //施工任务
        "ShigongRenwu": "脱手作业",
        //区块
        "Qukuai": "顺宁",
        //队号
        "Duihao": "川庆40670",
        //钻井当前状态
        "ZuanjingDangqianZhuangtai": "预约固定",
        //设计状态
        "ShejiZhuangtai": "已完成",
        //当日施工井
        "DangriShigongjing": "是"
      }
    ],
    //fx平均值
    "E_fx": 0.61,
    //判定为合格的概率
    "fx": [
      0.2796
    ],
    //预测结果
    "predicted_class": [
      "不合格"
    ],
    //真实结果
    "true_class": [
      "不合格"
    ],
    "shap_values": {
      //尾浆-流性指数
      "WeiJiang_LiuXingZhiShu": -0.27,
      //尾浆-稠度系数
      "WeiJiang_ChouDuXiShu": -0.23,
      //水泥浆用量-尾浆密度
      "ShuiNiJiangYongLiang_WeiJiangMiDu": -0.07,
      //油气侵-水泥浆体系-尾浆名称
      "YouQiQin_ShuiNiJiangTiXi_WeiJiangMingCheng": -1.0,
      //固井前-钻井液性能-密度
      "GuJingQian_ZuanJingYeXingNeng_MiDu": -0.09,
      //溢流-固井方式
      "YiLiu_GuJingFangShi": 0.05,
      //全角变化率
      "QuanJiaoBianHuaLv": 0.03,
      //冲洗液-隔离液-用量
      "ChongXiYe_GeLiYe_YongLiang": 0.0,
      //固井前-钻井液性能-塑性粘度
      "GuJingQian_ZuanJingYeXingNeng_SuXingNianDu": -0.0,
      //井漏-固井方式
      "JingLou_GuJingFangShi": 0.05,
      //油气侵-领浆性能-24h抗压强度
      "YouQiQin_LingJiangXingNeng_24hKangYaQiangDu": -0.34,
      //井别
      "JingBie": 0.01,
      //最大井斜角
      "ZuiDaJingXieJiao": 0.27,
      //油气侵-尾浆性能-24h抗压强度
      "YouQiQin_WeiJiangXingNeng_24hKangYaQiangDu": -0.24,
      //钻头套管尺寸
      "ZuanTouTaoGuanChiCun": -0.05,
      //领浆-稠度系数
      "LingJiang_ChouDuXiShu": 0.04,
      //油气侵-尾浆性能-A值
      "YouQiQin_WeiJiangXingNeng_AZhi": 0.27,
      //水泥浆用量-领浆密度
      "ShuiNiJiangYongLiang_LingJiangMiDu": 0.01
    },
    "data_raw": [
      {
        //尾浆-流性指数
        "WeiJiang_LiuXingZhiShu": 0.43,
        //尾浆-稠度系数
        "WeiJiang_ChouDuXiShu": 4.37,
        //水泥浆用量-尾浆密度
        "ShuiNiJiangYongLiang_WeiJiangMiDu": 1.85,
        //油气侵-水泥浆体系-尾浆名称
        "YouQiQin_ShuiNiJiangTiXi_WeiJiangMingCheng": "气井尾浆",
        //固井前-钻井液性能-密度
        "GuJingQian_ZuanJingYeXingNeng_MiDu": 1.28,
        //溢流-固井方式
        "YiLiu_GuJingFangShi": "常规固井",
        //全角变化率
        "QuanJiaoBianHuaLv": 4.73,
        //冲洗液-隔离液-用量
        "ChongXiYe_GeLiYe_YongLiang": 10000,
        //固井前-钻井液性能-塑性粘度
        "GuJingQian_ZuanJingYeXingNeng_SuXingNianDu": 56,
        //井漏-固井方式
        "JingLou_GuJingFangShi": "一次上返+补救",
        //油气侵-领浆性能-24h抗压强度
        "YouQiQin_LingJiangXingNeng_24hKangYaQiangDu": 7.8,
        //井别
        "JingBie": "气评",
        //最大井斜角
        "ZuiDaJingXieJiao": 16.2,
        //油气侵-尾浆性能-24h抗压强度
        "YouQiQin_WeiJiangXingNeng_24hKangYaQiangDu": 29.6,
        //钻头套管尺寸
        "ZuanTouTaoGuanChiCun": 76.2,
        //领浆-稠度系数
        "LingJiang_ChouDuXiShu": 1.96,
        //油气侵-尾浆性能-A值
        "YouQiQin_WeiJiangXingNeng_AZhi": 0.03,
        //水泥浆用量-领浆密度
        "ShuiNiJiangYongLiang_LingJiangMiDu": 1.5
      }
    ]
  },
}