module.exports = {
  name: "zz_alarm_record_current",
  fields: [
    {
      propertyName: "stnm",
      comment: "测站名称"
    },
    {
      propertyName: "createTm",
      comment: "预警触发时间"
    },
    {
      propertyName: "updateTm",
      comment: "预警更新时间"
    },
    {
      propertyName: "z",
      comment: "当前水位值"
    },
    {
      propertyName: "level",
      comment: "预警等级"
    },
    {
      propertyName: "r12",
      comment: "12小时雨量"
    },
    {
      propertyName: "r24",
      comment: "24小时雨量"
    },
    {
      propertyName: "ignore",
      comment: "忽略预警提示时间"
    },
    {
      propertyName: "nt",
      comment: "备注"
    }
  ],
  key: {
    propertyName: "id",
    comment: "主键"
  }
};
