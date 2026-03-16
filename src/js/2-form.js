// 1. Створюємо об'єкт-чернетку для зберігання даних
const formData = { 
  email: "", 
  message: "" 
};

const form = document.querySelector('.feedback-form');
const storageKey = "feedback-form-state";

// 2. ПЕРЕВІРКА ПРИ ЗАВАНТАЖЕННІ: дістаємо дані з "блокнота" браузера
const savedData = localStorage.getItem(storageKey);

if (savedData) {
  // Перетворюємо текст із LocalStorage назад у об'єкт
  const parsedData = JSON.parse(savedData);
  
  // Оновлюємо нашу чернетку значеннями, які знайшли
  formData.email = parsedData.email ?? "";
  formData.message = parsedData.message ?? "";

  // Заповнюємо поля форми на екрані, щоб користувач їх бачив
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

// 3. СТЕЖИМО ЗА ВВОДОМ: записуємо кожну зміну в полях
form.addEventListener('input', (event) => {
  const name = event.target.name; // "email" або "message"
  const value = event.target.value.trim(); // текст без пробілів по краях

  // Записуємо нове значення у нашу чернетку
  formData[name] = value;

  // Зберігаємо оновлену чернетку в LocalStorage як текст
  localStorage.setItem(storageKey, JSON.stringify(formData));
});

// 4. ВІДПРАВКА ФОРМИ (Submit)
form.addEventListener('submit', (event) => {
  event.preventDefault(); // зупиняємо перезавантаження сторінки

  // Перевіряємо, чи всі поля заповнені
  if (formData.email === "" || formData.message === "") {
    alert("Fill please all fields");
    return; // зупиняємо виконання, якщо хоч одне поле порожнє
  }

  // Якщо все добре — виводимо об'єкт у консоль
  console.log(formData);
  
  // ПОВНЕ ОЧИЩЕННЯ ПІСЛЯ УСПІШНОЇ ВІДПРАВКИ
  localStorage.removeItem(storageKey); // видаляємо запис із пам'яті браузера
  form.reset(); // очищаємо візуальні поля форми
  formData.email = ""; // обнуляємо нашу чернетку в JS
  formData.message = "";
});