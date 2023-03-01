(function () {
  // Глобальные переменные
  let studentsArr = [
    {
      birthday: "1993-10-10",
      faculty: 'Юридический',
      middleName: 'Иванович',
      name: 'Иван',
      startStudy: '2019',
      surname: 'Иванов'
    },
    {
      birthday: "1998-12-12",
      faculty: 'Строительство',
      middleName: 'Николаевич',
      name: 'Николай',
      startStudy: '2020',
      surname: 'Николаев'
    },
    {
      birthday: "2002-01-01",
      faculty: 'Медицинский',
      middleName: 'Сергеевич',
      name: 'Сергей',
      startStudy: '2019',
      surname: 'Сергеев'
    },
    {
      birthday: "1995-10-10",
      faculty: 'Архитектурный',
      middleName: 'Петрович',
      name: 'Петр',
      startStudy: '2017',
      surname: 'Петров'
    }
  ];
  let formAdd = document.getElementById('formAddStudent')
  let inputs = document.getElementsByClassName('form-control');
  let studentObj = {};
  

  // Устанавливаем значение по умолчанию = нынешней дате
  studentBirthday.valueAsDate = new Date()


  
  // Добавляем элемент и стили для вывода ошибки валидации 
  let error = document.createElement('div') 
  error.className='error'
  error.style.color = 'red'
  
  // Валидация фамилии
  function validateSurname() {
    const inputSurnameValue = document.getElementById('studentSurname');
    const inputSurnameValueFilter = inputSurnameValue.value.toLowerCase().trim();
    if (inputSurnameValueFilter !== "" && /[A-Za-zА-Яа-яЁё]{1,20}/.test(inputSurnameValueFilter)) {
      error.remove();
      return true;
    } else {
      error.innerHTML = 'Пожалуйста заполните поле или введите корректную фамилию (без пробелов и других знаков)'
      inputSurnameValue.after(error)
      inputSurnameValue.focus();
      return false;
    }
  }
  
  // Валидация имени
  function validateName() {
    const inputNameValue = document.getElementById('studentName');
    const inputNameValueFilter = inputNameValue.value.toLowerCase().trim();
    
    if (inputNameValueFilter !== "" && /[A-Za-zА-Яа-яЁё]{1,20}/.test(inputNameValueFilter)) {
      error.remove();
      return true;
    } else {
      error.innerHTML = 'Пожалуйста заполните поле или введите корректное имя (без пробелов и других знаков)'
      inputNameValue.after(error)
      inputNameValue.focus();
      return false;
    }
  }

  // Валидация отчеста
  function validateMiddleName() {
    const inputMiddleNameValue = document.getElementById('studentMiddleName');
    const inputMiddleNameValueFilter = inputMiddleNameValue.value.toLowerCase().trim();
    
    if (inputMiddleNameValueFilter !== "" && /[A-Za-zА-Яа-яЁё]{1,20}/.test(inputMiddleNameValueFilter)) {
      error.remove();
      return true;
    } else {
      error.innerHTML = 'Пожалуйста заполните поле или введите корректное отчество (без пробелов и других знаков)'
      inputMiddleNameValue.after(error)
      inputMiddleNameValue.focus();
      return false;
    }
  }

  // Валидация даты рождения
  function validateBirthday() {
    const inputStudentBirthdayValue = document.getElementById('studentBirthday');
    
    var parts = inputStudentBirthdayValue.value.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);

    if (year < 1900 || year > new Date().getFullYear() || month == 0 || month > 12) {
      error.innerHTML = 'Пожалуйста заполните поле или введите корректную дату рождения (от 1900 г. - н.в))'
      inputStudentBirthdayValue.after(error)
      document.getElementById('studentBirthday').focus();
      return false;
    }

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
      monthLength[1] = 29;
    }
    error.remove();
    return day > 0 && day <= monthLength[month - 1];

  }

  // Валидация даты начала обучения
  function validateStartStudy() {
    const inputStartStudyValue = document.getElementById('startStudy');
    const inputStartStudyValueFilter = inputStartStudyValue.value.toLowerCase().trim();
    if (inputStartStudyValueFilter !== "" && 2000 < inputStartStudyValueFilter && inputStartStudyValueFilter < new Date().getFullYear()) {
      error.remove();
      return true
    } else {
      error.innerHTML = 'Пожалуйста заполните поле или введите корректную дату (В диапазоне от 2000 до н.в)'
      inputStartStudyValue.after(error)
      inputStartStudyValue.focus();
      return false;
    }
  }

  // Валидация факультатива
  function validateFaculty() {
    const inputFacultyValue = document.getElementById('faculty');
    const inputFacultyValueFilter = inputFacultyValue.value.toLowerCase().trim();
    
    if (inputFacultyValueFilter !== "" && /[A-Za-zА-Яа-яЁё]{1,20}/.test(inputFacultyValueFilter)) {
      error.remove();
      return true;
    } else {
      error.innerHTML = 'Пожалуйста заполните поле или введите корректный факультет (без пробелов и других знаков)'
      inputFacultyValue.after(error)
      inputFacultyValue.focus();
      return false;
    }
  }


  // Валидация формы. Вызывает все функции валидации инпутов
  function validateForm() {
    let isValid = validateSurname() && validateName() && validateMiddleName() && validateFaculty() && validateStartStudy() && validateBirthday();
  
    return isValid;
  }



  // Собираем объект из введенных данных студента
  function createObj(formNode) {
    studentObj = {};
    const { elements } = formNode

    Array.from(elements)
      .filter((item) => !!item.name)
      .forEach((element) => {
        studentObj[element.name] = element.value
      })
  }



  // Создаем массив из объектов с данными студентов
  function createArr(obj) {
    studentsArr.push(obj);
  }


  // Создаем полное имя студента
  function getFullName(obj) {
    let fullName = `${obj.surname} ${obj.name} ${obj.middleName}`
    return fullName
  }
  
  // Приводим дату рождения к правильному виду
  function getBirthdayDate(date) {
    date = date.split('-');
    date = [date[2], date[1], date[0]];
    date = date.join('.')

    return date
  }
  
  // Задаём возраст студента
  function getAge(date) {
    date = date.split('-');
    date = [date[0]];
    date = date.join('')
    const year = new Date().getFullYear() - date  
    
    return year
  }

  // Подсчет курса студента
  function getCourse(year) {
    if (new Date().getMonth() + 1 >= 9) {
      return new Date().getFullYear() - year + 1;
    } else {
      return new Date().getFullYear() - year;
    }
  } 

  // Период обучения студента 
  function getPeriodStudy(year) {
    let periodStudy = ``;
    if (parseInt(year) + 4 <= new Date().getFullYear() && new Date().getMonth() + 1 >= 9) {
      periodStudy = `${year} - ${parseInt(year) + 4} (закончил)`;
      return periodStudy;
    } else {
      periodStudy = `${year} - ${parseInt(year) + 4} (${getCourse(year)} курс)`;
      return periodStudy;
    }

  }

  // Создаем строку с данными студента
  function createStudent(array) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''
    
      for (let item of array) {
      const tdFullName = document.createElement('td');
      const tdfaculty = document.createElement('td');
      const tdBirthday = document.createElement('td');
      const tdStudyYear = document.createElement('td');
      const tr = document.createElement('tr');
      tbody.appendChild(tr);
      tbody.appendChild(tr);
      tdFullName.textContent = getFullName(item);
      tdfaculty.textContent = item.faculty;
      tdBirthday.textContent = `${getBirthdayDate(item.birthday)} (${getAge(item.birthday)})`;
      tdStudyYear.textContent = getPeriodStudy(item.startStudy);
      tr.appendChild(tdFullName)
      tr.appendChild(tdfaculty)
      tr.appendChild(tdBirthday)
      tr.appendChild(tdStudyYear)
    
    }
  }
  createStudent(studentsArr);
  
  // Порядок сортировки
  let ordASC = 1;
  
  // Сортируемое поле
  let ordField = '';

  // Сортировка столбца фио
  function sorterFullName(a, b) {
    return getFullName(a).localeCompare(getFullName(b)) * ordASC;
  }

  // Сортировка столбца факультатив
  function sorterFaculty(a, b) {
    return a.faculty.localeCompare(b.faculty) * ordASC;
  }

  // Сортировка стлбца дата рождения
  function sorterBirthday(a, b) {
    return (new Date(a.birthday) - new Date(b.birthday)) * ordASC;
  }

  // Сортировка столбца дата начала обучения
  function sorterStartStudy(a, b) {
    return a.startStudy.localeCompare(b.startStudy) * ordASC;
  }


  // Выбор порядка сорировки
  function selectOrd(id) {
    if (id === ordField) {
        ordASC *= -1;
    } else {
        ordField = id;
        ordASC = 1;
    }
  }

  // Функция сортировки 
  function order(e) {
    if (e.target && e.target.id) {
      switch (e.target.id) {
          case 'fio':
              selectOrd(e.target.id);
              studentsArr = studentsArr.sort(sorterFullName);                    
          break;
          case 'fac':
            selectOrd(e.target.id);
            studentsArr = studentsArr.sort(sorterFaculty);                    
          break;
          case 'date':
            selectOrd(e.target.id);
            studentsArr = studentsArr.sort(sorterBirthday);                    
          break;
          case 'yers':
            selectOrd(e.target.id);
            studentsArr = studentsArr.sort(sorterStartStudy);                    
            break;
      }
      createStudent(studentsArr);
  }
  }

  // сортировка по клику на заголовок столбца
  const header = document.getElementsByTagName('th');
  for (let i = 0; i < header.length; i++) {
    header[i].classList.add('th-pointer')
    header[i].addEventListener('click', order);
  }
  




                               //Поиск по студентам
  
  
  let formSearch = document.getElementById('formSearchStudent')
  let searchFIO = document.getElementById('searchFIO');
  let searchFaculty = document.getElementById('searchFaculty');
  let searchStartStudy = document.getElementById('searchStartStudy');
  let searchFinishStudy = document.getElementById('searchFinishStudy');


  // Фильтрация по ФИО
  function filterName(arr, input) {
    
    let filterArray = [];
    let studentsArrCopy = [...arr];
    
    for (let item of studentsArrCopy) {
        if (getFullName(item).toLowerCase().trim().includes(input.toLowerCase().trim())) {
          filterArray.push(item);
        }
      }

    return filterArray
  }

  // Фильтрация по факультету
  function filterFaculty(arr, input) {
    
    let filterArray = [];
    let studentsArrCopy = [...arr];
    
    for (let item of studentsArrCopy) {
        if (item.faculty.toLowerCase().trim().includes(input.toLowerCase().trim())) {
          filterArray.push(item);
        }
      }
   
    return filterArray
  }
  
    // Фильтрация по дате начала обучения
    function filterStartStudy(arr, input) {
      let filterArray = [];
      let studentsArrCopy = [...arr];
      
      for (let item of studentsArrCopy) {
       
        if ((input.toLowerCase().trim()) === '') {
          filterArray.push(item)
        } else {
          if (item.startStudy.toLowerCase().trim() === (input.toLowerCase().trim())) {
            filterArray.push(item);
          }
        }
        }
      return filterArray
  }
  
   // Фильтрация по дате окончания обучения
   function filterFinishStady(arr, input) {
    let filterArray = [];
    let studentsArrCopy = [...arr];
   
       for (let item of studentsArrCopy) {
         if ((input.toLowerCase().trim()) === '') {
           filterArray.push(item)
         } else {
           if (String(parseInt(item.startStudy) + 4).toLowerCase().trim() === input.toLowerCase().trim()) {
             filterArray.push(item);
           }
         }
     }
     return filterArray
    }  
  
  
  
  
  // Вызов функции фильтрации
  function data(array) {
    let = studentsArrCopy = [...array]
    studentsArrCopy = filterName(studentsArrCopy, searchFIO.value)
    studentsArrCopy = filterFaculty(studentsArrCopy, searchFaculty.value)
    studentsArrCopy = filterStartStudy(studentsArrCopy, searchStartStudy.value)
    studentsArrCopy = filterFinishStady(studentsArrCopy, searchFinishStudy.value)

    studentsArr = studentsArrCopy;
    createStudent(studentsArr);
  }


  formSearch.addEventListener('submit', e => {
    e.preventDefault();
    data(studentsArr);
  })
  

  // Вызываем функции по сабмиту формы
  formAdd.addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm()) {
      validateForm(inputs)
      createObj(formAdd);
      createArr(studentObj);
      createStudent(studentsArr)


      for (let input of inputs) {
        input.value = '';
      }
    }
    

  })





})();















