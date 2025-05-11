import "../styles/main.scss";
import Map from "./components/map";
import AccordionCollection from "./components/accordion";

document.addEventListener("DOMContentLoaded", () => {
  new AccordionCollection();
  new Map([
    {
      x: 145,
      y: 205,
      content: `
      <h2>COLORADO</h2>
      <ul>
        <li>
          <h3>Denver</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
         <li>
          <h3>Breckenridge</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
        <li>
          <h3>Vail</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
      </ul>
      `,
      imageSrc: "https://primecarevip.com/wp-content/uploads/2025/05/marker.svg",
      area: "CO",
    },
    {
      x: 165,
      y: 185,
      content: `
      <h2>COLORADO</h2>
      <ul>
        <li>
          <h3>Denver</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
         <li>
          <h3>Breckenridge</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
        <li>
          <h3>Vail</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
      </ul>
      `,
      imageSrc: "https://primecarevip.com/wp-content/uploads/2025/05/marker.svg",
      area: "CO",
    },
    {
      x: 190,
      y: 175,
      content: `
      <h2>COLORADO</h2>
      <ul>
        <li>
          <h3>Denver</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
         <li>
          <h3>Breckenridge</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
        <li>
          <h3>Vail</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
      </ul>
      `,
      imageSrc: "https://primecarevip.com/wp-content/uploads/2025/05/marker.svg",
      area: "CO",
    },
    {
      x: 120,
      y: 355,
      content: `
      <h2>COLORADO</h2>
      <ul>
        <li>
          <h3>Denver</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
         <li>
          <h3>Breckenridge</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
        <li>
          <h3>Vail</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
      </ul>
      `,
      imageSrc: "https://primecarevip.com/wp-content/uploads/2025/05/marker.svg",
      area: "NM",
    },
    {
      x: 420,
      y: 680,
      content: `
      <h2>COLORADO</h2>
      <ul>
        <li>
          <h3>Denver</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
         <li>
          <h3>Breckenridge</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
        <li>
          <h3>Vail</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
      </ul>
      `,
      imageSrc: "https://primecarevip.com/wp-content/uploads/2025/05/marker.svg",
      area: "TX",
    },
    {
      x: 440,
      y: 660,
      content: `
      <h2>COLORADO</h2>
      <ul>
        <li>
          <h3>Denver</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
         <li>
          <h3>Breckenridge</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
        <li>
          <h3>Vail</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
      </ul>
      `,
      imageSrc: "https://primecarevip.com/wp-content/uploads/2025/05/marker.svg",
      area: "TX",
    },
    {
      x: 530,
      y: 210,
      content: `
      <h2>COLORADO</h2>
      <ul>
        <li>
          <h3>Denver</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
         <li>
          <h3>Breckenridge</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
        <li>
          <h3>Vail</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
      </ul>
      `,
      imageSrc: "https://primecarevip.com/wp-content/uploads/2025/05/marker.svg",
      area: "KS",
    },
    {
      x: 1140,
      y: 695,
      content: `
      <h2>COLORADO</h2>
      <ul>
        <li>
          <h3>Denver</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
         <li>
          <h3>Breckenridge</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
        <li>
          <h3>Vail</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
      </ul>
      `,
      imageSrc: "https://primecarevip.com/wp-content/uploads/2025/05/marker.svg",
      area: "FL",
    },
    {
      x: 1150,
      y: 720,
      content: `
      <h2>COLORADO</h2>
      <ul>
        <li>
          <h3>Denver</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
         <li>
          <h3>Breckenridge</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
        <li>
          <h3>Vail</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
      </ul>
      `,
      imageSrc: "https://primecarevip.com/wp-content/uploads/2025/05/marker.svg",
      area: "FL",
    },
    {
      x: 1155,
      y: 745,
      content: `
      <h2>COLORADO</h2>
      <ul>
        <li>
          <h3>Denver</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
         <li>
          <h3>Breckenridge</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
        <li>
          <h3>Vail</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
      </ul>
      `,
      imageSrc: "https://primecarevip.com/wp-content/uploads/2025/05/marker.svg",
      area: "FL",
    },
    {
      x: 1145,
      y: 770,
      content: `
      <h2>COLORADO</h2>
      <ul>
        <li>
          <h3>Denver</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
         <li>
          <h3>Breckenridge</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
        <li>
          <h3>Vail</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
      </ul>
      `,
      imageSrc: "https://primecarevip.com/wp-content/uploads/2025/05/marker.svg",
      area: "FL",
    },
    {
      x: 1095,
      y: 660,
      content: `
      <h2>COLORADO</h2>
      <ul>
        <li>
          <h3>Denver</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
         <li>
          <h3>Breckenridge</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
        <li>
          <h3>Vail</h3>
          <p>(Michael Kieffer and Lainey Kieffer)</p>
        </li>
      </ul>
      `,
      imageSrc: "https://primecarevip.com/wp-content/uploads/2025/05/marker.svg",
      area: "FL",
    },
  ]);
});
