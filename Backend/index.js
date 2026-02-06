const http=require("http");
const server=http.createServer((req,res)=>{
    res.write("boom!");
    res.end();
});
server.listen(3000,()=>{
    console.log("server started at 3000");
});