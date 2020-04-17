const fs = require("fs");
const { remote } = require("electron");
const { dialog } = require("electron").remote;
window.selectFile = () => {
  return new Promise((resolve, reject) => {
    utools.hideMainWindow();
    dialog
      .showOpenDialog({
        title: "请选择数据文件",
        defaultPath: utools.getPath("downloads"),
        buttonLabel: "导入",
        properties: ["openFile"],
        filters: [{ name: "db", extensions: ["db"] }],
      })
      .then((res) => {
        console.log(res);
        if (res.canceled || res.filePaths.length === 0) {
          resolve([]);
        }
        utools.showMainWindow();
        resolve(res.filePaths);
      })
      .catch((err) => {
        console.log(err);
        utools.showMainWindow();
      });
  });
};
window.fs = fs;
window.readData = () => {
  const filebuffer = fs.readFileSync(
    utools.getPath("desktop") + "/test.sqlite"
  );
  return new Uint8Array(toArrayBuffer(filebuffer));
};
function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}
window.toBuffer = (ab) => {
  var buf = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
};
