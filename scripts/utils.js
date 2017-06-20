/**
 * Created by Administrator on 2017/6/19.
 */

/*创建异步请求*/
function createRequest() {
    try{
        request=new XMLHttpRequest();
    }catch(tryMS){
        try{
            request=new ActiveXObject("Msxml2.XMLHTTP");
        }catch (otherMS){
            try{
                request=new ActiveXObject("Microsoft.XMLHTTP");
            }catch (failed){
                request=null;
            }
        }
    }
    return request;
}

