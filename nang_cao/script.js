//id ngẫu nhiên

function uuid() {
    return Math.floor(Math.random() * 1000);
}

//thêm vào
let count = 0;
function handerSave() {
    let player = JSON.parse(localStorage.getItem("players")) || [];
    let val = document.getElementById("text").value;
    let obj = {
        id: uuid(),
        name: val,
        count: count
    }
    if (val) {//điều kiện để khi input trống sẽ ko thêm mới
        player.push(obj)
        localStorage.setItem("players", JSON.stringify(player))
    }
    document.getElementById("text").value = "";
    handerAdd()
    total()
    // console.log(player);
}

// thêm vào list

function handerAdd() {
    let data = JSON.parse(localStorage.getItem("players")) || [];
    let p = "";
    for (let i = 0; i < data.length; i++) {
        p += `
        <div class="col">
            <div class="close">
                <span onClick="handerDelete(${data[i].id})" class="material-symbols-outlined">
                close
                </span>
            </div>
            <div class="crown">
                <img src="./crown_773634.png"  alt="">
            </div>
            <div class="title">
                <p>${data[i].name}</p>
            </div>
            <div class="quantity">
                <button onClick="handerDown(${data[i].id})" id="down">-</button>
                <span id="score">${data[i].count}</span>
                <button onClick="handerUp(${data[i].id})" id="btn_up">+</button>
            </div>
        </div>
            `
    }
    document.getElementsByClassName("center")[0].innerHTML = p;
}
handerAdd()

///xóa

function handerDelete(id) {
    let dele = JSON.parse(localStorage.getItem("players")) || [];
    let confirmDelete = confirm("bạn có muốn xoá hay không?");
    if (confirmDelete) {
        for (let i = 0; i < dele.length; i++) {
            if (dele[i].id == id) {
                //xóa trong mảng
                dele.splice(i, 1);
                // console.log(dele);
                //lưu vào local
                localStorage.setItem("players", JSON.stringify(dele));
                handerAdd();
            }
        }
    }
    total()
}



//cộng điểm 

function handerUp(id) {
    // count++
    // console.log(count);
    let up = JSON.parse(localStorage.getItem("players")) || [];
    for (let i = 0; i < up.length; i++) {
        if (up[i].id == id) {
            up[i].count = ++up[i].count;
            localStorage.setItem("players", JSON.stringify(up));
            handerSave()
        }
    } total()
}
handerUp()

// trừ điểm

function handerDown(id) {
    let down = JSON.parse(localStorage.getItem("players")) || [];
    for (let i = 0; i < down.length; i++) {
        if (down[i].id == id && down[i].count > 0) {
            down[i].count = --down[i].count;
            localStorage.setItem("players", JSON.stringify(down));
            handerSave()
        }
    }
    total()
}
handerDown()

//tổng điểm và số người chơi

function total() {
    let number = JSON.parse(localStorage.getItem("players")) || [];
    let sumPlayer = number.length;
    let total = 0;
    for (let i = 0; i < number.length; i++) {
        //tính tổng các phần tử dùng +=
        total += number[i].count
    }
    //console.log(total);
    document.getElementById("sum").innerHTML = sumPlayer;
    document.getElementById("total").innerHTML = total
}
total()

// đếm thời gian



function myTimer() {
    setInterval(() => {
        document.getElementById("time").innerHTML = ++document.getElementById("time").innerHTML
    }, 1000)
}

function myStopFunction() {
    clearInterval(myTimer);
    document.getElementById("time").innerHTML = "0"
}
