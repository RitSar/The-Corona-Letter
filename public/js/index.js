var jsonInd;
$(function(){$.getJSON("/jsonworld",function(b){var f=0;$.each(b.countries_stat,function(b,d){"India"==d.country_name&&($(".x").text(d.cases),$(".y").text(d.total_recovered),$(".z").text(d.deaths));$("<tr><td>"+d.country_name+"</td><td>"+d.cases+"</td><td>"+d.total_recovered+"</td><td>"+d.deaths+"</td></tr>").appendTo("#userdata tbody");f++});$(".a").text(b.world_total.total_cases);$(".b").text(b.world_total.total_recovered);$(".c").text(b.world_total.total_deaths);$(".d").text(b.world_total.new_cases);$(".e").text(f-
3);$(".f").text(b.world_total.new_deaths)});$.getJSON("/jsonindia",function(b){jsonInd=b;$.each(b.state_wise,function(b,e){$("<tr class='here' id="+e.statecode+"><td >"+e.state+"</td><td>"+e.confirmed+"</td><td>"+e.recovered+"</td><td>"+e.deaths+"</td></tr>").appendTo("#indiadata tbody")})})});
$(document).ready(function(){$(document).on("click",".here",function(a){var b=this.id;$(".slot").slideUp();setTimeout(function(){$(".contain").empty();$.each(jsonInd.state_wise,function(a,c){b==c.statecode&&($(".slotText").text(c.state),$.each(c.district,function(a,b){$("<div class = 'col-4'>"+a+"<p class='text-warning'>Cases: "+b.confirmed+"</p></div>").appendTo("#toAdd")}))});$(".slot").slideDown()},500)});var b=[],f=[],e=[],d=[],g=[],w=[],x=[],y=[],l,m,n;$.getJSON("https://covidapi.info/api/v1/global/count",
function(a){var v=0;$.each(a.result,function(a,c){0<v&&(w.push(c.confirmed-l),x.push(c.deaths-m),y.push(c.recovered-n),g.push(a.substring(5)));b.push(a.substring(5));l=c.confirmed;f.push(l);m=c.deaths;e.push(m);n=c.recovered;d.push(n);v++})});$(".charts").hide();var p=0;$(".visuals").on("click",function(){if(0==p){$(".charts").show();p=1;Chart.defaults.global.defaultFontColor="white";var a=document.getElementById("myCaseChart").getContext("2d");new Chart(a,{type:"line",data:{labels:b,datasets:[{label:"Number of Cases",
data:f,backgroundColor:"rgba(240, 173, 78,0.5)",borderColor:"rgba(240, 173, 78,1)",borderWidth:1,borderDash:[5,5]}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}});a=document.getElementById("myDeathChart").getContext("2d");new Chart(a,{type:"line",data:{labels:b,datasets:[{label:"Number of Deaths",data:e,backgroundColor:"rgba(217, 83, 79, 0.5)",borderColor:"rgba(217, 83, 79,1)",borderWidth:1,borderDash:[5,5]}]},options:{responsive:!0,maintainAspectRatio:!1,
scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}});a=document.getElementById("myRecoverChart").getContext("2d");new Chart(a,{type:"line",data:{labels:b,datasets:[{label:"Number of Recoveries",data:d,backgroundColor:"rgba(92, 184, 92,0.5)",borderColor:"rgba(92, 184, 92,1)",borderWidth:1,borderDash:[5,5]}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}});a=document.getElementById("myNewCaseChart").getContext("2d");new Chart(a,{type:"bar",data:{labels:g,datasets:[{label:"Number of New Cases per day",
data:w,backgroundColor:"rgba(240, 173, 78,0.5)",borderColor:"rgba(240, 173, 78,1)",borderWidth:1,borderDash:[5,5]}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}});a=document.getElementById("myNewDeathChart").getContext("2d");new Chart(a,{type:"bar",data:{labels:g,datasets:[{label:"Number of New Deaths per day",data:x,backgroundColor:"rgba(217, 83, 79,0.5)",borderColor:"rgba(217, 83, 79,1)",borderWidth:1,borderDash:[5,5]}]},options:{responsive:!0,maintainAspectRatio:!1,
scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}});a=document.getElementById("myNewRecoverChart").getContext("2d");new Chart(a,{type:"bar",data:{labels:g,datasets:[{label:"Number of New Recoveries per day",data:y,backgroundColor:"rgba(92, 184, 92,0.5)",borderColor:"rgba(92, 184, 92,1)",borderWidth:1,borderDash:[5,5]}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}})}else p=0,$(".charts").hide()});var z=[],A=[],B=[],C=[],D=[],E=[],h=[],k=[],q,r,t;$.getJSON("https://covidapi.info/api/v1/country/IND",
function(a){var b=0;$.each(a.result,function(a,c){23==c.recovered&&(c.deaths=6);0<b&&(C.push(c.confirmed-q),D.push(c.deaths-r),E.push(c.recovered-t),h.push(a.substring(5)));k.push(a.substring(5));q=c.confirmed;r=c.deaths;t=c.recovered;b++;z.push(q);A.push(r);B.push(t)})});$(".chartsIndia").hide();var u=0;$(".visualsIndia").on("click",function(){if(0==u){$(".chartsIndia").show();u=1;Chart.defaults.global.defaultFontColor="white";var a=document.getElementById("indiaCaseChart").getContext("2d");new Chart(a,
{type:"line",data:{labels:k,datasets:[{label:"Number of Cases",data:z,backgroundColor:"rgba(240, 173, 78,0.5)",borderColor:"rgba(240, 173, 78,1)",borderWidth:1,borderDash:[5,5]}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}});a=document.getElementById("indiaDeathChart").getContext("2d");new Chart(a,{type:"line",data:{labels:k,datasets:[{label:"Number of Deaths",data:A,backgroundColor:"rgba(217, 83, 79, 0.5)",borderColor:"rgba(217, 83, 79,1)",borderWidth:1,
borderDash:[5,5]}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}});a=document.getElementById("indiaRecoverChart").getContext("2d");new Chart(a,{type:"line",data:{labels:k,datasets:[{label:"Number of Recoveries",data:B,backgroundColor:"rgba(92, 184, 92,0.5)",borderColor:"rgba(92, 184, 92,1)",borderWidth:1,borderDash:[5,5]}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}});a=document.getElementById("indiaNewCaseChart").getContext("2d");
new Chart(a,{type:"bar",data:{labels:h,datasets:[{label:"Number of New Cases per day",data:C,backgroundColor:"rgba(240, 173, 78,0.5)",borderColor:"rgba(240, 173, 78,1)",borderWidth:1,borderDash:[5,5]}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}});a=document.getElementById("indiaNewDeathChart").getContext("2d");new Chart(a,{type:"bar",data:{labels:h,datasets:[{label:"Number of New Deaths per day",data:D,backgroundColor:"rgba(217, 83, 79,0.5)",borderColor:"rgba(217, 83, 79,1)",
borderWidth:1,borderDash:[5,5]}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}});a=document.getElementById("indiaNewRecoverChart").getContext("2d");new Chart(a,{type:"bar",data:{labels:h,datasets:[{label:"Number of New Recoveries per day",data:E,backgroundColor:"rgba(92, 184, 92,0.5)",borderColor:"rgba(92, 184, 92,1)",borderWidth:1,borderDash:[5,5]}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}})}else u=0,$(".chartsIndia").hide()})});
$(document).ready(function(){var b=new Date,b=b.getHours()+":"+b.getMinutes()+":"+b.getSeconds();console.log(b);$(".currentTime").html(b)});
