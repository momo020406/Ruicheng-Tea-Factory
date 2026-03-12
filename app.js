<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Tea Garden Dashboard Templates</title>
<style>

body{
font-family:Microsoft JhengHei;
background:#CDEDC7;
text-align:center;
padding:50px;
}

h1{
font-size:42px;
}

.grid{

display:grid;
grid-template-columns:repeat(2,1fr);
gap:20px;
max-width:600px;
margin:auto;

}

.card{

background:white;
padding:30px;
border-radius:20px;
cursor:pointer;
font-size:22px;
box-shadow:0 5px 15px rgba(0,0,0,.1);

}

.card:hover{
transform:scale(1.05);
}

</style>
</head>

<body>

<h1>瑞成智慧茶園 Dashboard</h1>

<div class="grid">

<div class="card" onclick="location='template1.html'">
🌍 Polar Soil Radar
</div>

<div class="card" onclick="location='template2.html'">
🔺 NPK Triangle
</div>

<div class="card" onclick="location='template3.html'">
🔥 Moisture Heatmap
</div>

<div class="card" onclick="location='template4.html'">
⚡ Soil Health Gauge
</div>

<div class="card" onclick="location='template5.html'">
🌱 Root Zone Profile
</div>

</div>

</body>
</html>