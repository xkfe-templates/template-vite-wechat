/** 为 getApp 提供模块化导出，避免出现 '无法重新声明块范围变量“app”。ts(2451) ' 错误*/
export default getApp<App.AppOption>()
