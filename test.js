var logger = function(){
    var oldConsoleLog = null
    var pub = {}

    pub.enableLogger =  function enableLogger() 
                        {
                            if(oldConsoleLog == null){
                                return
                            }

                            window['console']['error'] = oldConsoleLog;
                        }

    pub.disableLogger = function disableLogger()
                        {
                            oldConsoleLog = console.error;
                            window['console']['error'] = function() {};
                        }

    return pub
}()

function test(){
    logger.disableLogger()
    let array = new Array()
    let x = 0
    let y = 0
    dzielenie(1)                    == false    ? (console.log("dzielenie(1)                 wyszło"), x++) : (console.error("dzielenie(1)                 nie wyszło"), y++)
    dzielenie(4)                    == true     ? (console.log("dzielenie(4)                 wyszło"), x++) : (console.error("dzielenie(4)                 nie wyszło"), y++)
    dzielenie(2)                    == true     ? (console.log("dzielenie(2)                 wyszło"), x++) : (console.error("dzielenie(2)                 nie wyszło"), y++)
    dzielenie(10, 5)                == true     ? (console.log("dzielenie(10, 5)             wyszło"), x++) : (console.error("dzielenie(10, 5)             nie wyszło"), y++)
    dzielenie(7, 6)                 == false    ? (console.log("dzielenie(7, 6)              wyszło"), x++) : (console.error("dzielenie(7, 6)              nie wyszło"), y++)
    dzielenie("safjisad")           == null     ? (console.log("dzielenie(\"safjisad\")        wyszło"), x++) : (console.error("dzielenie(\"safjisad\")        nie wyszło"), y++)
    dzielenie("2")                  == true     ? (console.log("dzielenie(\"2\")               wyszło"), x++) : (console.error("dzielenie(\"2\")               nie wyszło"), y++)
    dzielenie(9, 4.5)               == true     ? (console.log("dzielenie(9, 4.5)            wyszło"), x++) : (console.error("dzielenie(9, 4.5)            nie wyszło"), y++)
    dzielenie(9, 3.5)               == false    ? (console.log("dzielenie(9, 3.5)            wyszło"), x++) : (console.error("dzielenie(9, 3.5)            nie wyszło"), y++)
    dzielenie(88888888888888890)    == null     ? (console.log("dzielenie(88888888888888890) wyszło"), x++) : (console.error("dzielenie(88888888888888890) nie wyszło"), y++)
    array["good"]   = x
    array["bad"]    = y
    array["total"]   = x+y
    console.table(array)
    logger.enableLogger()
}