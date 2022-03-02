const chokidar = require('chokidar');
const fs = require('fs');

//One-liner for current directory
test_site1 = "D:\\watcher_testing_site1";
test_site2 = "F:\\tester_watching_site2";

const watcher = chokidar.watch(test_site1,{
  persistent:true,
  ignoreInitial:false // ignores files on load
})

//ready
watcher.on('ready', () =>{
  console.log('Ready to rip')
})

//add
watcher.on('add', path =>{
  console.log(path, 'filepath.......'),
  sendpath = path.replace(test_site1,''),
  console.log(sendpath)
  fs.copyFile(path, test_site2+sendpath, (err) => {
    if (err) throw err;
  });
})

//deletes
watcher.on('unlink', path =>{
  console.log(path, 'file removed.......')
  sendpath = path.replace(test_site1,''),
  console.log(sendpath)
  fs.unlink(test_site2+sendpath, (err) => {
    if (err) throw err;
  });
})

//changed
watcher.on('change', path =>{
  console.log(path, 'file changed.......'),
  sendpath = path.replace(test_site1,''),
  console.log(sendpath)
  fs.copyFile(path, test_site2+sendpath, (err) => {
    if (err) throw err;
  });
})

watcher.on('addDir', path =>{
  console.log(path, 'directory created'),
  sendpath = path.replace(test_site1,''),
  console.log(sendpath)
  fs.mkdir(test_site2+sendpath, { recursive: true } ,(err) => {
    if (err) throw err;
    console.log('sent');
  });
})

watcher.on('unlinkDir', path =>{
  console.log(path, 'directory removed'),
  sendpath = path.replace(test_site1,''),
  console.log(sendpath)
  fs.rmdir(test_site2+sendpath, { recursive: true },(err) => {
    if (err) throw err;
  });
})



//error handling

watcher.on('error',error =>{
  console.log(error)
})

//watcher.close().then(() => console.log('closed'));