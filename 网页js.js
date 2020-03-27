window.onload = function(){                    
    var nav4 = document.getElementById("nav4");
    var dl = document.getElementById("download");
    nav4.onmouseover = function(){                     //导航栏鼠标下拉函数
        
        dl.className = "show";
    }
    nav4.onmouseout = function(){
        dl.className = "hidden"
    }

    var bannerSrc = document.getElementById("banner");
    var n=0;
    var left = document.getElementById("arrowLeft");
    var right = document.getElementById("arrowRight");
    setInterval(function(){
        n=n+1;
        if(n==1){
            left.style.display = "none";
            right.style.display = "block"; 
        }
        else if(n==4){
            right.style.display = "none"; 
        }
        else if(n==5){
            n=1;
            left.style.display = "none";
            right.style.display = "block"; 
        }
        else{
            right.style.display = "block";
            left.style.display = "block";
        }
        bannerSrc.src = "image/banner" + n + ".jpg";
    },3000)
    
    left.onclick = function(){
        n=n-1;
        if(n==1){
            left.style.display = "none";
            right.style.display = "block";      
        }else{
            left.style.display = "block";
            right.style.display = "block";  
        }
        bannerSrc.src = "image/banner" + n + ".jpg";
    }
    right.onclick = function(){
        n=n+1;
        if(n==4){
            right.style.display = "none";
            left.style.display = "block";
        }else{
            left.style.display = "block";
            right.style.display = "block";  
        }
        bannerSrc.src = "image/banner" + n + ".jpg";
    }

    setInterval(function(){           //获取时间函数
    var T = new Date();    
    var year = T.getFullYear();
    var month = T.getMonth()+1;
    var day = T.getDate();
    var hour = T.getHours();
    var minute = T.getMinutes();
    var second = T.getSeconds();
    var times = document.getElementById("T");
    if(hour < 10){
        if(minute < 10){
            if(second < 10){
                times.innerHTML = year + "年" + month + "月" + day + "日" + "0"+ hour + ":" + "0"+ minute + ":" + "0"+second; 
            }else{
                times.innerHTML = year + "年" + month + "月" + day + "日" + "0"+ hour + ":" + "0"+ minute + ":" +second; 
            }
        }else{
            if(second < 10){
                times.innerHTML = year + "年" + month + "月" + day + "日" + "0"+ hour + ":" + minute + ":" + "0"+second; 
            }else{
                times.innerHTML = year + "年" + month + "月" + day + "日" + "0"+ hour + ":" + minute + ":" +second; 
            }
        }
    }else{
        if(minute < 10){
            if(second < 10){
                times.innerHTML = year + "年" + month + "月" + day + "日" + hour + ":" + "0"+ minute + ":" + "0"+second; 
            }else{
                times.innerHTML = year + "年" + month + "月" + day + "日" + hour + ":" + "0"+ minute + ":" +second; 
            }
        }else{
            if(second < 10){
                times.innerHTML = year + "年" + month + "月" + day + "日" + hour + ":" + minute + ":" + "0"+second; 
            }else{
                times.innerHTML = year + "年" + month + "月" + day + "日" + hour + ":" + minute + ":" +second; 
            }
        }
    }
    },1000)
}