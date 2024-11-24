window.onload = function(){
    var xhttp = new XMLHttpRequest();
 xhttp.open('GET','http://127.0.0.1:8080/data/data.json', true);
 xhttp.send();
 xhttp.onload = function(){
    if(this.status==200){
     let data = JSON.parse(this.responseText);
     let hobbies=data.hobbies;
    document.getElementsByClassName("football")[0].innerHTML=hobbies[0];
    document.getElementsByClassName("reading")[0].innerHTML=hobbies[1];
    document.getElementsByClassName("travelling")[0].innerHTML=hobbies[2];
    }
 }
 async function getData() {
    try {
        const response = await fetch('http://127.0.0.1:8080/data/data.json'); // Запит на сер
        if (!response.ok) throw new Error('Помилка при завантаженні даних');
        const data = await response.json(); // Перетворення JSON у JavaScript об'єкт
        document.getElementsByClassName("john")[0].innerHTML=data.name;
        document.getElementsByClassName("parker")[0].innerHTML=data.surname;
        } catch (error) {
        console.error('Помилка під час отримання даних:', error);
        }
 }
 getData();
 }
 $(function(){
    var arrows=$('.show-hide-main');
    var paths=$('.show-hide-main path');
    var up='bi-chevron-up';
    var down='bi-chevron-down';
    var d_up='M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z';
    var d_down='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z';
    var drop_downs = $('.drop-down');
    arrows.each(function(index) {
        $(this).click(function() {
            drop_downs.eq(index).slideToggle(500, function() {
                if ($(arrows.eq(index)).hasClass(up)) {
                    $(arrows.eq(index)).removeClass(up).addClass(down);
                    $(paths.eq(index)).attr("d", d_down);
                } else {
                    $(arrows.eq(index)).removeClass(down).addClass(up);
                    $(paths.eq(index)).attr("d", d_up);
                }
            });
        });
    });
    

    var call=$(".bi-telephone-fill");
    var education=$(".bi-mortarboard-fill");
    call.click(function(){
        call.animate({
width: "20px",
height: "20px"
}, 500); // 500 milliseconds;
setTimeout(function(){
call.animate({
width: "16px",
height: "16px"
}, 500) // 500 milliseconds;
},550)
})
education.click(function(){
education.css({ transform: "rotate(-30deg)" });

// Створення анімації з коливанням і поверненням до початкового положення
education.animate({ rotation: 30 }, {
duration: 500,
step: function(now) {
$(this).css("transform", "rotate(" + now + "deg)");
},
complete: function() {
$(this).animate({ rotation: -30 }, {
    duration: 500,
    step: function(now) {
        $(this).css("transform", "rotate(" + now + "deg)");
    },
    complete: function() {
        // Повернення до початкового положення (0 градусів)
        $(this).animate({ rotation: 0 }, {
            duration: 500,
            step: function(now) {
                $(this).css("transform", "rotate(" + now + "deg)");
            }
        });
    }
});
}
});
})
    }) 