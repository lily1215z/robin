'use strict';

//подключение скрыть/развернуть блоки
const del = document.querySelector(".work-del");
const del1 = document.querySelector(".work-del1");
const btn = document.querySelector(".work__btn");

btn.addEventListener("click", function () {
  if (del.style.display === "block") {
    del.style.display = "none";
    btn.innerHTML = "View all projects";
  } else {
    del.style.display = "block";
    btn.innerHTML = "Hide projects";
  }
});

btn.addEventListener("click", function () {
  if (del1.style.display === "block") {
    del1.style.display = "none";
    btn.innerHTML = "View all projects";
  } else {
    del1.style.display = "block";
    btn.innerHTML = "Hide projects";
  }
});

///подключение слайдера
$(".dribbble-slider").slick({
  dots: true,
  arrows: false,
  slidesToShow: 1,
  autoplay: true,
  autoplaySpeed: 2000,
});

//подключить Tab

const tabs = document.querySelectorAll('.tab'),
  content = document.querySelectorAll('.tab-item'),
  box = document.querySelector('.photo__tabs');

function hide() {     
  content.forEach(item => {
      item.classList.add('hide');  
      item.classList.remove('show', 'fade'); 
  });
  
  tabs.forEach(item => {
      item.classList.remove('active');
  });
}

function show(i = 0) {  //всегда первый эл будит активным
    content[i].classList.add('show', 'fade');
    content[i].classList.remove('hide');
    tabs[i].classList.add('active');
}

hide();
show(); 

box.addEventListener('click', (e) => {  //делегирование
    const target = e.target;
    if(target && target.classList.contains('tab')) {  //если есть таргет и в таргете кликнули на класс item
        tabs.forEach((item, i) => {
            if(target == item) {  //и если этот клик равен item, то выполнить действия
                hide();
                show(i); 
            }
        });
    }
});

// Плавность якорей
$(document).ready(function(){
    $(".header__link, .footer__scroll").on("click", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //забираем идентификатор блока с атрибута href
        var id  = $(this).attr('href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });
});

// бургер меню при адаптиве
const iconMenu = document.querySelector('.header__icon');
const menuBody = document.querySelector('.header__body');

if(iconMenu) {
  iconMenu.addEventListener('click', function(e) {
    document.body.classList.toggle('_lock'); //чтоб сайт за меню не скролился. В html если body._lock {overflow: hidden;}

    iconMenu.classList.toggle('_active');   //палочки возвращаются в бургер
    menuBody.classList.toggle('_active');    //само тело меню закрывается
  });
}

//Липкий хедер при скролле добавляет класс после 100px В стилях прописан цвет фона
$(window).scroll(function () {
  if (this.scrollY > 100) {
    $('.header').addClass("sticky");
  } else {
    $('.header').removeClass("sticky");
  }
});

//При клике в меню на ссылки чтоб меню закрывалось и пеерносилась к нужной секции с помощью якоря
//а в верстке с помощью id расписано к какой секции какая ссылка в меню соответствует
document.querySelectorAll('.header__link').forEach(item => {
  item.addEventListener('click', function() {
      if(menuBody.classList.contains('_active')) { //если меню открыто, то...
        document.body.classList.toggle('_lock');  //чтоб сайт не блочило при переходе
        iconMenu.classList.toggle('_active');   //палочки возвращаются в бургер 
        menuBody.classList.toggle('_active');   //само тело меню закрывается
    }
  });
});

//отправка данных формы на почту. Отправка должна 
//уйти после валидации. Валидации пока у меня нет

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form__registration');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let formData = new FormData(form);
    
    let response = await fetch('sendmail.php', {
      method: 'POST',
      body: formData
    });
    if(response.ok) {
      let result = await response.json();
      alert(result.message);
      form.reset();
    } else {
      alert('error');
    }
  }
});