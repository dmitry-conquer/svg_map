import "../styles/main.scss";
import Map from "./components/map";

document.addEventListener("DOMContentLoaded", () => {
  new Map([
    {
      x: 50,
      y: 50,
      content: `
      <h2>Адреса 1</h2>
      <p>Город: Київ</p>
      <p>Улица: Гарматна</p>
      `,
      imageSrc: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    },
    {
      x: 300,
      y: 300,
      content: `
      <h2>Адреса 2</h2>
      <p>Город: Львов</p>
      <p>Улица: Галицкая</p>
      `,
      imageSrc: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    },
    {
      x: 650,
      y: 650,
      content: `
      <h2>Адреса 3</h2>
      <p>Город: Одесса</p>
      <p>Улица: Дерибасовская</p>
      `,
      imageSrc: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    },
    {
      x: 1200,
      y: 800,
      content: `
      <h2>Адреса 4</h2>
      <p>Город: Харьков</p>
      <p>Улица: Сумская</p>
      `,
      imageSrc: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    },
  ]);
});
